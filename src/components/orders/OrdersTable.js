import React from "react";
import { useEffect, useState } from 'react';

import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';
import Placeholder from 'react-bootstrap/Placeholder';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';

//Funcionalidad para mostrar dialog
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});




const OrdersTable = () => {
    const [datosApi, setDatosApi] = useState(null)
    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState(null)

    const handleClickOpen = (order) => {
        setOrder(order);
        setOpen(true);
    };
    const [open, setOpen] = React.useState(false);


    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        const URL = "https://eshop-deve.herokuapp.com/api/v2/orders";
        const token = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJwUGFINU55VXRxTUkzMDZtajdZVHdHV3JIZE81cWxmaCIsImlhdCI6MTYyMDY2Mjk4NjIwM30.lhfzSXW9_TC67SdDKyDbMOYiYsKuSk6bG6XDE1wz2OL4Tq0Og9NbLMhb0LUtmrgzfWiTrqAFfnPldd8QzWvgVQ"


        fetch(URL, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).
            then(response => response.json()).
            then(data => {
                console.log(data.orders);
                setDatosApi(data.orders);
                setLoading(false);
            }).
            catch(err => {
                console.error(err);

            });

    }, [])

    return (
        <>

           {order ? ( <div>
                {/* <Button variant="outlined" onClick={handleClickOpen}>
            Open full-screen dialog
          </Button> */}
                <Dialog
                    fullScreen
                    open={open}
                    
                    onClose={handleClose}
                    TransitionComponent={Transition}
                >
                    <AppBar sx={{ position: 'relative' }}>
                        <Toolbar>
                            <IconButton
                                edge="start"
                                color="inherit"
                                onClick={handleClose}
                                aria-label="close"
                            >
                                <CloseIcon />
                            </IconButton>
                            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                                Details of order {order.number}
                            </Typography>
                            
                        </Toolbar>
                    </AppBar>
                    <List>
                        <ListItem >
                            order ID: {order.id}
                        </ListItem>
                        <Divider />
                        <ListItem >
                            order number: {order.number}
                        </ListItem>
                        <Divider />
                        <ListItem >
                            Billing address: {order.billingAddress.address1} 
                            <br></br>
                            City: {order.billingAddress.city} 
                            <br></br>
                            Country: {order.billingAddress.country.name} 
                        </ListItem>
                        <Divider />
                        <ListItem >
                            Customer name (Included in Billing): {order.billingAddress.firstName}  {order.billingAddress.lastName} 
                            <br></br>
                            Phone: {order.billingAddress.phone} 
                        </ListItem>
                        <Divider />
                        <ListItem >
                            Total amount
                            <br></br>

                            discount: {order.totals.discount}  
                            <br></br>
                            shipping: {order.totals.shipping}   
                            <br></br>
                            subtotal: {order.totals.subtotal}   
                            <br></br>
                            tax: {order.totals.tax}   
                            <br></br>
                            Total: {order.totals.total}   
                        </ListItem>
                    </List>
                </Dialog>
            </div>): null}


            {
                loading ?
                    (
                        // SI sigue cargando
                        <>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Cargando información de los productos</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <Placeholder as="p" animation="glow">
                                                <Placeholder xs={12} />
                                            </Placeholder>
                                        </td>


                                    </tr>

                                </tbody>
                            </Table>
                        </>
                    ) :
                    (
                        <>
                            <Alert variant="primary">
                                <Alert.Heading>Check the orders!</Alert.Heading>
                                <p>
                                    Click any order to se its details
                                </p>
                                <hr />
                                <p className="mb-0">
                                    Enjoy!
                                </p>
                            </Alert>
                            <h1>Orders Table</h1>
                            <Table bordered hover responsive size='sm'>
                                <thead>
                                    <tr>
                                        <th>Order ID</th>
                                        <th>Name</th>
                                        {/* <th>Shipping Address</th> */}
                                        <th>Total</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {
                                        datosApi.map((e, i) => (
                                            <tr onClick={()=>{
                                                handleClickOpen(e)
                                                }}>
                                                <td>{e.number}</td>
                                                <td>
                                                    <p>
                                                        {e.billingAddress.firstName} {e.billingAddress.lastName}
                                                    </p>
                                                    <p className="text-muted">
                                                        Address: {e.billingAddress.address1}
                                                    </p>
                                                </td>
                                                <td>
                                                    <td>{e.totals.total}</td>
                                                </td>
                                                <td>{e.status.status}</td>
                                                {/* <td>
                                                    {(e.quantity > 0) ? (<Button className='mx-auto d-grid' variant="success">Buy</Button>) : (null)}
                                                </td> */}
                                            </tr>
                                        )



                                        )
                                    }
                                </tbody>
                            </Table>




                            <div className='m-5'>
                                {/* <FormAddProduct></FormAddProduct> */}
                            </div>

                        </>
                    )
            }

        </>

    )
}

export default OrdersTable;