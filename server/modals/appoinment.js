import mongoose from "mongoose";
import validator from "validator";

const appoinmentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: [3, "First name must contain atleast 3 characters!"],
  },

  lastName: {
    type: String,
    required: true,
    minLength: [3, "Last name must contain atleast 3 characters!"],
  },

  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, "Please provide a valid email!"],
  },

  phone: {
    type: String,
    required: true,
    minLength: [10, "Phone number must contain exact 10 digit!"],
    maxLength: [10, "Phone number must contain exact 10 digit!"],
  },

  dob: {
    type: Date,
    required: [true, "DOB is required!"],
  },

  gender: {
    type: String,
    required: true,
    enum: ["Male", "Female"],
  },

  appoinment_date: {
    type: String,
    required: true,
  },

  department: {
    type: String,
    required: true,
  },

  doctor: {
    firstName: {
      type: String,
      required: true,
    },

    lastName: {
      type: String,
      required: true,
    },
  },

  haveVisited: {
    type: Boolean,
    default: false,
  },

  doctor_id: {
    type: mongoose.Schema.ObjectId,
    require: true,
  },

  patient_id: {
    type: mongoose.Schema.ObjectId,
    require: true,
  },

  address: {
    type: String,
    required: true,
  },

  status: {
    type: String,
    enum: ["Pending", "Accepted", "Rejected"],
    default: "Pending",
  },
});

export const Appoinment = mongoose.model("Appoinment", appoinmentSchema);
