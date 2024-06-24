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
    const subscriptionsWithDetails = subscriptions.map((subscription) => {
      const subscriptionObject = subscription.toObject();
      const totalMeals = getInitialMeals(subscription.selectedPlan);
      subscriptionObject.DaysLeft = calculateDaysLeft(subscription.startDate);
      subscriptionObject.totalMeals = totalMeals; // Include total meals
      return subscriptionObject;
    });
    res.status(200).json(subscriptionsWithDetails);
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

    // Calculate DaysLeft and total meals
    const DaysLeft = calculateDaysLeft(subscription.startDate);
    const totalMeals = getInitialMeals(subscription.selectedPlan);

    // Include DaysLeft and total meals in the response
    const subscriptionWithDetails = {
      ...subscription.toObject(),
      DaysLeft,
      totalMeals,
    };

    res.status(200).json(subscriptionWithDetails);
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
// Record meal consumption
export const recordMeal = async (req, res) => {
  const { username, selectedPlan, date } = req.body;

  try {
    let subscription = await ActiveSubscription.findOne({ username });

    if (!subscription) {
      return res.status(404).json({ message: "Active subscription not found" });
    }

    if (subscription.totalMealsLeft <= 0) {
      return res.status(400).json({ message: "No meals left" });
    }

    // Update mealsTaken array
    subscription.mealsTaken.push({ date, plan: selectedPlan });

    // Update totalMealsLeft based on the difference
    const totalMealsOfThatPlan = getInitialMeals(subscription.selectedPlan);
    const mealsTakenCount = subscription.mealsTaken.length;
    subscription.totalMealsLeft = totalMealsOfThatPlan - mealsTakenCount;

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

// Get Meal Records of that Particular User
export const getMealRecordsByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const subscriptions = await ActiveSubscription.find({ userId });
    const mealRecords = subscriptions.map(async (subscription) => {
      // Calculate DaysLeft and total meals for each subscription
      const DaysLeft = calculateDaysLeft(subscription.startDate);
      const totalMealsOfThatPlan = getInitialMeals(subscription.selectedPlan); // Total meals for the selected plan

      // Ensure mealsTaken is an array to avoid errors
      if (!Array.isArray(subscription.mealsTaken)) {
        subscription.mealsTaken = [];
      }

      // Calculate totalMealsLeft based on mealsTaken array
      const mealsTakenCount = subscription.mealsTaken.length;
      const totalMealsLeft = totalMealsOfThatPlan - mealsTakenCount;

      return {
        ...subscription.toObject(),
        mealsTaken: subscription.mealsTaken, // Explicitly include mealsTaken in the returned object
        DaysLeft, // Include DaysLeft in the response
        totalMealsLeft, // Include total meals left in the response
        totalMealsOfThatPlan, // Include total meals of that plan in the response
      };
    });

    const mealRecordsWithDetails = await Promise.all(mealRecords);
    res.status(200).json(mealRecordsWithDetails);
  } catch (error) {
    console.error(`Error fetching meal records for user ID: ${userId}`, error);
    res.status(500).json({ message: error.message });
  }
};

// Function to get count of all active subscriptions
export const getCountOfActiveSubscriptions = async (req, res) => {
  try {
    const count = await ActiveSubscription.countDocuments({});
    res.status(200).json(count);
  } catch (error) {
    console.error("Error getting count of active subscriptions:", error);
    res.status(500).json({ message: error.message });
  }
};

// In activeSubscription.controller.js

// Admin record meal function
export const adminRecordMeal = async (req, res) => {
  const { username, selectedPlan, date } = req.body;

  try {
    let subscription = await ActiveSubscription.findOne({ username });

    if (!subscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }

    if (subscription.totalMealsLeft <= 0) {
      return res.status(400).json({ message: "No meals left" });
    }

    // Update mealsTaken array
    subscription.mealsTaken.push({ date, plan: selectedPlan });

    // Update totalMealsLeft based on the difference
    const totalMealsOfThatPlan = getInitialMeals(subscription.selectedPlan);
    const mealsTakenCount = subscription.mealsTaken.length;
    subscription.totalMealsLeft = totalMealsOfThatPlan - mealsTakenCount;

    await subscription.save();

    res.status(200).json(subscription);
  } catch (error) {
    console.error("Error recording meal:", error);
    res.status(500).json({ message: error.message });
  }
};
