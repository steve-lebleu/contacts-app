import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  Alert,
  TextField, 
  Button,
  CircularProgress,
  MenuItem,
} from "@mui/material";

import { API_CONFIG } from "../../api/api.config";
import { useAuth } from "../auth/Auth.context";
import { FileInput } from "../../ui/components/FileInput";
import { Contact } from "./Contact.model";
import { fetchService } from "../../services/fetch.service";
import { HistoryBack } from "../../ui/components/HistoryBack";
type ContactFormProps = {
  name: string;
  email: string;
  phone: string;
  avatar: File | null;
  list: string;
};

const { ENDPOINTS: { CONTACTS }, METHODS } = API_CONFIG;

export const ContactForm = ({ contact }: { contact?: Contact }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { register, handleSubmit, formState: { errors, isValid }, setValue, watch } = useForm<ContactFormProps>({
    mode: 'onChange',
    defaultValues: {
      name: contact?.name,
      email: contact?.email,
      phone: contact?.phone,
      avatar: null,
      list: contact?.list
    }
  });

  const { token } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async ({ name, email, phone, avatar, list }: { name: string, email: string, phone: string, avatar: File | null, list: string  }) => {
    setError('');
    setLoading(true);

    if (!isValid) {
      setLoading(false);
      return false;
    }
    
    const formData = new FormData();

    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('list', list);

    if (avatar) {
      formData.append('avatar', avatar);
    }

    const url = contact ? CONTACTS.UPDATE(contact._id) : CONTACTS.CREATE;
    const method = contact ? METHODS.PUT : METHODS.POST;
    const { error } = await fetchService(url, method, formData, token);

    if (error) {
      setError(error);
      setLoading(false);
      return;
    }

    setLoading(false);
    navigate('/contacts');
  };

  return (
    <div style={{ width: '360px' }}>
      {error && <Alert severity="error" sx={{ marginBottom: '20px' }}>{error}</Alert>}

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Name"
          required
          variant="outlined"
          size="small"
          id="name"
          {...register('name', {
            required: 'Name is required',
            minLength: {
              value: 2,
              message: 'Name must be at least 2 characters long'
            }
          })}
          error={!!errors.name}
          helperText={errors.name?.message}
          sx={{ marginBottom: '20px' }}
        />

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
          sx={{ marginBottom: '20px' }}
        />

        <TextField
          label="Phone"
          required
          variant="outlined"
          size="small"
          id="phone"
          {...register('phone', {
            required: 'Phone is required',
            pattern: {
              value: /^[0-9]{4}\/[0-9]{2}\.[0-9]{2}\.[0-9]{2}$/,
              message: 'Invalid phone number'
            }
          })}
          error={!!errors.phone}
          helperText={errors.phone?.message}
          sx={{ marginBottom: '20px' }}
        />

        <TextField
          select
          required
          id="list"
          label="List"
          size="small"
          variant="outlined"
          value={watch('list') || ''}
          {...register('list', {
            required: 'List is required'
          })}
          onChange={(e) => {
            setValue('list', e.target.value, { shouldValidate: true });
          }}
          error={!!errors.list}
          helperText={errors.list?.message}
          sx={{ marginBottom: '20px' }}
        >
          <MenuItem value="Blacklist">Blacklist</MenuItem>
          <MenuItem value="Family">Family</MenuItem>
          <MenuItem value="Friends">Friends</MenuItem>
          <MenuItem value="Work">Work</MenuItem>
        </TextField>
  
        <FileInput {...register('avatar')} onChange={(file) => {
          setValue('avatar', file);
        }} />

        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={!isValid}
          sx={{ marginBottom: '10px' }}
        >
          {loading && <CircularProgress sx={{ color: 'white', fontSize: '0.7rem', marginRight: '5px' }} />}
          {contact ? 'Update Contact' : 'Add Contact'}
        </Button>

        <HistoryBack />
      </form>
    </div>
  )
};
