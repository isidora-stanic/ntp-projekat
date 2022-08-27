import React, { useEffect } from "react";
import UserService from "../../services/UserService";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useForm } from "../util/useForm";
import { Link, useNavigate, useParams } from "react-router-dom";
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const UserForm = () => {
  let navigate = useNavigate();
  let { id } = useParams();
  let isAddMode = !id;

  const create = (e) => {
    if (isAddMode) {
      console.log("sending", { ...values });
      UserService.create({ ...values });
    } else {
      console.log("sending", { ...values });
      UserService.update(id, { ...values });
    }
    navigate(-1)
  };

  const { values, setValues, onChange, onSubmit } = useForm(create, {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: ''
  });

  useEffect(() => {
    if (!isAddMode) {
      UserService.getOne(id, setValues);
    }
  }, [id]);

  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          {isAddMode ? <AddOutlinedIcon /> : <CreateOutlinedIcon />}
        </Avatar>
        <Typography component="h1" variant="h5" color="primary">
          {isAddMode ? 'Add User' : 'Edit User'}
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={onSubmit}
          sx={{ mt: 3 }}
          autoComplete="off"
        >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="given-name"
              name="firstName"
              required
              fullWidth
              id="firstName"
              label="First Name"
              autoFocus
              color="primary"
              onChange={onChange}
              value={values.firstName || ''}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="family-name"
              color="primary"
              onChange={onChange}
              value={values.lastName || ''}
            />
          </Grid>
          <Grid item xs={2}>
          <FormControl sx={{ minWidth: 175 }}>
            <InputLabel id='lbl'>Role *</InputLabel>
            <Select
              labelId="lbl"
              id="role"
              value={values.role || ''}
              label="Role *"
              onChange={onChange}
              name='role'
              required
              fullWidth
              autoComplete="role"
              color="primary"
            >
              <MenuItem value={'ADMIN'}>Admin</MenuItem>
              <MenuItem value={'REGUSER'}>User</MenuItem>
            </Select>
            </FormControl>
          </Grid>
          <Grid item xs={10}>
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              color="primary"
              onChange={onChange}
              value={values.email || ''}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              color="primary"
              onChange={onChange}
              value={values.password || ''}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          {isAddMode ? 'Add User' : 'Edit User'}
        </Button>
        <Button fullWidth variant="outlined" type='button' onClick={() => navigate(-1)} >Back</Button>
        <Grid container justifyContent="flex-end"></Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default UserForm;
