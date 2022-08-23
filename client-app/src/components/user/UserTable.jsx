import React, {useState, useEffect} from 'react'
import UserService from '../../services/UserService'
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom'
import { DataGrid, GridRowsProp, GridColDef, GridToolbar } from '@mui/x-data-grid';

const UserTable = () => {
    const [users, setUsers] = useState([])
    useEffect(() => {
        UserService.getAll(setUsers)
    }, [])

    const navigate = useNavigate()

    
            // valueGetter: (params) => {return `${params.row.banned || ''} ${params.row.id || ''}`},

    const columns = [
        { field: 'firstName', headerName: 'First Name', width: 150 },
        { field: 'lastName', headerName: 'Last Name', width: 100 },
        { field: 'role', headerName: 'Role', width: 200 },
        { field: 'email', headerName: 'Email', width: 150 },
        { field: 'banned', headerName: 'Banned', width: 150 },
        {
            field: 'edit_id',
            headerName: 'Edit',
            renderCell: (params) => (
                <Button
                  variant="outlined"
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
            renderCell: (params) => (
                <Button
                  variant="outlined"
                  size="small"
                  color="warning"
                  style={{ marginLeft: 16 }}
                  tabIndex={params.hasFocus ? 0 : -1}
                  onClick={(e) => UserService.ban(params.value)}
                >
                  Ban
                </Button>
            ),
          },
          {
            field: 'delete_id',
            headerName: 'Delete',
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
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid rows={users} columns={columns} 
          components={{ Toolbar: GridToolbar }} 
          rowsPerPageOptions={[10, 15, 25, 50, 100]} 
          loading={users.length === 0}
          sx={{
            boxShadow: 2,
            border: 2,
            '& .MuiDataGrid-row:hover': {
            backgroundColor: 'secondary.light',
          },}}
          />
        </div>
        )
}

export default UserTable
