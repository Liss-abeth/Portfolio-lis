const express = require('express');
const router = express.Router();
const { getSkills, createSkill } = require('../controllers/SkillController');

router.get('/', getSkills);
router.post('/create', createSkill);

module.exports = router;
