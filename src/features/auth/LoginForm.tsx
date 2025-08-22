import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  Alert,
  TextField, 
  Button, 
  InputAdornment,
  IconButton,
  CircularProgress
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { useAuth } from "./Auth.context";
import { fetchService } from "../../services/fetch.service";
import { API_CONFIG } from "../../api/api.config";

const { ENDPOINTS: { AUTH }, METHODS } = API_CONFIG; 

export const LoginForm = () => {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isValid } } = useForm({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user && user.role === 'admin') {
      navigate('/users');
    } else if (user && user.role === 'user') {
      navigate('/contacts');
    }
  }, [user, navigate]);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async ({ email, password }: { email: string, password: string }) => {
    setError('');
    setLoading(true);

    if (!isValid) {
      setLoading(false);
      return false;
    }

    const response = await fetchService(AUTH.LOGIN, METHODS.POST, { email, password });

    if (response.error) {
      setError(response.error);
      setLoading(false);
      return false;
    }

    if (response.data.user && response.data.token) {
      login(response.data.user, response.data.token);
    }

    setLoading(false);
  };

  return (
    <>
      {error && <Alert severity="error">{error}</Alert>}

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Email"
          required
          variant="outlined"
          size="small"
          id="email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address'
            }
          })}
          error={!!errors.email}
          helperText={errors.email?.message}
          sx={{ margin: '20px 0 10px 0' }} />

        <TextField
          label="Password"
          required
          type={showPassword ? 'text' : 'password'}
          variant="outlined"
          id="password"
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password must be at least 8 characters long'
            }
          })}
          size="small"
          error={!!errors.password}
          helperText={errors.password?.message}
          sx={{ margin: '10px 0 20px 0' }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={togglePassword} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }} />

        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={loading || !isValid}
        >
          {loading && <CircularProgress size="20px" sx={{ marginRight: '5px' }} />}
          Login
        </Button>
      </form>
    </>
  );
};
