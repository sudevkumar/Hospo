import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js";
import ErrorHandler from "../middleware/error.js";
import { Appoinment } from "../modals/appoinment.js";
import { User } from "../modals/user.js";

export const postAppointment = catchAsyncErrors(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    dob,
    gender,
    appoinment_date,
    department,
    doctor_firstName,
    doctor_lastName,
    haveVisited,
    address,
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !dob ||
    !gender ||
    !appoinment_date ||
    !department ||
    !doctor_firstName ||
    !doctor_lastName ||
    !address
  ) {
    return next(new ErrorHandler("Please fill the full form!", 400));
  }

  const isConflict = await User.find({
    firstName: doctor_firstName,
    lastName: doctor_lastName,
    role: "Doctor",
    doctorDepartment: department,
  });

  if (isConflict.length === 0) {
    return next(new ErrorHandler("Doctor not found!", 400));
  }

  if (isConflict.length > 1) {
    return next(
      new ErrorHandler(
        "Doctor conflict! Please contact through email or phone!",
        400
      )
    );
  }

  const doctorId = isConflict[0]._id;
  const patientId = req.user._id;
  const appoinment = await Appoinment.create({
    firstName,
    lastName,
    email,
    phone,
    dob,
    gender,
    appoinment_date,
    department,
    doctor: {
      firstName: doctor_firstName,
      lastName: doctor_lastName,
    },
    haveVisited,
    address,
    doctorId,
    patientId,
  });

  res.status(200).json({
    success: true,
    message: "Appointment send successfully!",
  });
});

export const getAllAppointment = catchAsyncErrors(async (req, res, next) => {
  const appointment = await Appoinment.find();

  res.status(200).json({
    success: true,
    appointment,
  });
});

export const updateAppointment = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  let appoinment = await Appoinment.findById(id);

  if (!appoinment) {
    return next(new ErrorHandler("Appointment not found!", 400));
  }

  appoinment = await Appoinment.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
    useFidAndModify: false,
  });

  res.status(200).json({
    success: true,
    appoinment,
    message: "Appointment status updated!",
  });
});

export const deleteAppointment = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  let appoinment = await Appoinment.findById(id);

  if (!appoinment) {
    return next(new ErrorHandler("Appointment not found!", 400));
  }

  await appoinment.deleteOne();

  res.status(200).json({
    success: true,
    message: "Appointment deleted!",
  });
});
