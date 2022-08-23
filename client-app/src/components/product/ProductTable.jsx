import React, {useState, useEffect} from 'react'
import { DataGrid, GridRowsProp, GridColDef, GridToolbar } from '@mui/x-data-grid';
import ProductService from '../../services/ProductService';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom'



const ProductTable = () => {
    const [products, setProducts] = useState([])
    useEffect(() => {
        ProductService.getAll(setProducts)
    }, [])

    const navigate = useNavigate()

    const columns = [
        { field: 'sku', headerName: 'SKU', width: 150 },
        { field: 'price', headerName: 'Price [RSD]', width: 100 },
        { field: 'name', headerName: 'Name', width: 200 },
        { field: 'description', headerName: 'Description', width: 150 },
        { field: 'producer', headerName: 'Producer', width: 150 },
        { field: 'brand', headerName: 'Brand', width: 150 },
        { field: 'dimensions', headerName: 'Dimensions', width: 150 },
        { field: 'type', headerName: 'Type', width: 150 },
        { field: 'finish', headerName: 'Finish', width: 100 },
        { field: 'purpose', headerName: 'Purpose', width: 100 },
        { field: 'color', headerName: 'Color', width: 100 },
        { field: 'serie', headerName: 'Serie', width: 100 },
        { field: 'boxSize', headerName: 'Box size', width: 100 },
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
                  onClick={(e) => navigate('/products/edit/'+params.value)}
                >
                  Edit
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
                  onClick={(e) => ProductService.delete(params.value)}
                >
                  Delete
                </Button>
            ),
          },
      ];
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={products} columns={columns} 
      components={{ Toolbar: GridToolbar }} 
      rowsPerPageOptions={[10, 15, 25, 50, 100]} 
      loading={products.length === 0}
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

export default ProductTable
