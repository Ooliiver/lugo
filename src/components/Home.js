import React, {useState, useEffect} from "react";
import signOut from "../functions/cerrarSesion";
import { Container, Stack, Button, Form, Table } from "react-bootstrap";
import getAllProducts from "../functions/getAllProducts";
import eliminarProductoHome from "../functions/eliminarProductoHome";
import filtrarDatos from "../functions/filtrarDatos";

import {InputText} from 'primereact/inputtext';
import { Chart } from "primereact/chart";

//modales
import ModalAñadir from "./ModalAñadir";
import ModalEditar from "./ModalEditar";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { map } from "@firebase/util";

export function Home({ usuario }) {
  const [value1, setValue1] = useState('');
  const [productos, setProductos] = React.useState([]);
  const [isModalAñadir, setIsModalAñadir] = React.useState(false);
  const [isModalEditar, setIsModalEditar] = React.useState(false);
  const [productoEditar, setProductoEditar] = React.useState(null);

  


  async function busquedaFormHandler(e) {
    e.preventDefault();
    const busqueda = e.target.busqueda.value;
    const nvosDocus = await filtrarDatos(busqueda);
    setProductos(nvosDocus);
  }

  function actualizarEstadoProductos() {
    getAllProducts().then((productos) => {
      setProductos(productos);
    });
  }

  function añadirProductoHome() {
    setIsModalAñadir(true);
  }

  React.useEffect(() => {
    actualizarEstadoProductos();
  }, []);

  return (
    <Container fluid>
      
      <ModalAñadir
        isModalAñadir={isModalAñadir}
        setIsModalAñadir={setIsModalAñadir}
        actualizarEstadoProductos={actualizarEstadoProductos}
        usuario={usuario}
      />
      {productoEditar && (
        <ModalEditar
          isModalEditar={isModalEditar}
          setIsModalEditar={setIsModalEditar}
          actualizarEstadoProductos={actualizarEstadoProductos}
          productoEditar={productoEditar}
          setProductoEditar={setProductoEditar}
          usuario={usuario}
        />
      )}

  <div className="card" >
    <h5>Sección de productos</h5>
      <Form onSubmit={busquedaFormHandler}>
          <Form.Group controlId="busqueda" >
          <span className="p-float-label" >
                        <Form.Control type="search" />
                        <label htmlFor="inputtext"  >Buscar</label>
            
          </span>
          <Button
            onClick={() => {
              const input = document.getElementById("busqueda");
              input.value = "";
              actualizarEstadoProductos();}}>
            Recargar tabla</Button>
          </Form.Group>
    
      </Form>
      </div>
      <tbody>
      
      <div className="grid">
            
                
                    <div className="flex justify-content-between mb-3">
                        <div className="card">
         
          
              <tr>
                
              <DataTable value={productos}  >
        
              <Column field="index" header="#"/>
              <Column field="titulo" header="Nombre"/>
              <Column field="precio" header="Precio"/>
              <Column field="cantidad" header="Cantidad"/>
              <Column field="sku" header="SKU"/>
              
                </DataTable>
              </tr>
        
         </div>
        
          <div className="card">
            <div className="card">Acciones</div>
          {productos &&
            productos.map((producto, index) => (
              <tr>
                <td>
                  <Button className="card"
                    variant="dark"
                    onClick={() => {
                      setProductoEditar({ ...producto });
                      setIsModalEditar(true);
                    }}
                  >
                    Editar
                  </Button>ㅤ
                  <Button className="card" 
                    variant="danger"
                    onClick={() => {
                      eliminarProductoHome(producto, usuario).then(
                        (confirmacion) => {
                          actualizarEstadoProductos();
                        }
                      );
                    }}
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
            
            </div>
          
        </div>
      </div>
     </tbody>
        
  
  

      
      <Button onClick={añadirProductoHome}> Añadir Producto</Button>
    </Container>
  );
}


