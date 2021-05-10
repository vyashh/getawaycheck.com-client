import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  useContext,
} from "react";
import { db } from "../../services/firebase";
import { useAuth } from "../../providers/AuthProvider";
import {
  IonContent,
  IonLoading,
  IonPage,
  IonMenuButton,
  IonHeader,
  IonButtons,
  IonToolbar,
  IonMenuToggle,
  IonTitle,
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
  const { articleData, userData } = useContext(Context);
  const articlesRef = db.collection("articles");
  const usersRef = db.collection("users");
  const keywordsRef = db.collection("keywords").doc("keywords");
  const { currentUser } = useAuth();
  const [currentUserData, setCurrentUserData] = userData;
  const mapRef = useRef();
  const [center, setCenter] = useState({ lat: 52.377956, lng: 4.89707 });
  const [locations, setLocations] = useState<any>([]);
  const [searchedLocations, setSearchedLocations] = useState<any>([]);
  const [articles, setArticles] = articleData;
  const [filteredLocations, setFilteredLocations] = useState(locations);
  const [filter, setFilter]: any[] = useState(["drinks", "hotel", "food"]);
  const [loading, setLoading] = useState(false);
  const [keywords, setKeywords] = useState<any>([]);
  const [render, setRender] = useState(true);

  const [drawerVisble, setDrawerVisible] = useState(false);
  const [drawerData, setDrawerData] = useState<any>([null]);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY ?? "",
  });

  const onMapLoad = useCallback((map) => {
    // use callback when function doesn't change
    mapRef.current = map; // by doing this the map can be used anywhere in the code and not be rerendered
  }, []);

  const getLocations = async () => {
    await articlesRef.get().then((snapshot) => {
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

  const searchLocations = (searchTag) => {
    locations.map((location) => {
      location.tags.map((locationTag) => {
        if (searchTag === locationTag.text) {
          const result = searchedLocations;
          if (!result.includes(location)) {
            result.push(location);
            setSearchedLocations(result);
            setRender(!render);
          }
        }
      });
    });
    setSearchedLocations(searchedLocations);
    console.log(searchedLocations);
  };

  const clearSearchLocations = () => {
    setSearchedLocations([]);
  };

  const getTags = async () => {
    keywordsRef.get().then((doc) => setKeywords(doc.data()?.suggestions));
  };

  useEffect(() => {
    getLocations();
    getTags();
  }, []);

  if (loadError) {
    return <IonLoading isOpen={true} />;
  }

  if (!isLoaded) {
    return <IonLoading isOpen={true} />;
  }

  if (loading) {
    return <IonLoading isOpen={true} />;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="end">
            <IonMenuButton style={{ color: "white" }}></IonMenuButton>
          </IonButtons>
          <IonTitle className="homepage-title">GETAWAYCHECK</IonTitle>
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
        />
        <SearchBar
          locations={locations}
          keywords={keywords}
          searchLocations={searchLocations}
          clearSearchLocations={clearSearchLocations}
        />
        <GoogleMap
          mapContainerClassName="map"
          mapContainerStyle={mapContainerStyle}
          zoom={12}
          center={center}
          options={options}
          onLoad={onMapLoad}
        >
          {searchedLocations.length > 0
            ? searchedLocations.map((location: any) => {
                if (location.isPublic) {
                  return (
                    <MapMarker
                      key={location.id}
                      location={location}
                      setDrawerVisible={setDrawerVisible}
                      setDrawerData={setDrawerData}
                    />
                  );
                }
              })
            : filteredLocations.map((location: any) => {
                if (location.isPublic) {
                  return (
                    <MapMarker
                      key={location.id}
                      location={location}
                      setDrawerVisible={setDrawerVisible}
                      setDrawerData={setDrawerData}
                    />
                  );
                }
              })}
        </GoogleMap>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
