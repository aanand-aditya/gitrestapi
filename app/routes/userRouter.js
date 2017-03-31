import express from 'express';
import UserController from "../controllers/userController";

export default function initUserRoutes(){
  let userRouter = express.Router();
  userRouter.get('/search/users/',  UserController.showAll);

  return userRouter;
}