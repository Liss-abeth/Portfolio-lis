const Project = require('../Models/ProjectModel');

const getProjects = async (req, res) => {
  const projects = await Project.find(); // fetch all
  res.json(projects);
};

const createProject = async (req, res) => {
  try {
    const { title, desc, tech, live, github } = req.body;

    if (!title || !desc || !tech) {
      return res.status(400).json({ message: "Title, description, and tech stack are required!" });
    }

    const newProject = new Project({
      title,
      desc,
      tech,
      live,
      github,
    });

    await newProject.save();
    res.status(201).json(newProject);
  } catch (err) {
    console.error("❌ Backend error:", err.message);
    res.status(500).json({ message: "Error creating project", error: err.message });
  }
};




const updateProject = async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (project.userId.toString() !== req.user.id)
    return res.status(403).json({ error: 'Unauthorized' });

  project.name = req.body.name || project.name;
  project.category = req.body.category || project.category;
  project.status = req.body.status || project.status;
  project.thumbnail = req.body.thumbnail || project.thumbnail;

  const updated = await project.save();
  res.json(updated);
};

const deleteProject = async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (project.userId.toString() !== req.user.id)
    return res.status(403).json({ error: 'Unauthorized' });

  await project.deleteOne();
  res.json({ message: 'Project deleted' });
};

module.exports = {
  getProjects,
  createProject,
  updateProject,
  deleteProject
};
