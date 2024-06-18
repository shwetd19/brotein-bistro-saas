// controllers/activeSubscription.controller.js
import ActiveSubscription from "../models/activeSubscription.model.js";
import Subscription from "../models/subscription.model.js"; // Ensure correct import

export const approveAndMoveToActive = async (req, res) => {
  const { id } = req.params;

  console.log(`Attempting to approve subscription with ID: ${id}`); // Added logging

  try {
    const subscription = await Subscription.findById(id);

    if (!subscription) {
      console.log(`Subscription not found with ID: ${id}`); // Added logging
      return res.status(404).json({ message: "Subscription not found" });
    }

    console.log(`Found subscription: ${JSON.stringify(subscription)}`); // Log the found subscription

    // Create a new active subscription document
    const activeSubscription = new ActiveSubscription({
      username: subscription.username,
      date: subscription.date,
      plan: subscription.plan,
    });

    // Attempt to save the active subscription
    const savedActiveSubscription = await activeSubscription.save();
    console.log(`Successfully saved active subscription: ${savedActiveSubscription}`); // Log the saved active subscription

    // Instead of removing the original subscription, mark it as inactive or archive it
    // Note: Directly modifying the original subscription is commented out due to potential issues
    // await subscription.remove();
    // console.log(`Removed original subscription with ID: ${id}`); // Log removal

    // Respond with the newly saved active subscription
    res.status(200).json(savedActiveSubscription);
  } catch (error) {
    console.error(`Error processing subscription approval for ID: ${id}`, error); // Enhanced error logging
    res.status(500).json({ message: error.message });
  }
};
