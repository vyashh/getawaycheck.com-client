import React, { useState, createRef, useEffect } from "react";
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
  const suggestionsStyle = {
    width: "100%",
    left: "0",
  };

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
          <ComboboxPopover
          // style={suggestionsStyle}
          >
            {searchResults && searchResults!.length > 0 ? (
              <ComboboxList className="search-bar__suggestions">
                {searchResults!.slice(0, 3).map((result, index) => (
                  <ComboboxOption
                    key={index}
                    value={`${result.text}`}
                    onClick={() => {
                      searchLocations(result.text);
                      // handleClear();
                    }}
                  />
                ))}
              </ComboboxList>
            ) : (
              <ComboboxList className="search-bar__suggestions">
                <ComboboxOption value="No results" />
              </ComboboxList>
            )}
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
