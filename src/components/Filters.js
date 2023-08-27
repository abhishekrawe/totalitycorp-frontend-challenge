import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { CartState } from "../context/Context";
import Rating from "./Rating";

const Filters = () => {
  const {
    productDispatch,
    productState: { byStock, byFastDelivery, sort, byRating },
  } = CartState();

   const deliveryOptions = [
     { label: "All", value: "all" },
     { label: "Fast Delivery Only", value: "fastDelivery" },
     { label: "4 days delivery", value: "fourDaysDelivery" },
   ];


  // make state for rating
  const [priceRange, setPriceRange] = useState([0, 100]);

  return (
    <div className="filters">
      <span className="title">Filter Products</span>
      <span>
        <label style={{ paddingRight: 10 }}>Category :</label>
        <select
          onChange={(e) => {
            const selectedOption = e.target.value;
            let deliveryType = null;
            if (selectedOption === "fastDelivery") {
              deliveryType = true;
            } else if (selectedOption === "fourDaysDelivery") {
              deliveryType = false;
            }
            productDispatch({
              type: "FILTER_BY_DELIVERY",
              payload: deliveryType,
            });
          }}
          value={
            byFastDelivery === true
              ? "fastDelivery"
              : byFastDelivery === false
              ? "fourDaysDelivery"
              : "all"
          }>
          {deliveryOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </span>
      <span>
        <Form.Check
          inline
          label="Ascending"
          name="group1"
          type="radio"
          id={`inline-1`}
          onChange={() =>
            productDispatch({
              type: "SORT_BY_PRICE",
              payload: "lowToHigh",
            })
          }
          checked={sort === "lowToHigh" ? true : false}
        />
      </span>
      <span>
        <Form.Check
          inline
          label="Descending"
          name="group1"
          type="radio"
          id={`inline-2`}
          onChange={() =>
            productDispatch({
              type: "SORT_BY_PRICE",
              payload: "highToLow",
            })
          }
          checked={sort === "highToLow" ? true : false}
        />
      </span>
      {/* <span>
        <Form.Check
          inline
          label="Include Out of Stock"
          name="group1"
          type="checkbox"
          id={`inline-3`}
          onChange={() =>
            productDispatch({
              type: "FILTER_BY_STOCK",
            })
          }
          checked={byStock}
        />
      </span> */}
      <span>
        <label style={{ paddingRight: 10 }}>Rating: </label>
        <Rating
          rating={byRating}
          onClick={(i) =>
            productDispatch({
              type: "FILTER_BY_RATING",
              payload: i + 1,
            })
          }
          style={{ cursor: "pointer" }}
        />
      </span>
      <span>
        <label style={{ paddingRight: 10 }}>Price Range:</label>
        <input
          type="range"
          min={0}
          max={1000} // Set the maximum value according to your product prices
          step={1}
          value={priceRange[1]} // Use the upper bound of the range
          onChange={(e) =>
            setPriceRange([priceRange[0], parseFloat(e.target.value)])
          }
        />
        <span>{priceRange[1]}</span>
      </span>
      <Button
        variant="light"
        onClick={() =>
          productDispatch({
            type: "CLEAR_FILTERS",
          })
        }>
        Clear Filters
      </Button>
    </div>
  );
};

export default Filters;
