// components/ActiveSubscriberRoute.jsx
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

export default function ActiveSubscriberRoute() {
  const { currentUser } = useSelector((state) => state.user);
  const isActiveSubscriber = currentUser && currentUser.isActiveSubscriber;

  return isActiveSubscriber ? <Outlet /> : <Navigate to="/questionnaire" />;
}
