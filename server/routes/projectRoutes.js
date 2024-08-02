const {Router} = require('express');

const authControler = require('../controllers/authController');
const { requireAuth } = require('../middleware/authMiddleware');
const { allproject_get, addproject_post, addModelToProject_post, get_model_get, getAllModels_get } = require('../controllers/projectController');

router = Router();

router.get('/allprojects',requireAuth,allproject_get);
router.post('/addproject',requireAuth,addproject_post);
router.post('/addmodel',requireAuth,addModelToProject_post);
router.get('/getmodel',requireAuth,get_model_get);
router.get('/getallmodels',requireAuth,getAllModels_get);

module.exports = router;