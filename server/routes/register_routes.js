import express from 'express';
import multer from 'multer';
import {createProfile,getProfile,updateProfile, getProfiles,getResume} from '../controllers/register_controller.js';
import { verifyToken } from '../middleware/auth.js';
var registerRouter=express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
registerRouter.post('/',upload.single('resume'),createProfile);
registerRouter.get(['/profiles', '/profiles/:skills'],getProfiles);
registerRouter.post('/login',getProfile);
registerRouter.get('/resume/:id',getResume);
registerRouter.put('/update/:id',verifyToken, upload.single('resume'),updateProfile);

export default registerRouter;