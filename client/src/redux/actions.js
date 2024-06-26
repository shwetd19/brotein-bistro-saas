// redux/actions.js
import axios from "axios";
import { updateUserSuccess } from "./user/userSlice"; // Import updateUserSuccess action

export const checkActiveSubscription =
  (userId) => async (dispatch, getState) => {
    try {
      const response = await axios.get(
        `https://brotein-bistro-01am.onrender.com/api/active/subs/getAllActiveSubs`
      );
      const activeSubscribers = response.data;

      const userHasActiveSubscription = activeSubscribers.some(
        (subscriber) => subscriber.userId === userId
      );

      const { currentUser } = getState().user;

      const updatedUser = {
        ...currentUser,
        isActiveSubscriber: userHasActiveSubscription,
      };

      dispatch(updateUserSuccess(updatedUser)); // Dispatch updateUserSuccess with updated user

      return updatedUser; // Return updatedUser for further processing if needed
    } catch (error) {
      console.error("Error fetching active subscriptions:", error);
      // Handle error, possibly dispatch an action to set an error state
      throw error; // Rethrow the error to propagate it further
    }
  };
