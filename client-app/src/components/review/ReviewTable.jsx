import { Grid, Typography, Button, Link } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ReviewService from '../../services/ReviewService'
import DeleteReviewFormDialog from './DeleteReviewFormDialog'
import Review from './Review'
import { useNavigate } from 'react-router-dom'
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

const ReviewTable = () => {
    const [reviews, setReviews] = useState([])
    const [selected, setSelected] = useState({})
    const [open, setOpen] = useState(false)

    useEffect(() => {
        ReviewService.getAll(setReviews)
    }, [])

    const navigate = useNavigate()

    const handleDelete = (value) => {
        setSelected(reviews.filter(r => r.id === value)[0])
        setOpen(true)
    }

    const columns = [
        { field: 'user_id', headerName: 'User Id', width: 100 },
        { field: 'product_id', headerName: 'Product Id', width: 100 },
        { field: 'user', headerName: 'User', width: 100 },
        { field: 'product', headerName: 'Product', width: 300 },

        
        { field: 'timestamp', headerName: 'Postring Time', width: 150 },
        { field: 'rate', headerName: 'Rate', width: 150 },
        { field: 'comment', headerName: 'Comment', width: 400 },
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
                  onClick={(e) => handleDelete(params.value)}
                >
                  Delete
                </Button>
            ),
          },
      ];

      return (
          <Grid container spacing={2} sx={{px: 6}}>
            <Grid item xs={12}>
              <Typography variant='h3' sx={{mt: 2}}>All Reviews</Typography>
            </Grid>
            <Grid item xs={12}>
                <DataGrid rows={reviews} columns={columns} 
                  components={{ Toolbar: GridToolbar }} 
                  rowsPerPageOptions={[10, 15, 25, 50, 100]} 
                  loading={reviews.length === 0}
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
                  onSelectionModelChange={e => setSelected(reviews.filter(p => p.id === e[0])[0])}
              />
            </Grid>
            <Grid item xs={12}></Grid>
            <Grid item xs={12}>
                <Typography>{selected.product}</Typography>
                <Link href={"/product/"+selected.product_id} color='secondary'>See product page</Link>
              {selected.id ? <Review review={selected}/>
              : <></>}
            </Grid>
            <DeleteReviewFormDialog selected={selected} open={open} setOpen={setOpen} />
          </Grid>
    
      )
}

export default ReviewTable
