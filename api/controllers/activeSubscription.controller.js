// controllers/activeSubscription.controller.js
import ActiveSubscription from "../models/activeSubscription.model.js";
import Subscription from "../models/subscription.model.js"; // Ensure correct import

export const approveAndMoveToActive = (req, res) => {
  const { id } = req.params;

  console.log(`Attempting to approve subscription with ID: ${id}`); // Added logging

  Subscription.findById(id)
    .then(async (subscription) => {
      if (!subscription) {
        console.log(`Subscription not found with ID: ${id}`); // Added logging
        return res.status(404).json({ message: "Subscription not found" });
      }

      console.log(`Found subscription: ${subscription}`); // Log the found subscription

      // Save the subscription to the ActiveSubscription collection
      const activeSubscription = new ActiveSubscription({
        username: subscription.username,
        date: subscription.date,
        plan: subscription.plan,
      });

      await activeSubscription.save();
      console.log(
        `Successfully saved active subscription: ${activeSubscription}`
      ); // Log the saved active subscription

      // Optionally, remove the original subscription
      await subscription.remove();
      console.log(`Removed original subscription with ID: ${id}`); // Log removal

      res.status(200).json(activeSubscription);
    })
    .catch((error) => {
      console.error(
        `Error processing subscription approval for ID: ${id}`,
        error
      ); // Enhanced error logging
      res.status(500).json({ message: error.message });
    });
};
