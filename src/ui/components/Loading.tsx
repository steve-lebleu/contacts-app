import { Backdrop, Box, CircularProgress, Typography } from "@mui/material"

export const Loading = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
      <Backdrop
        open={true}
        sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: '10px', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)'
        }}
      >
        <CircularProgress size="30px" sx={{ color: 'white' }} /> 
        <Typography variant="h5" sx={{ color: 'white' }}>Loading...</Typography>
      </Backdrop>
    </Box>
  )
};
