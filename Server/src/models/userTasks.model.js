const mongoose = require("mongoose");
const validator = require("validator");
const { status } = require("../constants/status");

const userTasksSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    duration: { type: Date, default: Date.now },
    statusType: {
      type: String,
      required: true,
      enum: ["PENDING", "COMPLETED", "CANCELLED"],
      default: "PENDING",
    },
    user: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
  },
  {
    collection: "UserTasks",
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("UserTasks", userTasksSchema);
module.exports = User;
