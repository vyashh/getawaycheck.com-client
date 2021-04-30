import { useEffect, useState } from "react";
import "./article-item.styles.scss";
import BarCategory from "../../assets/img/category/bar_category.svg";
import HotelCategory from "../../assets/img/category/hotel_category.svg";
import FoodCategory from "../../assets/img/category/food_category.svg";
import LinesEllipsis from "react-lines-ellipsis";
import { Heart } from "react-ionicons";

interface Props {
  data: any;
  setDrawerVisible: any;
  setDrawerData: any;
}

const ArticleItem: React.FC<Props> = ({
  data,
  setDrawerVisible,
  setDrawerData,
}) => {
  const text = data.content.replace(/<[^>]+>/g, "");
  const [thumbnail, setThumbnail] = useState<any>();

  const changeThumbnail = () => {
    switch (data.category) {
      case "drinks":
        setThumbnail(BarCategory);
        break;
      case "food":
        setThumbnail(FoodCategory);
        break;
      case "hotel":
        setThumbnail(HotelCategory);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    changeThumbnail();
  }, []);

  return (
    <div
      className="article-item"
      onClick={() => {
        setDrawerVisible(true);
        setDrawerData(data);
      }}
    >
      <div className="article-item__image">
        <img src={thumbnail} alt="category bar" />
      </div>
      <div className="article-item__title">{data.title}</div>
      {/* <div className="article-item__likes">
        <Heart color={"#ffffff"} title={"likes"} height=".8em" width=".8em" />
        <p>1</p>
      </div> */}
      <div className="article-item__subtitle">
        <LinesEllipsis text={text} maxLine="2" basedOn="words" />
      </div>
    </div>
  );
};

export default ArticleItem;
