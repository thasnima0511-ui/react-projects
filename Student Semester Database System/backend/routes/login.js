import express from 'express';
// import { addUser } from '../controllers/loginController.js';
import { loginUser } from '../controllers/loginController.js';
import { getStudDetails } from "../controllers/loginController.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { createStud } from '../controllers/loginController.js';
import { getStud } from '../controllers/loginController.js';
import { patchStud } from '../controllers/loginController.js';
import { deleteStud } from '../controllers/loginController.js';
import { getTopTerm } from '../controllers/loginController.js';
import { getPassPercentage } from '../controllers/loginController.js';
import {getSingleStud} from '../controllers/loginController.js';

const router=express.Router();

// Task - Add a Teacher

// router.post('/addUser', addUser); 

// Task - Login Teacher 
router.post('/loginUser', loginUser);

// Task - Get Student Details 
router.get('/getStudDetails', verifyToken, getStudDetails);
router.post('/createStud',createStud);
router.get('/getStud',getStud);
// router.get('/top-term1', getTopTerm1);
router.get('/top-term1', getTopTerm('term1'));
router.get('/top-term2', getTopTerm('term2'));
router.get('/top-term3', getTopTerm('term3'));
router.get('/pass-percentage', getPassPercentage);
router.patch('/patchStud',patchStud);
router.delete('/deleteStud',deleteStud);

router.get('/getstudent/:rollno', getSingleStud);


export default router;

