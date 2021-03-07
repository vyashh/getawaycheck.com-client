import React, { useState, useCallback, useRef, useEffect } from "react";
import { IonContent, IonPage } from "@ionic/react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { mapStyles } from "../theme/map";
import "./Home.css";

const libraries = ["places"]; // prevent rerender

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

const options = {
  disableDefaultUI: true,
  styles: mapStyles,
};

const Home: React.FC = () => {
  const mapRef = useRef();
  const [center, setCenter] = useState({ lat: 52.377956, lng: 4.89707 });

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY ?? "",
  });

  const onMapLoad = useCallback((map) => {
    // use callback when function doesn't change
    mapRef.current = map; // by doing this the map can be used anywhere in the code and not be rerendered
  }, []);

  if (loadError) {
    return <h1>Error loading map</h1>;
  }

  if (!isLoaded) {
    return <h1>Loading maps</h1>;
  }

  return (
    <IonPage>
      <IonContent>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={12}
          center={center}
          options={options}
          onLoad={onMapLoad}
        >
          <p>edit</p>
        </GoogleMap>
      </IonContent>
    </IonPage>
  );
};

export default Home;
