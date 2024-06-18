<<<<<<< HEAD
// App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute'; // Import AdminRoute
=======
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
>>>>>>> 2341ef539a3226321b9f488c5636ff60602e3aa4

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
<<<<<<< HEAD
        <Route path='/' element={<Home />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
=======
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
>>>>>>> 2341ef539a3226321b9f488c5636ff60602e3aa4
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route element={<AdminRoute />}>
          <Route path='/about' element={<About />} /> {/* Protected admin route */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
