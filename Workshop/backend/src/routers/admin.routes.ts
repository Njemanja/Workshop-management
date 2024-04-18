import express from 'express'
import { UserController } from '../controllers/user.controller';


const adminRouter= express.Router();

adminRouter.route('/login').post(
    (req,res)=> new UserController().loginAdmin(req, res)
)

export default adminRouter;