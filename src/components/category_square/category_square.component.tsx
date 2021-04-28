import "./category_square.styles.scss";
import DrinkFilter from "../../assets/img/filters/drinks_filter.svg";
import FoodFilter from "../../assets/img/filters/food_filter.svg";
import HotelFilter from "../../assets/img/filters/hotel_filter.svg";

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
        className={``}
        // style={filterStatus.includes("drinks") ? activeStyle : deactiveStyle}
        onClick={() => filter("drinks")}
      >
        <img src={DrinkFilter} alt="drinks category" />
      </div>
      <div
        className={` `}
        // style={filterStatus.includes("food") ? activeStyle : deactiveStyle}
        onClick={() => filter("food")}
      >
        <img src={FoodFilter} alt="food category" />
      </div>
      <div
        className={``}
        // style={filterStatus.includes("hotel") ? activeStyle : deactiveStyle}
        onClick={() => filter("hotel")}
      >
        <img src={HotelFilter} alt="hotel category" />
      </div>
    </div>
  );
};

export default CategorySquare;
