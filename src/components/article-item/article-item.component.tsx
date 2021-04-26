import "./article-item.styles.scss";
import BarCategory from "../../assets/img/category/bar_category.svg";
import HotelCategory from "../../assets/img/category/hotel_category.svg";
import FoodCategory from "../../assets/img/category/food_category.svg";
import Ellipsis from "react-ellipsis-pjs";

const ArticleItem: React.FC = () => {
  const text = `React makes it painless to create interactive UIs
  Design simple views for each state in your application,
  and React will efficiently update and render just the right`;

  return (
    <div className="article-item">
      <div className="article-item__image">
        <img src={BarCategory} alt="category bar" />
      </div>
      <div className="article-item__title">Vegan JunkFood Bar</div>
      <div className="article-item__subtitle">
        <Ellipsis text={text} lines={3} />
      </div>
    </div>
  );
};

export default ArticleItem;
