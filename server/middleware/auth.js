import { User } from "../modals/user.js";
import { catchAsyncErrors } from "./catchAsyncErrors.js";
import ErrorHandler from "./error.js";
import jwt from "jsonwebtoken";

export const isAdminAuthenticated = catchAsyncErrors(async (req, res, next) => {
  // for authentication
  const token = req.cookies.adminToken;

  if (!token) return next(new ErrorHandler("Admin is not authenticated!", 400));

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.user = await User.findById(decoded.id);

  // for admin authorization
  if (req.user.role !== "Admin") {
    return next(
      new ErrorHandler(
        `${req.user.role} has not authorised for this page!`,
        400
      )
    );
  }

  next();
});

export const isPatientAuthenticated = catchAsyncErrors(
  async (req, res, next) => {
    // for authentication
    const token = req.cookies.patientToken;

    if (!token)
      return next(new ErrorHandler("Patient is not authenticated!", 400));

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);

    // for admin authorization
    if (req.user.role !== "Patient") {
      return next(
        new ErrorHandler(
          `${req.user.role} has not authorised for this page!`,
          400
        )
      );
    }

    next();
  }
);
