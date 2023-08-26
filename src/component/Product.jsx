import React, { useEffect, useState } from 'react';
function Product({ onFilter, onSearch }) {
    const [selects, setSelects] = useState();
    const [input, setInput] = useState("");

    useEffect(() => {
        onFilter(selects);
    }, [selects])
    useEffect(() => {
        onSearch(input);
    }, [input])
    return (
        <div className='hero'>
            <div className='filterCat'>
                <select className='btn btn-dark me-5' value={selects} onChange={e => setSelects(e.target.value)}>
                    <option value="">All Categories</option>
                    <option value="men's clothing">Men's Clothing</option>
                    <option value="women's clothing">Womens's Clothing</option>
                    <option value="jewelery">Jewelery</option>
                </select>
            </div>
            <div className="card bg-dark text-white border-0">
                <img src="/assets/beautiful-female.jpg" className="card-img gradient-bg" alt="Background" height="750px" />
                <div className="card-img-overlay flex-column justify-content-center">
                    <div className='container-main'>
                        <h6 className="card-title display-3 fw-bolder mb-0">Eflyer</h6>
                        <nav className="navbar">
                            <button className="btn me-3 ms-5 nav-btn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <img className="menu" src="/assets/menu.png" width="50px" height="50px" color='white' />
                            </button>
                            <form className="container-fluid w-50">
                                <div className="input-group">
                                    <input value={input} onChange={e => setInput(e.target.value)} type="text" class="form-control" placeholder="Search this blog" aria-label="Username" aria-describedby="basic-addon1" />
                                </div>
                            </form>
                            <button className="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                🏳️‍🌈 English
                            </button>
                            <button className="btn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <h5 className='cart'>🛒  CART</h5>
                            </button>
                            <button className="btn me-3 login" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <h5 className='login'>🛒 LOGIN</h5>
                            </button>
                        </nav>
                    </div>
                </div>


                <div className="card-img-overlay d-flex flex-column justify-content-center">
                    <div className='container-main mb-5'>
                        <div className='header'>
                            <h5 className="card-title display-3 fw-bolder mb-0">GET START</h5>
                            <h5 className="card-title display-3 fw-bolder mb-5">YOUR FAVRIOT SHOPING</h5>
                            <button type="button" className="btn btn-dark fw-bold ml-1">  BUY NOW  </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Product