import ActiveSubscription from "../models/activeSubscription.model.js";
import Subscription from "../models/subscription.model.js";

// Helper function to calculate DaysLeft
const calculateDaysLeft = (startDate) => {
  const currentDate = new Date();
  const start = new Date(startDate);
  const daysPassed = Math.ceil((currentDate - start) / (1000 * 60 * 60 * 24));
  return 50 - daysPassed > 0 ? 50 - daysPassed : 0;
};

export const approveAndMoveToActive = async (req, res) => {
  const { id } = req.params;
  const { phoneNumber, address, selectedPlan, startDate, selectedBranch } =
    req.body;

  try {
    let subscription = await Subscription.findById(id);

    if (!subscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }

    if (
      !phoneNumber ||
      !address ||
      !selectedPlan ||
      !startDate ||
      !selectedBranch
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const activeSubscriptionData = {
      username: subscription.username,
      phoneNumber,
      address,
      selectedPlan,
      startDate,
      selectedBranch,
    };

    console.log("Creating active subscription:", activeSubscriptionData);

    const activeSubscription = new ActiveSubscription(activeSubscriptionData);

    const savedActiveSubscription = await activeSubscription.save();

    await subscription.deleteOne();

    res.status(200).json(savedActiveSubscription);
  } catch (error) {
    console.error(
      `Error processing subscription approval for ID: ${id}`,
      error
    );
    res.status(500).json({ message: error.message });
  }
};

// Read All Operation
export const getAllActiveSubscriptions = async (req, res) => {
  try {
    const subscriptions = await ActiveSubscription.find({});
    const subscriptionsWithDaysLeft = subscriptions.map((subscription) => {
      const subscriptionObject = subscription.toObject();
      subscriptionObject.DaysLeft = calculateDaysLeft(subscription.startDate);
      return subscriptionObject;
    });
    res.status(200).json(subscriptionsWithDaysLeft);
  } catch (error) {
    console.error("Error retrieving all active subscriptions:", error);
    res.status(500).json({ message: error.message });
  }
};

// Read Operation
export const getActiveSubscriptionById = async (req, res) => {
  const { id } = req.params;

  try {
    const subscription = await ActiveSubscription.findById(id);
    if (!subscription) {
      return res.status(404).json({ message: "Active subscription not found" });
    }

    // Calculate DaysLeft
    const DaysLeft = calculateDaysLeft(subscription.startDate);

    // Include DaysLeft in the response
    const subscriptionWithDaysLeft = {
      ...subscription.toObject(),
      DaysLeft,
    };

    res.status(200).json(subscriptionWithDaysLeft);
  } catch (error) {
    console.error(`Error finding active subscription for ID: ${id}`, error);
    res.status(500).json({ message: error.message });
  }
};

// Update Operation
export const updateActiveSubscription = async (req, res) => {
  const { id } = req.params;

  try {
    const subscription = await ActiveSubscription.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    if (!subscription) {
      return res.status(404).json({ message: "Active subscription not found" });
    }
    res.status(200).json(subscription);
  } catch (error) {
    console.error(`Error updating active subscription for ID: ${id}`, error);
    res.status(500).json({ message: error.message });
  }
};

// Delete Operation
export const deleteActiveSubscription = async (req, res) => {
  const { id } = req.params;

  try {
    const subscription = await ActiveSubscription.findByIdAndDelete(id);
    if (!subscription) {
      return res.status(404).json({ message: "Active subscription not found" });
    }
    res
      .status(200)
      .json({ message: "Active subscription deleted successfully" });
  } catch (error) {
    console.error(`Error deleting active subscription for ID: ${id}`, error);
    res.status(500).json({ message: error.message });
  }
};
