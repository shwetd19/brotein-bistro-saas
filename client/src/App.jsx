// App.jsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "./pages/Home";
import SubscriptionseRequests from "./pages/SubscriptionseRequests";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import ActiveSubscriptions from "./pages/ActiveSubscriptions";
import Header from "./components/Header";
import SubscriptionPage from "./pages/GetSubscription";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
import ActiveSubscriberRoute from "./components/ActiveSubscriberRoute";
import FeedbackForm from "./pages/FeedbackForm";
import MealRecords from "./pages/MealRecords";
import MealRecordDetails from "./pages/MealRecordDetails";
import UserProfile from "./pages/ClientProfilePage";
import SubscribedPlan from "./pages/ClientSubscribedPlan";
import Plans from "./pages/Plans";
import Bmi from "./pages/Bmi";
import Questionnaire from "./pages/Questionnaire";
import NotFoundPage from "./pages/NotFoundPage";
import Add from "./pages/Add";
import FeedbackResponses from "./pages/FeedbackResponses";

export default function App() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/not-found" element={<NotFoundPage />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/questionnaire" element={<Questionnaire />} />
        <Route path="/bmi" element={<Bmi />} />
        <Route path="/plans" element={<Plans />} />

        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/feedback-from" element={<FeedbackForm />} />
          <Route path="/subscription" element={<SubscriptionPage />} />
          <Route path="/user-profile/:id" element={<UserProfile />} />
        </Route>

        <Route element={<AdminRoute />}>
          <Route
            path="/subscriptionse-requests"
            element={<SubscriptionseRequests />}
          />
          <Route path="/feedback-responses" element={<FeedbackResponses />} />
          <Route
            path="/active-subscriptions"
            element={<ActiveSubscriptions />}
          />
          <Route path="/upload-add" element={<Add />} />
          <Route path="/meal-records" element={<MealRecords />} />
          <Route path="/meal-records/:id" element={<MealRecordDetails />} />
        </Route>

        <Route element={<ActiveSubscriberRoute />}>
          <Route
            path="/user-subscribed-plan/:id"
            element={<SubscribedPlan />}
          />
        </Route>

        <Route path="*" element={<Navigate to="/sign-in" />} />
      </Routes>
    </BrowserRouter>
  );
}
