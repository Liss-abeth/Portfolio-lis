const express = require('express');
const { getProjects, createProject, updateProject, deleteProject } = require('../controllers/ProjectController');


const projectRouter = express.Router();

projectRouter.route('/create').post(createProject);  
projectRouter.route('/').get(getProjects);
projectRouter.route('/update/:id').put( updateProject);  
projectRouter.route('/delete/:id').delete( deleteProject);

module.exports = projectRouter;
