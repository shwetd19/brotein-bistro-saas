import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    satisfactionLevel: {
      type: String,
      required: true,
    },
    valueForMoney: {
      type: String,
      required: true,
    },
    qualityOfMeals: {
      type: String,
      required: true,
    },
    deliveryExperience: {
      type: String,
      required: true,
    },
    suggestions: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Feedback = mongoose.model("Feedback", feedbackSchema);

export default Feedback;
