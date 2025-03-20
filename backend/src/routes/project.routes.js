const express = require('express');
const router = express.Router();
const projectController = require('../controllers/project.controller');
const { authenticate } = require('../middleware/auth.middleware');

// Protect all routes
router.use(authenticate);

// Create a new project with PDF upload
router.post('/', projectController.createProject);

// Get all projects for the authenticated user
router.get('/', projectController.getUserProjects);

module.exports = router;