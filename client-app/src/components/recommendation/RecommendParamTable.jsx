import { Avatar, Button, Fab, Grid, Typography } from '@mui/material'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RecommendationService from '../../services/RecommendationService'

const RecommendParamTable = () => {
    const [rparams, setRParams] = useState([])
    const [selected, setSelected] = useState({})
    useEffect(() => {
        RecommendationService.getAll(setRParams)
    }, [])

    const navigate = useNavigate()

    const columns = [
        { field: 'based_on', headerName: 'Based on parameter', width: 200  },
        { field: 'value1', headerName: 'Value 1', width: 200 },
        { field: 'value2', headerName: 'Value 2', width: 200 },

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
                  onClick={(e) => navigate('/recommendations/edit/'+params.value)}
                >
                  Edit
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
                  onClick={(e) => RecommendationService.delete(params.value)}
                >
                  Delete
                </Button>
            ),
          },
      ];

  return (
    <Grid container spacing={2} sx={{px: 6}}>
        <Grid item xs={12}>
          <Typography variant='h3' sx={{mt: 2}}>All Recommendation Parameters</Typography>
        </Grid>
        <Grid item xs={1}>
          <Fab size="small" aria-label="add new product">
              <Avatar sx={{ m: 1, bgcolor: "primary.main" }} onClick={() => navigate('/recommendations/new')}>
                <AddOutlinedIcon />
              </Avatar>
          </Fab>
        </Grid>
        <Grid item xs={12}>
            <DataGrid rows={rparams} columns={columns} 
              components={{ Toolbar: GridToolbar }} 
              rowsPerPageOptions={[10, 15, 25, 50, 100]} 
              loading={rparams.length === 0}
              autoHeight={true}
              sx={{
                boxShadow: 2,
                border: 2,
                '& .MuiDataGrid-row:hover': {
                  backgroundColor: 'secondary.light',
                  // fontFamily: "Comic Sans MS",
                },
                "& .MuiDataGrid-columnHeaders": {
                  // fontFamily: "Comic Sans MS",
                  // fontSize: '36'
                }
              }}
              onSelectionModelChange={e => setSelected(rparams.filter(p => p.id === e[0])[0])}
          />
        </Grid>
        <Grid item xs={12}></Grid>
      </Grid>
  )
}

export default RecommendParamTable
