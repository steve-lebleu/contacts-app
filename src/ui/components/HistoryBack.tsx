import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import Undo from "@mui/icons-material/Undo";

export const HistoryBack = () => {
  const navigate = useNavigate();

  return (
    <Button variant="contained" color="inherit" onClick={() => navigate(-1)} startIcon={<Undo />}>Go back</Button>
  );
};
