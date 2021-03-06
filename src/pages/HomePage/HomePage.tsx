import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  useContext,
} from "react";
import { db } from "../../services/firebase";
import {
  IonContent,
  IonLoading,
  IonPage,
  IonMenuButton,
  IonHeader,
  IonButtons,
  IonToolbar,
  IonMenuToggle,
} from "@ionic/react";

import "@reach/combobox/styles.css";
import { GoogleMap, useLoadScript, InfoWindow } from "@react-google-maps/api";
import { mapStyles } from "../../theme/map";
import MapMarker from "../../components/map-marker/map-marker.component";
import CurrentLocation from "../../components/current-location/current-location.component";
import CategoryBubble from "../../components/category_bubble/category_bubble.component";
import DetailsLocation from "../../components/details-location/details-location.component";
import SearchBar from "../../components/search-bar/search-bar.component";
import { Context } from "../../services/store";
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
  const { articleData } = useContext(Context);
  const articlesRef = db.collection("articles");
  const mapRef = useRef();
  const [center, setCenter] = useState({ lat: 52.377956, lng: 4.89707 });
  const [locations, setLocations] = useState<any>([]);
  const [articles, setArticles] = articleData;
  const [filteredLocations, setFilteredLocations] = useState(locations);
  const [filter, setFilter]: any[] = useState(["drinks", "hotel", "food"]);

  const [drawerVisble, setDrawerVisible] = useState(false);
  const [drawerData, setDrawerData] = useState<any>([null]);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY ?? "",
  });

  const onMapLoad = useCallback((map) => {
    // use callback when function doesn't change
    mapRef.current = map; // by doing this the map can be used anywhere in the code and not be rerendered
  }, []);

  const getLocations = () => {
    articlesRef.get().then((snapshot) => {
      const items = snapshot.docs.map((doc) => doc.data());
      setLocations(items);
      setArticles(items);
      setFilteredLocations(items);
    });
  };

  const applyFilter = () => {
    setFilteredLocations(
      locations.filter((location: any) => filter.includes(location.category))
    );
  };

  const filterLocations = (category: string) => {
    // search index of category. if exists remove else add to array. the filter array is later used in applyFilter() to filter.
    const index = filter.indexOf(category);
    const locations = filter;

    if (index >= 0) {
      locations.splice(index, 1);
    } else {
      locations.push(category);
    }

    setFilter(locations);
    applyFilter();
  };

  useEffect(() => {
    getLocations();

    // getLocations();
  }, []);

  if (loadError) {
    return <IonLoading isOpen={true} />;
  }

  if (!isLoaded) {
    return <IonLoading isOpen={true} />;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="end">
            <IonMenuButton style={{ color: "white" }}></IonMenuButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="homepage-content" fullscreen>
        <div className="options">
          <CategoryBubble filter={filterLocations} filterStatus={filter} />
          {/* <CurrentLocation /> */}
        </div>
        <DetailsLocation
          isVisible={drawerVisble}
          setIsVisible={setDrawerVisible}
          data={drawerData}
          getLocation={getLocations}
        />
        {/* <SearchBar locations={locations} /> */}
        <GoogleMap
          mapContainerClassName="map"
          mapContainerStyle={mapContainerStyle}
          zoom={12}
          center={center}
          options={options}
          onLoad={onMapLoad}
        >
          {filteredLocations.map((location: any) => {
            return (
              <MapMarker
                key={location.id}
                location={location}
                setDrawerVisible={setDrawerVisible}
                setDrawerData={setDrawerData}
              />
            );
          })}
        </GoogleMap>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
