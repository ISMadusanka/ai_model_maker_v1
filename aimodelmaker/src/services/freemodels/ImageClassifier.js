import * as tf from "@tensorflow/tfjs";

const MOBILE_NET_INPUT_WIDTH = 224;
const MOBILE_NET_INPUT_HEIGHT = 224;
const STOP_DATA_GATHER = -1;
let CLASS_NAMES = [];
let mobilenet = undefined;
let gatherDataState = STOP_DATA_GATHER;
let trainingDataInputs = [];
let trainingDataOutputs = [];
let examplesCount = [];

export async function dataGatherLoop(images, name, classIndex) {
  CLASS_NAMES.push(name);
  gatherDataState = classIndex;
  if (gatherDataState !== STOP_DATA_GATHER) {
    const promises = images.map(async (image) => {
      const img = new Image();
      img.src = typeof image === "string" ? image : URL.createObjectURL(image);
      await img.decode();

      const imageFeatures = tf.tidy(() => {
        let imageTensor = tf.browser.fromPixels(img);
        let resizedTensorFrame = tf.image.resizeBilinear(
          imageTensor,
          [MOBILE_NET_INPUT_HEIGHT, MOBILE_NET_INPUT_WIDTH],
          true
        );
        let normalizedTensorFrame = resizedTensorFrame.div(255);
        return mobilenet.predict(normalizedTensorFrame.expandDims()).squeeze();
      });

      trainingDataInputs.push(imageFeatures);
      trainingDataOutputs.push(gatherDataState);

      if (examplesCount[gatherDataState] === undefined) {
        examplesCount[gatherDataState] = 0;
      }
      examplesCount[gatherDataState]++;
    });

    await Promise.all(promises);

    for (let n = 0; n < CLASS_NAMES.length; n++) {
      console.log(CLASS_NAMES[n] + " data count: " + examplesCount[n]);
    }
  }
}

export async function trainImageClassifier() {
  //predict = false;
  tf.util.shuffleCombo(trainingDataInputs, trainingDataOutputs);
  let outputsAsTensor = tf.tensor1d(trainingDataOutputs, "int32");
  let oneHotOutputs = tf.oneHot(outputsAsTensor, CLASS_NAMES.length);
  let inputsAsTensor = tf.stack(trainingDataInputs);

  let results = await model.fit(inputsAsTensor, oneHotOutputs, {
    shuffle: true,
    batchSize: 5,
    epochs: 10,
    callbacks: { onEpochEnd: logProgress },
  });

  outputsAsTensor.dispose();
  oneHotOutputs.dispose();
  inputsAsTensor.dispose();
  //predict = true;
  //predictLoop();
}

function logProgress(epoch, logs) {
  console.log("Data for epoch " + epoch, logs);
}

export async function loadMobileNetFeatureModel() {
  const URL =
    "https://tfhub.dev/google/tfjs-model/imagenet/mobilenet_v3_small_100_224/feature_vector/5/default/1";
  mobilenet = await tf.loadGraphModel(URL, { fromTFHub: true });
  console.log("MobileNet model loaded.");

  tf.tidy(() => {
    let answer = mobilenet.predict(
      tf.zeros([1, MOBILE_NET_INPUT_HEIGHT, MOBILE_NET_INPUT_WIDTH, 3])
    );
    console.log(answer.shape);
  });
}

loadMobileNetFeatureModel();

export let model = tf.sequential();

export function initializeModel() {
  model.add(
    tf.layers.dense({ inputShape: [1024], units: 128, activation: "relu" })
  );
  model.add(
    tf.layers.dense({ units: CLASS_NAMES.length, activation: "softmax" })
  );
  model.summary();

  model.compile({
    optimizer: "adam",
    loss:
      CLASS_NAMES.length === 2
        ? "binaryCrossentropy"
        : "categoricalCrossentropy",
    metrics: ["accuracy"],
  });
}

export function predictLoop(VIDEO, setPredictions) {
  tf.tidy(function () {
    let videoFrameAsTensor = tf.browser.fromPixels(VIDEO).div(255);
    let resizedTensorFrame = tf.image.resizeBilinear(
      videoFrameAsTensor,
      [MOBILE_NET_INPUT_HEIGHT, MOBILE_NET_INPUT_WIDTH],
      true
    );

    let imageFeatures = mobilenet.predict(resizedTensorFrame.expandDims());
    let prediction = model.predict(imageFeatures).squeeze();
    let highestIndex = prediction.argMax().arraySync();
    let predictionArray = prediction.arraySync();

    // console.log(
    //   "Prediction: " +
    //     CLASS_NAMES[highestIndex] +
    //     " with " +
    //     Math.floor(predictionArray[highestIndex] * 100) +
    //     "% confidence"
    // );

    let predictData = [];
    for (let i = 0; i < predictionArray.length; i++) {
      const val = {
        className : CLASS_NAMES[i],
        value : predictionArray[i]
      }
      predictData.push(val);
    }

    setPredictions(predictData);
    console.log(predictData)

  });
}
