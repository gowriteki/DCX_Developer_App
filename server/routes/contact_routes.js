import express from 'express';
var contactRouter=express.Router(); //To import Router
import {createContact} from '../controllers/contact_controller.js';

contactRouter.post('/',createContact);


export default contactRouter;