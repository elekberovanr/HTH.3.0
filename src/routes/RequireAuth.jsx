import { useSelector, useDispatch } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { logout } from '../../redux/reducers/userSlice';

const RequireAuth = ({ children, adminOnly = false }) => {
  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (adminOnly && !user.isAdmin) {
    dispatch(logout()); 
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default RequireAuth;
