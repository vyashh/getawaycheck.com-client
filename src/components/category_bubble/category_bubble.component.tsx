import "./category_bubble.styles.scss";
import dealsIcon from "../../assets/img/deals_icon.svg";

interface Props {
  category: string;
}

const CategoryBubble: React.FC<Props> = ({ category }) => {
  return (
    <div className="bubble">
      <div className="bubble__item drinks">
        <span>DRINKS</span>
      </div>
      <div className="bubble__item food">
        <span>FOOD</span>
      </div>
      <div className="bubble__item hotels">
        <span>HOTELS</span>
      </div>
      <div className="bubble__item deals">
        <img src={dealsIcon} alt="deals" />
      </div>
    </div>
  );
};

export default CategoryBubble;
