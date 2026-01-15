import { Navigate } from 'react-router-dom';
import { getUserFromToken } from '@/features/auth/auth.utils';

const AdminRoute = ({ children }) => {
  const user = getUserFromToken();
  return user?.role === 'admin'
    ? children
    : <Navigate to="/unauthorized" />;
};

export default AdminRoute;
