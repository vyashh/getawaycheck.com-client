import "./category_square.styles.scss";
import { useState } from "react";

interface Props {
  filterStatus: any;
  filter: any;
}

const activeStyle = {
  opacity: "1",
};

const deactiveStyle = {
  opacity: "0.5",
};

const CategorySquare: React.FC<Props> = ({ filter, filterStatus }) => {
  return (
    <div className="square">
      <div
        className={`square__item drinks`}
        // style={filterStatus.includes("drinks") ? activeStyle : deactiveStyle}
        onClick={() => filter("drinks")}
      >
        <span>DRINKS</span>
      </div>
      <div
        className={`square__item food `}
        // style={filterStatus.includes("food") ? activeStyle : deactiveStyle}
        onClick={() => filter("food")}
      >
        <span>FOOD</span>
      </div>
      <div
        className={`square__item hotels`}
        // style={filterStatus.includes("hotel") ? activeStyle : deactiveStyle}
        onClick={() => filter("hotel")}
      >
        <span>HOTELS</span>
      </div>
    </div>
  );
};

export default CategorySquare;
