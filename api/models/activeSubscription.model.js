import mongoose from "mongoose";

const ActiveSubscriptionSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    date: {
      type: Date,
      required: true,
    },
    plan: {
      type: String,
      enum: ["basic", "premium"],
      required: true,
    },
  },
  { timestamps: true }
);

const ActiveSubscription = mongoose.model(
  "ActiveSubscription",
  ActiveSubscriptionSchema,
  "activesubscriptions" // Explicitly setting the collection name
);

export default ActiveSubscription;
