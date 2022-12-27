import {
  TextField, Typography, Box, Stack, Button,
} from '@mui/material';

export const SignUp = () => {
  return (
    <Box
      component="form"
      sx={{
        p: 2,
        maxWidth: '995px',
        margin: '10px',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography variant="h4" component="h4">Register</Typography>
      <TextField focused id="userName" label="Enter User Name" variant="outlined" margin="normal" />
      <TextField id="firstName" label="Enter First Name" variant="outlined" margin="normal" />
      <TextField id="lastName" label="Enter Last Name" variant="outlined" margin="normal" />
      <TextField id="email" label="Enter Email" variant="outlined" margin="normal" />
      <TextField id="password" label="Enter Password" variant="outlined" margin="normal" />
      <Stack spacing={2} direction="row">
        <Button type="submit" variant="contained">Register</Button>
        <Button variant="outlined">Login Page</Button>
      </Stack>
    </Box>
  );
};
