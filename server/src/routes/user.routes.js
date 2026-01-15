import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  getUser,
  updateUserCollege,
  completeProfile,
  deleteAccount,
  requestPasswordChangeVerification,
  changePasswordWithVerification,
  changePassword
} from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.get("/me", authMiddleware, getUser);
userRouter.patch('/me/college', authMiddleware, updateUserCollege);
userRouter.put('/complete-profile', authMiddleware, completeProfile);
userRouter.delete('/delete-account', authMiddleware, deleteAccount);
userRouter.post('/request-password-change', authMiddleware, requestPasswordChangeVerification);
userRouter.put('/change-password-verified', authMiddleware, changePasswordWithVerification);
userRouter.put('/change-password', authMiddleware, changePassword);

export default userRouter;
