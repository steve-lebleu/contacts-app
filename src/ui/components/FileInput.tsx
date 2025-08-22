import { useState, useRef } from 'react';
import { 
  Box, 
  Button, 
  Typography, 
  Paper,
  Icon
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export const FileInput = ({ onChange }: { onChange: (file: File | null) => void }) => {
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      onChange(e.target.files[0]);
    }
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <Paper elevation={0} sx={{ marginBottom: '20px' }}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      
      <Button
        variant="outlined"
        fullWidth
        onClick={handleClick}
        sx={{
          borderWidth: 2,
          borderColor: 'grey.300',
          p: 2,
          borderRadius: 2,
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          gap: 2,
          textTransform: 'none',
          transition: 'all 0.2s',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            borderColor: 'primary.main'
          }
        }}
      >
        <Icon 
          component={CloudUploadIcon} 
          sx={{ 
            fontSize: 36,
            color: 'primary.main'
          }} 
        />
        <Box sx={{ textAlign: 'left' }}>
          <Typography variant="subtitle1" component="div" sx={{ fontWeight: 500 }}>
            {file ? file.name : 'Importer un fichier'}
          </Typography>

          <Typography variant="caption" color="text.secondary">
            {file ? `${(file.size / 1024).toFixed(2)} KB` : 'Cliquez pour sélectionner'}
          </Typography>
        </Box>
      </Button>
    </Paper>
  );
};