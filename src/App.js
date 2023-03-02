import logo from './logo.svg';
import './App.css';


import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar'
import { useEffect, useState } from 'react';
import OrdersTable from './components/orders/OrdersTable';
import ProductsTable from './components/products/ProductsTable';

function App() {


  

  return (<>
    <Navbar bg="dark">
      <Container>
        <Navbar.Brand href="#home" style={{ "color": "white" }}>
          Prueba Frontend
        </Navbar.Brand>
      </Container>
    </Navbar>

    <OrdersTable></OrdersTable>
    <hr></hr>
    <ProductsTable></ProductsTable>


    



  </>
  );
}

export default App;
