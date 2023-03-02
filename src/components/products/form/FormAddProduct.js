import React, { useState } from "react";

import { useFormik } from "formik";
import * as Yup from 'yup';


import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import { Alert } from "react-bootstrap";

// const Alert = React.forwardRef(function Alert(props, ref) {
//     return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
// });
const FormAddProduct = () => {

    const [mensaje, setMensaje] = useState(null);

    const formik = useFormik({
        // Es como el state
        initialValues: {
            sku: '',
            name: '',
            quantity: '',
            price: ''
        },
        validationSchema: Yup.object({
            sku: Yup.string().required('SKU required'),
            name: Yup.string().required('Name required'),
            quantity: Yup.number().required('Quantity required and must be numbers'),
            price: Yup.number().required('Price required and must be numbers')
        }),
        // Le agrega el evento al formulario como tal
        onSubmit: async valores => {
            console.log("Sending...");
            console.log(valores);
            setMensaje("Product added");
        }
    });
    const mostrarMensaje = () => {
        return (
            // <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
            //     <p>{mensaje}</p>
            // </div>

            // <Alert severity="warning">{mensaje}</Alert>
            <Stack spacing={2} sx={{ width: '100%' }}>
                <Snackbar open={true} autoHideDuration={6000} >
                    <Alert variant="danger" severity="warning" sx={{ width: '100%' }}>
                        {mensaje}</Alert>
                </Snackbar>
            </Stack >

        )
    }

    return (
        <>
            <h1 className="text-center text-2xl font-light">Add Product</h1>
            <form
                className=" rounded shadow-md border-5 m-5 text-center"
                onSubmit={formik.handleSubmit}
            >
                <div className="mb-4  text-center">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="sku">
                        sku
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-50"
                        id="sku"
                        type="text"
                        placeholder="Add SKU"
                        value={formik.values.sku}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                </div>
                {formik.touched.sku && formik.errors.sku ? (

                    <Alert variant="danger">{formik.errors.sku}</Alert>

                ) : null}
                <div className="mb-4  text-center">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        name
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-50"
                        id="name"
                        type="text"
                        placeholder="Add name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                </div>
                {formik.touched.name && formik.errors.name ? (

                    <Alert variant="danger">{formik.errors.name}</Alert>

                ) : null}



                <div className="mb-4  text-center">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="quantity">
                        quantity
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-50"
                        id="quantity"
                        type="number"
                        placeholder="Add quantity"
                        value={formik.values.quantity}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                </div>
                {formik.touched.quantity && formik.errors.quantity ? (

                    <Alert variant="danger">{formik.errors.quantity}</Alert>

                ) : null}


                <div className="mb-4  text-center">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                        price
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-50"
                        id="price"
                        type="number"
                        placeholder="Add price"
                        value={formik.values.price}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                </div>
                {formik.touched.price && formik.errors.price ? (

                    <Alert variant="danger">{formik.errors.price}</Alert>

                ) : null}

                <input
                    type="submit"
                    className="bg-gray-800 w-full mt-5 p-2 uppercase hover:bg-gray-900 rounded "
                    value="Add Product"
                />
            </form>

            {/* <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form> */}
        </>
    )
}

export default FormAddProduct;