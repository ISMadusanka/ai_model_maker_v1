import * as tf from '@tensorflow/tfjs';

const MOBILE_NET_INPUT_WIDTH = 224;
const MOBILE_NET_INPUT_HEIGHT = 224;
const STOP_DATA_GATHER = -1;
const CLASS_NAMES = ['c1','c2'];
let mobilenet = undefined;
let gatherDataState = STOP_DATA_GATHER;
let trainingDataInputs = [];
let trainingDataOutputs = [];
let examplesCount = [];

export async function dataGatherLoop(images, classIndex) {
  gatherDataState = classIndex;
  if (gatherDataState !== STOP_DATA_GATHER) {
    const promises = images.map(async (image) => {
      const img = new Image();
      img.src = typeof image === 'string' ? image : URL.createObjectURL(image);
      await img.decode();

      const imageFeatures = tf.tidy(() => {
        let imageTensor = tf.browser.fromPixels(img);
        let resizedTensorFrame = tf.image.resizeBilinear(imageTensor, [MOBILE_NET_INPUT_HEIGHT, MOBILE_NET_INPUT_WIDTH], true);
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
      console.log(CLASS_NAMES[n] + ' data count: ' + examplesCount[n]);
    }
  }
}

export async function loadMobileNetFeatureModel() {
  const URL = 'https://tfhub.dev/google/tfjs-model/imagenet/mobilenet_v3_small_100_224/feature_vector/5/default/1';
  mobilenet = await tf.loadGraphModel(URL, { fromTFHub: true });
  console.log('MobileNet model loaded.');

  tf.tidy(() => {
    let answer = mobilenet.predict(tf.zeros([1, MOBILE_NET_INPUT_HEIGHT, MOBILE_NET_INPUT_WIDTH, 3]));
    console.log(answer.shape);
  });
}

loadMobileNetFeatureModel();

export let model = tf.sequential();
model.add(tf.layers.dense({ inputShape: [1024], units: 128, activation: 'relu' }));
model.add(tf.layers.dense({ units: CLASS_NAMES.length, activation: 'softmax' }));
model.summary();

model.compile({
  optimizer: 'adam',
  loss: (CLASS_NAMES.length === 2) ? 'binaryCrossentropy' : 'categoricalCrossentropy',
  metrics: ['accuracy']
});


