const Project = require("../models/project.model");
const User = require("../models/user.model");

// Create a new project
exports.createProject = async (req, res) => {
  try {
    const { name, pdfUrl, originalFileName } = req.body;

    if (!pdfUrl) {
      return res.status(400).json({ message: "PDF URL is required" });
    }
    const user = await User.findOne({ _id: req.user.userId });
    // Create project
    const project = new Project({
      name,
      pdfUrl,
      originalFileName,
      user: user._id,
    });

    await project.save();

    res.status(201).json(project);
  } catch (error) {
    console.error("Project creation error:", error);
    res.status(500).json({ message: "Failed to create project" });
  }
};

// Get all projects for a user
exports.getUserProjects = async (req, res) => {
  try {
    const projects = await Project.find({ user: req.user.userId }).sort({
      createdAt: -1,
    });

    res.json(projects);
  } catch (error) {
    console.error("Get projects error:", error);
    res.status(500).json({ message: "Failed to fetch projects" });
  }
};
