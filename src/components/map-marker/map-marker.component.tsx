import { useState, useEffect } from "react";
import { Marker } from "@react-google-maps/api";
import MarkerHotelsIcon from "../../assets/img/marker_hotels.svg";
import MarkerFoodIcon from "../../assets/img/marker_food.svg";
import MarkerDrinksIcon from "../../assets/img/marker_drinks.svg";

interface Props {
  location: any;
}

const MapMarker: React.FC<Props> = ({ location }) => {
  const [marker, setMarker] = useState<string>(MarkerDrinksIcon);

  useEffect(() => {
    switch (location.category) {
      case "bar":
        setMarker(MarkerDrinksIcon);
        break;
      case "food":
        setMarker(MarkerFoodIcon);
        break;
      case "hotel":
        setMarker(MarkerHotelsIcon);
        break;
      default:
        break;
    }
  }, []);

  //   console.log(marker);
  return (
    <Marker
      icon={{
        url: marker,
        origin: new window.google.maps.Point(0, 0),
        anchor: new window.google.maps.Point(15, 15),
        scaledSize: new window.google.maps.Size(30, 30),
      }}
      key={location.id}
      position={location.latLng}
      onClick={() => console.log(location.address)}
    />
  );
};

export default MapMarker;
