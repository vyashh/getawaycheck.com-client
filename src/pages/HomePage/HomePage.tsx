import React, { useState, useCallback, useRef, useEffect } from "react";
import { db } from "../../services/firebase";
import { IonContent, IonLoading, IonPage } from "@ionic/react";
import { GoogleMap, useLoadScript, InfoWindow } from "@react-google-maps/api";
import { mapStyles } from "../../theme/map";
import MapMarker from "../../components/map-marker/map-marker.component";
import CategoryBubble from "../../components/category_bubble/category_bubble.component";
import "./HomePage.scss";

const mapContainerStyle = {
  height: "100vh",
  width: "100vw",
};

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};

const HomePage: React.FC = () => {
  const articlesRef = db.collection("articles");
  const mapRef = useRef();
  const [center, setCenter] = useState({ lat: 52.377956, lng: 4.89707 });
  const [locations, setLocations] = useState<any>([]);
  const [filteredLocations, setFilteredLocations] = useState<any>([]);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY ?? "",
  });

  const onMapLoad = useCallback((map) => {
    // use callback when function doesn't change
    mapRef.current = map; // by doing this the map can be used anywhere in the code and not be rerendered
  }, []);

  useEffect(() => {
    articlesRef.get().then((snapshot) => {
      const items = snapshot.docs.map((doc) => doc.data());
      setLocations(items);
    });
  }, []);

  if (loadError) {
    return <IonLoading isOpen={true} />;
  }

  if (!isLoaded) {
    return <IonLoading isOpen={true} />;
  }

  return (
    <IonPage>
      <IonContent>
        <CategoryBubble category="bar" />
        <GoogleMap
          mapContainerClassName="map"
          mapContainerStyle={mapContainerStyle}
          zoom={12}
          center={center}
          options={options}
          onLoad={onMapLoad}
        >
          {locations.map((location: any) => {
            return <MapMarker key={location.id} location={location} />;
          })}
        </GoogleMap>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
