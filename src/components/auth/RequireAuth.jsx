import { Navigate } from 'react-router';
import { useSelector } from 'react-redux';

const RequireAuth = ({ children, adminOnly = false }) => {
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);

  if (!token || !user) {
    return <Navigate to="/login" />;
  }

  if (adminOnly && !user.isAdmin) {
    return <Navigate to="/" />;
  }

  return children;
};

export default RequireAuth;
