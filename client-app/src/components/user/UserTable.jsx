import React, {useState, useEffect} from 'react'
import UserService from '../../services/UserService'
import { Button, Fab, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom'
import { DataGrid, GridRowsProp, GridColDef, GridToolbar } from '@mui/x-data-grid';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import Avatar from "@mui/material/Avatar";

const UserTable = () => {
    const [users, setUsers] = useState([])
    useEffect(() => {
        UserService.getAll(setUsers)
    }, [])

    const navigate = useNavigate()

    const columns = [
        { field: 'firstName', headerName: 'First Name', width: 200 },
        { field: 'lastName', headerName: 'Last Name', width: 200 },
        { field: 'role', headerName: 'Role', width: 200 },
        { field: 'email', headerName: 'Email', width: 200 },
        { field: 'banned', headerName: 'Banned', width: 200 },
        {
            field: 'edit_id',
            headerName: 'Edit',
            headerAlign: 'center',
            renderCell: (params) => (
                <Button
                  variant="contained"
                  size="small"
                  style={{ marginLeft: 16 }}
                  tabIndex={params.hasFocus ? 0 : -1}
                  name={params.value}
                  onClick={(e) => navigate('/users/edit/'+params.value)}
                >
                  Edit
                </Button>
            ),
          },
          {
            field: 'banned_id',
            headerName: 'Ban',
            headerAlign: 'center',
            renderCell: (params) => (
                <Button
                  variant="contained"
                  size="small"
                  color="warning"
                  style={{ marginLeft: 16 }}
                  tabIndex={params.hasFocus ? 0 : -1}
                  disabled={params.value ? false : true}
                  onClick={(e) => UserService.ban(params.value)}
                >
                  Ban
                </Button>
            ),
          },
          {
            field: 'delete_id',
            headerName: 'Delete',
            headerAlign: 'center',
            renderCell: (params) => (
                <Button
                  variant="outlined"
                  size="small"
                  color="error"
                  style={{ marginLeft: 16 }}
                  tabIndex={params.hasFocus ? 0 : -1}
                  onClick={(e) => UserService.delete(params.value)}
                >
                  Delete
                </Button>
            ),
          },
      ];
      return (
        <Grid container spacing={2} sx={{px: 6}}>
        <Grid item xs={12}>
          <Typography variant='h3' sx={{mt: 2}}>All Users</Typography>
        </Grid>
        <Grid item xs={1}>
        <Fab size="small" aria-label="add new user">
            <Avatar sx={{ m: 1, bgcolor: "primary.main" }} onClick={() => navigate('/users/new')}>
              <AddOutlinedIcon />
            </Avatar>
          </Fab>
        </Grid>
        <Grid item xs={12}>
          <DataGrid rows={users} columns={columns} 
          components={{ Toolbar: GridToolbar }} 
          rowsPerPageOptions={[10, 15, 25, 50, 100]} 
          loading={users.length === 0}
          autoHeight={true}
          sx={{
            boxShadow: 2,
            border: 2,
            '& .MuiDataGrid-row:hover': {
            backgroundColor: 'secondary.light',
          },}}
          />
        </Grid>
        <Grid item xs={12}></Grid>
      </Grid>
        )
}

export default UserTable