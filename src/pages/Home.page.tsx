import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../features/auth/Auth.context";

export const HomePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.role === 'admin') {
      navigate('/users');
    } else if (user && user.role === 'user') {
      navigate('/contacts');
    } else {
      navigate('/login');
    }
  }, [user, navigate]);

  return <></>;
};