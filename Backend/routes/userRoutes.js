import express from "express";
import {
  allUsers,
  logout,
  signin,
  signUp,
} from "../controllers/userController.js";
import secureRoute from "../middleware/secureRoute.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signin);
router.post("/logout", logout);
router.get("/allUsers", secureRoute, allUsers);

export default router;
