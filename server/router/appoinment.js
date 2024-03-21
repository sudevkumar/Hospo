import express from "express";
import {
  isAdminAuthenticated,
  isPatientAuthenticated,
} from "../middleware/auth.js";
import {
  deleteAppointment,
  getAllAppointment,
  postAppointment,
  updateAppointment,
} from "../controller/appoinment.js";
const router = express.Router();

router.post("/createappoinmnet", isPatientAuthenticated, postAppointment);
router.get("/getall", isAdminAuthenticated, getAllAppointment);
router.put("/updateappointment/:id", isAdminAuthenticated, updateAppointment);
router.delete(
  "/deleteappointment/:id",
  isAdminAuthenticated,
  deleteAppointment
);

export default router;
