import React, {useState, useEffect} from 'react'
import { DataGrid, GridRowsProp, GridColDef, GridToolbar } from '@mui/x-data-grid';
import ProductService from '../../services/ProductService';
import { Avatar, Button, Fab, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

const ProductTable = () => {
    const [products, setProducts] = useState([])
    const [selected, setSelected] = useState({})
    useEffect(() => {
        ProductService.getAll(setProducts)
    }, [])

    const navigate = useNavigate()

    const columns = [
        { field: 'sku', headerName: 'SKU', width: 100 },
        { field: 'name', headerName: 'Name', width: 300 },

        { field: 'producer', headerName: 'Producer', width: 150 },
        { field: 'brand', headerName: 'Brand', width: 150 },
        { field: 'serie', headerName: 'Serie', width: 100 },

        { field: 'dimensions', headerName: 'Dimensions', width: 150 },
        { field: 'box_size', headerName: 'Box size', width: 100, renderCell: (params) => (params.value + " m2/k") },
        { field: 'price', headerName: 'Price', width: 150, renderCell: (params) => (params.value.toFixed(2) + " RSD") },
        
        { field: 'p_type', headerName: 'Type', width: 100 },
        { field: 'purpose', headerName: 'Purpose', width: 100 },

        { field: 'color', headerName: 'Color', width: 100 },
        { field: 'finish', headerName: 'Finish', width: 100 },
        { field: 'material', headerName: 'Material', width: 100 },

        // { field: 'description', headerName: 'Description', width: 150 },
        {
          field: 'edit_img_id',
          headerName: 'Images',
          headerAlign: 'center',
          renderCell: (params) => (
              <Button
                variant="outlined"
                size="small"
                style={{ marginLeft: 16 }}
                tabIndex={params.hasFocus ? 0 : -1}
                name={params.value}
                onClick={(e) => navigate('/products/edit/images/'+params.value)}
              >
                <AddPhotoAlternateIcon/>
              </Button>
          ),
        },
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
                  onClick={(e) => navigate('/products/edit/'+params.value)}
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
                  onClick={(e) => ProductService.delete(params.value)}
                >
                  Delete
                </Button>
            ),
          },
      ];
  return (
    // <Container>
      <Grid container spacing={2} sx={{px: 6}}>
        <Grid item xs={12}>
          <Typography variant='h3' sx={{mt: 2}}>All Products</Typography>
        </Grid>
        <Grid item xs={1}>
          <Fab size="small" aria-label="add new product">
              <Avatar sx={{ m: 1, bgcolor: "primary.main" }} onClick={() => navigate('/products/new')}>
                <AddOutlinedIcon />
              </Avatar>
          </Fab>
        </Grid>
        <Grid item xs={12}>
            <DataGrid rows={products} columns={columns} 
              components={{ Toolbar: GridToolbar }} 
              rowsPerPageOptions={[10, 15, 25, 50, 100]} 
              loading={products.length === 0}
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
              onSelectionModelChange={e => setSelected(products.filter(p => p.id === e[0])[0])}
          />
        </Grid>
        <Grid item xs={12}></Grid>
        {/* <Grid item xs={12}>
          {selected.sku ? 
          <>
            <h1>[{selected.sku}] {selected.name}</h1>
            <p>{selected.description}</p>
          </>
          : <></>}
        </Grid> */}
      </Grid>
      
      
    // </Container>

  )
}

export default ProductTable
