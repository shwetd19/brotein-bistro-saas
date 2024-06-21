import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import GetYourMeal from "./pages/GetMeal";
import MealRecords from "./pages/MealRecords";
import MealRecordDetails from "./pages/MealRecordDetails";
import UserProfile from "./pages/ClientProfilePage";
import SubscribedPlan from "./pages/ClientSubscribedPlan";
import Plans from "./pages/Plans";
import Bmi from "./pages/Bmi";
import Questionnaire from "./pages/Questionnaire";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/not-found" element={<NotFoundPage />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/Questionnaire" element={<Questionnaire />} />
        <Route path="/bmi" element={<Bmi />} />
        <Route path="/plans" element={<Plans />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/get-your-meal" element={<GetYourMeal />} />
          <Route path="/subscription" element={<SubscriptionPage />} />
          <Route path="/user-profile/:id" element={<UserProfile />} />
          <Route
            path="/user-subscribed-plan/:id"
            element={<SubscribedPlan />}
          />
        </Route>
        <Route element={<AdminRoute />}>
          <Route
            path="/subscriptionse-requests"
            element={<SubscriptionseRequests />}
          />
          <Route
            path="/active-subscriptions"
            element={<ActiveSubscriptions />}
          />
          <Route path="/meal-records" element={<MealRecords />} />
          <Route path="/meal-records/:id" element={<MealRecordDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
