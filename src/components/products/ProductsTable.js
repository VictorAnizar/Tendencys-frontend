import React from "react";

// React bootstrap components
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';
import Placeholder from 'react-bootstrap/Placeholder';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';

//Own components
import FormAddProduct from './form/FormAddProduct'

const ProductsTable = () => {

    const [datosApi, setDatosApi] = useState(null)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const URL = "https://eshop-deve.herokuapp.com/api/v2/products";
        const token = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJwUGFINU55VXRxTUkzMDZtajdZVHdHV3JIZE81cWxmaCIsImlhdCI6MTYyMDY2Mjk4NjIwM30.lhfzSXW9_TC67SdDKyDbMOYiYsKuSk6bG6XDE1wz2OL4Tq0Og9NbLMhb0LUtmrgzfWiTrqAFfnPldd8QzWvgVQ"


        fetch(URL, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).
            then(response => response.json()).
            then(data => {
                console.log(data.products);
                setDatosApi(data.products);
                setLoading(false);
            }).
            catch(err => {
                console.error(err);

            });

    }, [])

    return (
        <>

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
                                <Alert.Heading>Add Products to your inventory!</Alert.Heading>
                                <p>
                                    Fill the form and upload a new product to the inventory
                                </p>
                                <hr />
                                <p className="mb-0">
                                    Complete the form
                                </p>
                            </Alert>
                            <h1>Products Table</h1>
                            <Table striped bordered hover responsive size='sm'>
                                <thead>
                                    <tr>
                                        <th>SKU</th>
                                        <th>Name</th>
                                        <th>Image</th>
                                        <th>Price</th>
                                        <th>Controls</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {
                                        datosApi.map((e, i) => (
                                            <tr>
                                                <td>{e.sku}</td>
                                                <td>
                                                    <p>
                                                        {e.name}
                                                    </p>
                                                    <p className="text-muted">
                                                        Available: {e.quantity}
                                                    </p>
                                                </td>
                                                <td>
                                                    <img
                                                        className="img-thumbnail rounded mx-auto d-grid imagenProd"
                                                        style={{ "width": "100px !important;" }}
                                                        src={e.imageUrl}
                                                        alt="Image Product"
                                                    />
                                                </td>
                                                <td>{e.price}</td>
                                                <td>
                                                    {(e.quantity > 0) ? (<Button className='mx-auto d-grid' variant="success">Buy</Button>) : (null)}
                                                </td>
                                            </tr>
                                        )



                                        )
                                    }
                                </tbody>
                            </Table>




                            <div className='m-5'>
                                <FormAddProduct></FormAddProduct>
                            </div>

                        </>
                    )
            }

        </>
    )
}

export default ProductsTable;