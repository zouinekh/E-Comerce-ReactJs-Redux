import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { NavLink } from "react-router-dom";

const Products = () => {
  const [data, setdata] = useState([]);
  const [filtre, setfiltre] = useState(data);
  const [loading, setLoading] = useState(false);
  let componentMounted = true;
  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const response = await fetch(`http://fakestoreapi.com/products`);
      if (componentMounted) {
        setdata(await response.clone().json());
        setfiltre(await response.json());
        setLoading(false);
        console.log(filtre);
      }

      return () => {
        componentMounted = false;
      };
    };
    getProducts();
  }, []);
  const Loading = () => {
    return (
      <>
        <div className="cold-md-3">
          <Skeleton height={350} />
        </div>
        <div className="cold-md-3">
          <Skeleton height={350} />
        </div>
        <div className="cold-md-3">
          <Skeleton height={350} />
        </div>
        <div className="cold-md-3">
          <Skeleton height={350} />
        </div>
      </>
    );
  };
  const filterProduct = (cat) => {
    const updatedList = data.filter((x) => x.category === cat); //filter fih el data el kol so filtre(x)lorsque=>x.category(eli heya mawjouda fil data mta3na) === cat eli t3adet bel parametre
    setfiltre(updatedList);
  };
  const ShowProduct = () => {
    return (
      <>
        <div className="buttons d-flex justify-content-center mb-5 pd-5">
          <button
            className="btn btn-outline-dark me-2"
            onClick={() => setfiltre(data)}
          >
            All
          </button>
          <button
            className="btn btn-outline-dark me-2"
            onClick={() => filterProduct("men's clothing")}
          >
            Men's Clothing
          </button>
          <button
            className="btn btn-outline-dark me-2"
            onClick={() => filterProduct("women's clothing")}
          >
            Women's Clothing
          </button>
          <button
            className="btn btn-outline-dark me-2"
            onClick={() => filterProduct("jewelery")}
          >
            Jewelery{" "}
          </button>
          <button
            className="btn btn-outline-dark me-2"
            onClick={() => filterProduct("electronics")}
          >
            Electronic{" "}
          </button>
        </div>
        {filtre.map((products) => {
          return (
            <div className="col-md-3 mb-4" key={products.id}>
              <div className="card h-100 text-center p-4">
                <img
                  src={products.image}
                  className="card-img-top"
                  alt={products.title}
                  height="250px"
                />
                <div className="card-body">
                  <h5 className="card-title mb-0 ">
                    {products.title.substring(0, 12)}
                  </h5>
                  <p className="card-text lead fw-bold"> $ {products.price}</p>
                  <NavLink
                    to={`/Products/${products.id}`}
                    className="btn btn-outline-dark"
                  >
                    Buy Now !!
                  </NavLink>
                </div>
              </div>
            </div>
          );
        })}
      </>
    );
  };
  return (
    <div>
      <div className="container my-5 py-5">
        <div className="row">
          <div className="col-12 mb-5">
            <h1 className="display-6 fw-bolder text-center">Latest Product</h1>
            <hr />
          </div>
        </div>
        <div className="row justify-content-center">
          {loading ? <Loading /> : <ShowProduct />}
        </div>
      </div>
    </div>
  );
};
export default Products;
