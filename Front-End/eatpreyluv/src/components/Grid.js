import React from "react";
import Item from "./Item.js";
import "./Grid.css";

const Grid = ({ items }) => {
  return (
    <div className="grid-container">
      <div className="grid">
        {items.map((item) =>
          item.stock === 0 ? (
            <p className="out-of-stock">{item.name} out of stock</p>
          ) : (
            <div className="item" key={item.id}>
              <Item item={item} />
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Grid;
