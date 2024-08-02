const Project = require("../models/Projects");
const User = require("../models/Users");
const jwt = require('jsonwebtoken');


module.exports.allproject_get = async (req, res) => {
  try {
    // Find the user by their ID from the res.locals object
    const user = await User.findById(res.locals.user._id).populate("projects");

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find all projects associated with the user
    const projects = await Project.find({ _id: { $in: user.projects } });

    // Respond with the list of projects
    res.status(200).json(projects);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.addproject_post = async (req, res) => {
  const { name, modelId, models } = req.body;
  const projectData = {
    name: name,
    modelId: modelId,
    models: [
     
    ],
  };

  try {
    const newProject = await Project.createProject(projectData);
    //modify this code using res.loacl.user
    const token = req.cookies.jwt;

    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
        if (err) {
          console.log(err.message);
          return res.status(403).json({ message: "Unauthorized" });
        } else {
          let user = await User.findById(decodedToken.id);
          if (user) {
            await user.addProject(newProject._id);
          } else {
            console.log("User not found");
          }
          res.status(200).json({ projectId: newProject._id });
         
        }
      });
    } else {
      res.status(403).json({ message: "Unauthorized" });
    }

   
  } catch (error) {
    res.status(400).json({ error });
    console.log(error);
  }
};

// Add a model to a project
module.exports.addModelToProject_post = async (req, res) => {
  const { projectId, modelName, modelJSON, modelWeights, weightSpecs } = req.body;
  console.log(projectId);

  try {
    const token = req.cookies.jwt;

    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
        if (err) {
          console.log(err.message);
          return res.status(403).json({ message: "Unauthorized" });
        } else {
          const user = await User.findById(decodedToken.id);

          if (!user) {
            return res.status(404).json({ message: "User not found" });
          }

          // Find the project
          const project = await Project.findById(projectId);

          if (!project) {
            return res.status(404).json({ message: "Project not found" });
          }

          // Prepare the model data
          const modelData = {
            name: `${modelName}_${Date.now()}`,
            file: JSON.stringify({ modelJSON, modelWeights, weightSpecs })
          };

          // Add the model to the project
          await project.addModel(modelData);

          res.status(200).json({ message: "Model added successfully", project });
        }
      });
    } else {
      res.status(403).json({ message: "Unauthorized" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
    console.log(error);
  }
};

module.exports.get_model_get = async (req, res) => {
  const { projectId, modelId } = req.params;

  try {
    const token = req.cookies.jwt;

    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
        if (err) {
          console.log(err.message);
          return res.status(403).json({ message: "Unauthorized" });
        } else {
          const user = await User.findById(decodedToken.id);

          if (!user) {
            return res.status(404).json({ message: "User not found" });
          }

          // Find the project
          const project = await Project.findById(projectId);

          if (!project) {
            return res.status(404).json({ message: "Project not found" });
          }

          // Find the model in the project
          const model = project.models.id(modelId);

          if (!model) {
            return res.status(404).json({ message: "Model not found" });
          }

          // Parse the model file data
          const modelData = JSON.parse(model.file);

          res.status(200).json({ modelData });
        }
      });
    } else {
      res.status(403).json({ message: "Unauthorized" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
    console.log(error);
  }
};


module.exports.getAllModels_get = async (req, res) => {
  try {
    const token = req.cookies.jwt;

    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
        if (err) {
          console.log(err.message);
          return res.status(403).json({ message: "Unauthorized" });
        } else {
          const user = await User.findById(decodedToken.id).populate("projects");

          if (!user) {
            return res.status(404).json({ message: "User not found" });
          }

          const allModels = [];

          for (const project of user.projects) {
            const projectModels = await Project.findById(project._id).select("models");
            if (projectModels && projectModels.models) {
              allModels.push(...projectModels.models);
            }
          }

          res.status(200).json(allModels);
        }
      });
    } else {
      res.status(403).json({ message: "Unauthorized" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
    console.log(error);
  }
};