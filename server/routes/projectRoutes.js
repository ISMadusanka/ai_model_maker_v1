const {Router} = require('express');

const authControler = require('../controllers/authController');
const { requireAuth } = require('../middleware/authMiddleware');
const { allproject_get, addproject_post } = require('../controllers/projectController');

router = Router();

router.get('/allprojects',requireAuth,allproject_get);
router.post('/addproject',requireAuth,addproject_post);

module.exports = router;