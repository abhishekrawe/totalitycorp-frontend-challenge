import React, { useState, useEffect } from 'react'
import Product from './Product';
import Skeleton from "react-loading-skeleton";

function Home() {
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState(data);

    useEffect(() => {
        const getProducts = async () => {
            const response = await fetch("https://fakestoreapi.com/products");
            setData(await response.clone().json());
            setFilter(await response.json());
            // console.log(filter)
        }
        getProducts();
    }, []);

    const Loading = () => {
        return (
            <>
                <div className="col-md-3">
                    <Skeleton height={350} />
                </div>
                <div className="col-md-3">
                    <Skeleton height={350} />
                </div>
                <div className="col-md-3">
                    <Skeleton height={350} />
                </div>
                <div className="col-md-3">
                    <Skeleton height={350} />
                </div>
            </>
        )
    }


    const searchProduct = (val) => {
        const res = filter.filter(elem => elem.title.toLowerCase().includes(val.toLowerCase()))
        setFilter(res);
    }

    const filterProduct = (cat) => {
        if (cat === "") {
            setFilter(data)
            return
        }
        const updatedList = data.filter((x) => x.category === cat);
        setFilter(updatedList);
    }

    const ShowProducts = () => {

        return (
            <>
                {filter.map((product) => {
                    return (
                        <>
                            <div className='col-md-4 mb-4 '>
                                <div className="card card text-center p-4 shadow-lg bg-body rounded" key={product.id}>
                                    <div className="card-body w-80">
                                        <h5 class="card-title mb-0 fw-bolder">{product.title.substring(0, 20)}</h5>
                                        <p class="card-text lead fw-bold"> <span className='price'> Price </span>{product.price}</p>
                                    </div>
                                    <div className='image'>
                                        <img src={product.image} className="card-img-top" alt={product.title} height="250px" />
                                    </div>
                                    <div className='card-body'>
                                        <a href="#" className="btn btn-outline-dark">Buy Now</a>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                })}
            </>
        )
    }
    return (

        <>
            <Product onFilter={filterProduct} onSearch={searchProduct} />
            <div className='body'>
                <div className='container my-5'>
                    <div className='row'>
                        <div className='col-12 mb-5'>
                            <h1 className='display-6 fw-bolder text-center'> Man & Woman Fashion </h1>
                        </div>
                    </div>
                    <div className='row justify-content-center'>
                        {<ShowProducts />}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home
