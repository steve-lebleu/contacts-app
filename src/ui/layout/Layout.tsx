import { AppBar, Toolbar, Box } from '@mui/material';
import { useAuth } from '../../features/auth/Auth.context';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import './Layout.css';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <AppBar position="static">
        <Toolbar sx={{
          display: 'flex',
          maxWidth: 'auto',
          margin: '0 auto',
          justifyContent: 'center',
        }}>
          <Box className="logo" onClick={() => navigate('/')}>Takt</Box>
          {token && <Box className="logout" onClick={() => logout()}><LogoutIcon sx={{ marginRight: '8px' }} /> Log out</Box>}
        </Toolbar>
      </AppBar>

      <main>
        {children}
      </main>
      
      <footer>
        <p>&copy; Takt {new Date().getFullYear()} - Your contacts management application</p>
      </footer>
    </>
  );
};