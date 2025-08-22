import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../features/auth/Auth.context";
import { LoginForm } from "../features/auth/LoginForm";

export const LoginPage = () => {
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);

  return (
    <>
      <h1>Login</h1>

      <LoginForm />
    </>
  );
};