// AdminRoute.jsx
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

export default function AdminRoute() {
  const { currentUser } = useSelector((state) => state.user);
  // Ensure currentUser exists and isAdmin is true
  return currentUser && currentUser.isAdmin ? <Outlet /> : <Navigate to='/not-found' />;
}
