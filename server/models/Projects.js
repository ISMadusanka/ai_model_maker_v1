const mongoose = require('mongoose');

// Define the schema for the models array
const modelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter a model name']
    },
    file: {
        type: String, // Store the file path or URL as a string
        required: [true, 'Please provide a file']
    }
});

// Define the schema for the Project
const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter a project name']
    },
    modelId:{
        type: String,
        required: [true, 'ModelID is requeired']
    },
    models: [modelSchema] // Array of modelSchema objects
});

// Method to add a new model to the project
projectSchema.methods.addModel = async function(model) {
    this.models.push(model);
    await this.save();
    return this;
};

// Static method to create a new project
projectSchema.statics.createProject = async function(projectData) {
    const project = new this(projectData);
    await project.save();
    return project;
};

// Static method to delete a project by ID
projectSchema.statics.deleteProject = async function(projectId) {
    await this.findByIdAndDelete(projectId);
};

// Create the Project model
const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
