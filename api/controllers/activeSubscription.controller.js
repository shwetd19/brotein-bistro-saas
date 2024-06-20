import ActiveSubscription from "../models/activeSubscription.model.js";
import Subscription from "../models/subscription.model.js";

// Helper function to calculate DaysLeft
const calculateDaysLeft = (startDate) => {
  const currentDate = new Date();
  const start = new Date(startDate);
  const daysPassed = Math.ceil((currentDate - start) / (1000 * 60 * 60 * 24));
  return 50 - daysPassed > 0 ? 50 - daysPassed : 0;
};

const getInitialMeals = (selectedPlan) => {
  switch (selectedPlan) {
    case "Basic Mini Bowl":
      return 26;
    case "Platinum":
      return 60;
    case "Two Times Mini Bowl":
      return 52;
    case "150 Grams Protein Source":
      return 30;
    case "Premium":
      return 30;
    case "200 Grams Protein Source":
      return 30;
    default:
      return 0;
  }
};

export const approveAndMoveToActive = async (req, res) => {
  const { id } = req.params;
  const {
    phoneNumber,
    address,
    selectedPlan,
    startDate,
    selectedBranch,
    userId,
  } = req.body; // Extract userId from the request body

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
      !selectedBranch ||
      !userId // Check if userId is present
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
      userId, // Include userId in the active subscription data
      totalMealsLeft: getInitialMeals(selectedPlan),
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

// Record meal consumption
export const recordMeal = async (req, res) => {
  const { username, selectedPlan, date } = req.body;

  try {
    const subscription = await ActiveSubscription.findOne({ username });

    if (!subscription) {
      return res.status(404).json({ message: "Active subscription not found" });
    }

    if (subscription.totalMealsLeft <= 0) {
      return res.status(400).json({ message: "No meals left" });
    }

    subscription.mealsTaken.push({ date, plan: selectedPlan });
    subscription.totalMealsLeft -= 1;
    await subscription.save();

    res.status(200).json(subscription);
  } catch (error) {
    console.error("Error recording meal:", error);
    res.status(500).json({ message: error.message });
  }
};

// Fetch meal records for a specific subscription
export const getMealRecordsBySubscriptionId = async (req, res) => {
  const { id } = req.params;

  try {
    const subscription = await ActiveSubscription.findById(id);
    if (!subscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }

    // Ensure mealsTaken is an array to avoid errors
    if (!Array.isArray(subscription.mealsTaken)) {
      subscription.mealsTaken = [];
    }

    res.status(200).json(subscription);
  } catch (error) {
    console.error(
      `Error fetching meal records for subscription ID: ${id}`,
      error
    );
    res.status(500).json({ message: error.message });
  }
};

// Get Meal Records of that Particular User

export const getMealRecordsByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const subscriptions = await ActiveSubscription.find({ userId });
    const mealRecords = subscriptions.map((subscription) => {
      // Ensure mealsTaken is an array to avoid errors
      if (!Array.isArray(subscription.mealsTaken)) {
        subscription.mealsTaken = [];
      }
      return {
       ...subscription.toObject(),
        mealsTaken: subscription.mealsTaken, // Explicitly include mealsTaken in the returned object
      };
    });

    res.status(200).json(mealRecords);
  } catch (error) {
    console.error(`Error fetching meal records for user ID: ${userId}`, error);
    res.status(500).json({ message: error.message });
  }
};
