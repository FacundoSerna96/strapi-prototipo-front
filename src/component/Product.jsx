import React, {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import {addCart} from '../redux/action';
import Skeleton from 'react-loading-skeleton';
import { useParams } from 'react-router';
import { NavLink } from "react-router-dom";

export default function Product() {
    const {id} = useParams();
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const addProduct = (product) => {
      dispatch(addCart(product));
    }

    useEffect(() => {
        const getProduct = async () => {
            setLoading(true);
            const response = await fetch(`http://localhost:1337/api/productos/${id}?populate=*`)
            let respuesta = await response.json();
            setProduct(respuesta.data);
            setLoading(false);
            console.log('respuesta',respuesta);
        }
        getProduct();
    }, []);

  const Loading = () => {
    return(
      <>
        <div className='col-md-6'>
           <Skeleton height={400}/>
        </div>
        <div className='col-md-6' style={{lineHeight:2}}>
           <Skeleton height={50} width={300}/>
           <Skeleton height={75}/>
           <Skeleton height={25} width={150}/>
           <Skeleton height={50}/>
           <Skeleton height={150}/>
           <Skeleton height={50} width={100}/>
           <Skeleton height={50} width={100} style={{marginLeft:6}}/>
        </div>
      </>
    )
  }

  const ShowProduct = () => {
    return(
      <>
        <div className='col-md-6'>
          <br></br>
          {<img src={product.attributes ? `http://localhost:1337${product.attributes.imagen.data[0].attributes.url}` : ''} height="400px" width="400px"></img>}
        </div>
        <div className='col-md-6'>
            <p className='lead text-black-50'>
              {product.attributes ? product.attributes.nombre : ''}
            </p>
            <p className='lead my-1'>
              {product.attributes ? product.attributes.categorias.data[0].attributes.Nombre : ''} <i className='fa fa-star'></i>
            </p>
            <h1 className='display-5'>{''}</h1>
            <h3 className='display-4 my-4'>
              $ {product.attributes ? product.attributes.precio : ''}
            </h3>
            <br></br>
            <h5>Descripción</h5>
            <p className='lead'>{product.attributes ? product.attributes.descripcion : ''}</p><br></br>
            <div class="d-grid gap-2">
            <button class="btn btn-dark" onClick={()=>addProduct('')}>Agregar al carrito</button>
            <NavLink to="/cart" class="btn btn-dark fw-bold" type="button">Ver</NavLink>
          </div>
          
          
        </div>
      </>
    )
  }

  return (
    <div>
      <div className='container py-5'>
        <div className='row py-4'>
          {loading ? <Loading /> : <ShowProduct/>}
        </div>
      </div>

    </div>
  )
}
