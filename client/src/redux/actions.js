// redux/actions.js
import axios from 'axios';

export const checkActiveSubscription = (userId) => async (dispatch) => {
  try {
    const response = await axios.get(`api/active/subs/users/${userId}/meals`); // Updated API endpoint
    dispatch({ type: 'SET_ACTIVE_SUBSCRIPTIONS', payload: response.data });
  } catch (error) {
    console.error('Error fetching active subscriptions:', error);
    // Handle error, possibly dispatch an action to set an error state
  }
};
