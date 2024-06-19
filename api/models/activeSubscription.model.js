import mongoose from "mongoose";

const ActiveSubscriptionSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    // Updated selectedPlan with the new enum values
    selectedPlan: {
      type: String,
      enum: [
        "Basic Mini Bowl",
        "Two Times Mini Bowl",
        "Premium",
        "Platinum",
        "150 Grams Protein Source",
        "200 Grams Protein Source",
      ],
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    selectedBranch: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const ActiveSubscription = mongoose.model(
  "ActiveSubscription",
  ActiveSubscriptionSchema,
  "activesubscriptions"
);

export default ActiveSubscription;
