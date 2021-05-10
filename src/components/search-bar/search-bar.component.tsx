import {
  IonButton,
  IonIcon,
  IonInput,
  IonItem,
  IonTextarea,
} from "@ionic/react";
import React, { useState, createRef, useEffect } from "react";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
  ComboboxOptionText,
} from "@reach/combobox";
import "./search-bar.new.styles.scss";
import { matchSorter } from "match-sorter";
import usePlacesAutoComplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { SearchOutline, CloseOutline, Close } from "react-ionicons";

interface Props {
  locations: any[];
  keywords: any[];
  searchLocations: (searchTag: string) => void;
  clearSearchLocations: any;
}

const SearchBar: React.FC<Props> = ({
  locations,
  keywords,
  searchLocations,
  clearSearchLocations,
}) => {
  const visible = {
    opacity: 1,
  };

  const invisible = {
    opacity: 0,
  };

  const searchTerm = (term: any) => {
    return term === ""
      ? null
      : matchSorter(keywords, term, {
          keys: [(tag) => tag.text],
        });
  };

  const [search, setSearch] = useState("");
  const searchRef = createRef();
  const searchResults = searchTerm(search);
  const clearStyling = search.length > 0 ? visible : invisible;
  const handleChange = (event: any) => setSearch(event.target.value);
  const handleClear = () => setSearch("");
  const [tags, setTags] = useState<any>([]);

  useEffect(() => {
    keywords.map((tag) => {
      setTags(tags.push(tag.text));
    });
  }, []);

  return (
    <div className="search-bar">
      <SearchOutline color={"#ffffff"} height="1.5em" width="1.5em" />{" "}
      <div>
        <Combobox>
          <ComboboxInput
            value={search}
            placeholder="Search here"
            className="search-bar__bar"
            onChange={(event: any) => handleChange(event)}
          />
          <ComboboxPopover className="search-bar__suggestions">
            <ComboboxList style={{ width: "100vw" }}>
              {searchResults && searchResults!.length > 0 ? (
                <ComboboxList>
                  {searchResults!.slice(0, 3).map((result, index) => (
                    <ComboboxOption
                      key={index}
                      value={`${result.text}`}
                      onClick={() => searchLocations(result.text)}
                    />
                  ))}
                </ComboboxList>
              ) : (
                <span style={{ display: "block", margin: 8 }}>
                  No results found
                </span>
              )}
            </ComboboxList>
          </ComboboxPopover>
        </Combobox>
      </div>
      <div
        className="search-bar__clear"
        style={clearStyling}
        onClick={clearSearchLocations}
      >
        <CloseOutline
          color={"#ffffff"}
          height="1.5em"
          width="1.5em"
          onClick={handleClear}
        />
      </div>
    </div>
  );
};

export default SearchBar;
