// ActiveSubscriberRoute.jsx
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { checkActiveSubscription } from "../redux/actions";
import { Outlet, Navigate } from "react-router-dom";

export default function ActiveSubscriberRoute() {
  const dispatch = useDispatch();
  const { currentUser, activeSubscriptions } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (currentUser) {
      dispatch(checkActiveSubscription(currentUser._id));
    }
  }, [dispatch, currentUser]);

  if (!currentUser) {
    return <Navigate to="/sign-in" />;
  }

  // Check if activeSubscriptions is defined before accessing its properties
  if (!activeSubscriptions) {
    return null; // or loading indicator
  }

  // Check if currentUser has an active subscription
  const isActiveSubscriber = activeSubscriptions.some(
    (subscription) => subscription.userId === currentUser._id
  );

  if (!isActiveSubscriber) {
    return <Navigate to="/not-found" />;
  }

  return <Outlet />;
}
