import React from 'react';
import './Item.css';
import { Link } from 'react-router-dom';

const Item = (props) => {
  return (
    <Link
      to={
        props.isEdit ? `/admin/add-product/${props.id}` : `/product/${props.id}`
      }
    >
      <div className="item">
        <img src={props.image} className="item-image" alt="" />
        <p>{props.name}</p>

        <p className="label">{props.type}</p>

        <div className="item-prices">
          <div className="item-price-new">Rs. {props.newPrice}</div>
          <div className="item-price-old">Rs. {props.oldPrice}</div>
        </div>
      </div>
    </Link>
  );
};

export default Item;
