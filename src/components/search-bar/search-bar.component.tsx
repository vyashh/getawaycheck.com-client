import {
  IonButton,
  IonIcon,
  IonInput,
  IonItem,
  IonTextarea,
} from "@ionic/react";
import React, { useState, createRef } from "react";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
  ComboboxOptionText,
} from "@reach/combobox";
import "./search-bar.styles.scss";
import { matchSorter } from "match-sorter";
import usePlacesAutoComplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { SearchOutline, CloseOutline } from "react-ionicons";

interface Props {
  locations: any[];
}

const SearchBar: React.FC<Props> = ({ locations }) => {
  // const {
  //   ready,
  //   value,
  //   suggestions: { status, data },
  //   setValue,
  //   clearSuggestions,
  // } = usePlacesAutoComplete({
  //   requestOptions: {
  //     location: { lat: () => 52.377956, lng: () => 4.89707 },
  //     radius: 200 * 1000, // meters
  //   },
  // });

  const searchTerm = (term: any) => {
    return term === ""
      ? null
      : matchSorter(locations, term, {
          keys: [(location) => location.tags],
        });
  };

  const [search, setSearch] = useState("");
  const searchRef = createRef();
  const searchResults = searchTerm(search);

  const handleChange = (event: any) => setSearch(event.target.value);
  const handleClear = () => setSearch("");

  return (
    <div className="search-bar-container">
      <div className="search-bar">
        <Combobox className="search-bar__bar">
          <div className="bar">
            <div className="bar__icon--search">
              <SearchOutline
                color={"#00000"}
                title="search icon"
                height="2em"
                width="2em"
              />
            </div>
            <div className="bar__bar">
              <ComboboxInput
                value={search}
                placeholder="Search here"
                onChange={(event: any) => handleChange(event)}
              />
            </div>
            <div className="bar__icon--close">
              {search && (
                <CloseOutline
                  onClick={handleClear}
                  color={"#00000"}
                  title="search icon"
                  height="2em"
                  width="2em"
                />
              )}
            </div>
          </div>
          {searchResults && (
            <ComboboxPopover style={{ left: "0", width: "100%" }}>
              {searchResults.length > 0 ? (
                <ComboboxList>
                  {searchResults.map((location) => {
                    return location.tags.map((tag: string) => {
                      return (
                        <ComboboxOption
                          className="suggestions__item"
                          value={`🔍${tag}`}
                          onClick={() => setSearch(tag)}
                        />
                      );
                    });
                  })}
                  {/* {searchResults.map((location) => {
                  return (
                    <ComboboxOption
                      key={location.id}
                      value={`📍 ${location.address}`}
                    />
                  );
                })} */}
                </ComboboxList>
              ) : (
                <div>
                  <p
                    style={{
                      padding: 10,
                      textAlign: "center",
                      color: "black",
                    }}
                  >
                    No results 😞
                  </p>
                </div>
              )}
            </ComboboxPopover>
          )}
        </Combobox>
        {/* <IonButton className="search-button__button" color="primary">
          Search
        </IonButton> */}
      </div>
    </div>
  );
};

export default SearchBar;
