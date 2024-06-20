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
import MealRecordDetails from "./pages/MealRecordDetails"; // Import MealRecordDetails component

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/get-your-meal" element={<GetYourMeal />} />
          <Route path="/meal-records" element={<MealRecords />} />
          <Route path="/meal-records/:id" element={<MealRecordDetails />} /> {/* Added route for MealRecordDetails */}
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
        </Route>
        <Route path="/subscription" element={<SubscriptionPage />} />
      </Routes>
    </BrowserRouter>
  );
}
