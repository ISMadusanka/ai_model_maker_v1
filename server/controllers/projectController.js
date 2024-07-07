const Project = require("../models/Projects");
const User = require("../models/Users");

module.exports.allproject_get = (req, res) => {};

module.exports.addproject_post = async (req, res) => {
  const projectData = {
    name: "Project Name",
    modelID: "1",
    models: [
      { name: "Model1", file: "/path/to/file1.txt" },
      { name: "Model2", file: "/path/to/file2.tsd" },
    ],
  };

  try {
    const newProject = await Project.createProject(projectData);
    //modify this code using res.loacl.user
    const user = await User.findById('66893ffe136db47b385cc253');
    if (user) {
      await user.addProject(newProject._id);
    } else {
      console.log("User not found");
    }
    res.status(200).json({ projectId: newProject._id });
  } catch (error) {
    res.status(400).json({ error });
    console.log(error);
  }
};
