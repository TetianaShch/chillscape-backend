import { Router } from "express";
import { celebrate } from "celebrate";
import { authenticate } from "../middlewares/authenticate.js";

import {
  getFeedbacks,
  createFeedback,
} from "../controllers/feedbackController.js";

import {
  getFeedbacksSchema,
  createFeedbackSchema,
} from "../validations/feedbackValidation.js";

const router = Router();

router.get(
  "/:placeId",
  celebrate(getFeedbacksSchema),
  getFeedbacks
);
router.post(
  "/",
  authenticate,
  celebrate(createFeedbackSchema),
  createFeedback
);

export default router;
