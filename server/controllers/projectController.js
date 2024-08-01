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
      { name: "Model1", file: "/path/to/file1.txt" },
      { name: "Model2", file: "/path/to/file2.tsd" },
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
