import "./deal-item.styles.scss";
import SaveIcon from "../../assets/img/save_icon.svg";

const ArticleItem: React.FC = () => {
  const squareThumbnail = {
    backgroundImage:
      "url('https://www.frituurwereld.nl/wp-content/uploads/2020/11/Frituurwereld-Vegan-Box.jpeg')",
  };

  return (
    <div className="deal-item">
      <div className="deal-item__image" style={squareThumbnail}></div>
      <div className="deal-item__title">Vegan JunkFood Bar</div>
      <div className="deal-item__subtitle">
        <div className="deal-item__subtitle--category">Food</div>
        <div className="deal-item__subtitle--date">10 days left</div>
      </div>
      <div className="deal-item__actions">
        <div className="deal-item__actions--title">40% Off Your Order</div>
        <div className="deal-item__actions--save-btn">
          <img src={SaveIcon} alt="save" />
        </div>
      </div>
    </div>
  );
};

export default ArticleItem;
