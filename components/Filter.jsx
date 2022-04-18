import * as React from "react";
import styled from "styled-components";
import { gql, useQuery } from "@apollo/client";


const FilterWrapper = styled.div`
  display:flex;
  padding:1rem;
  gap:1rem;
`;

const Label = styled.label`
  font-size: 18px;
  font-family: "Open Sans", "Arial";
  color: black;
  font-weight:600;
`;

const Select = styled.select`
  font-size: 18px;
  font-family: "Open Sans", "Arial";
  color: black;
  border: 0px solid white;
  -webkit-appearance: none;
  border-radius: 0px;
`;

const FILTERS_QUERY = gql`
  query FetchInitialData($locationPage: Int, $episodePage: Int) {
    locations(page: $locationPage) {
      info {
        count
        pages
      }
      results {
        name
        id
        dimension
      }
    }
    episodes(page: $episodePage) {
      info {
        count
        pages
      }
      results {
        name
        id
      }
    }
  }
`;

export default function Filter({filterType, value, onChange, label }) {
  // Store all locations to shown in filter select elements
  const [locations, setLocations] = React.useState([]);
  const [episodes, setEpisodes] = React.useState([]);
  const [dimensions, setDimensions] = React.useState([]);

  // Track the number of pages we need to get all data
  const [locPage, setLocPage] = React.useState(1);
  const [epPage, setEpPage] = React.useState(1);
  const [dimPage, setDimPage] = React.useState(1);


  const { data, fetchMore } = useQuery(FILTERS_QUERY, {
    variables: { locationPage: locPage, episodePage: epPage },
  });

  // Ensure we get all **locations** && **episodes**
  React.useEffect(() => {
    if (!data) return;

    if (filterType === "location") {
      if (locPage >= Math.ceil(data.locations.info.count / 20) + 1) return;
        setLocPage((locPage) => locPage + 1);
        fetchMore({ variables: { locationPage: locPage, episodePage: epPage } });
        setLocations(locations.concat(data.locations.results));
    }

    if (filterType === "episode") {
      if (epPage >= Math.ceil(data.episodes.info.count / 20) + 1) return;
        setEpPage((epPage) => epPage + 1);
        fetchMore({ variables: { locationPage: locPage, episodePage: epPage } });
        setEpisodes(episodes.concat(data.episodes.results));
    }
  }, [fetchMore, data]);



  function handleChange(event) {
    const value = event.target.value

    if (event.target.value == 0) {
      onChange({value: value, label: "All"})
    } else 
   onChange({value: value, label: event.target[event.target.value].innerHTML})
}

  // Locations elements passed to Filter
  const locationOptions = locations.map((location) => {
    return {
      label: location.name,
      value: location.id,
    };
  });

  // Episodes elements passed to Filter
  const episodeOptions = episodes.map((episodes) => {
    return {
      label: episodes.name,
      value: episodes.id,
    };
  });

    return (
      <FilterWrapper>
        <Label>{label}</Label>
        <Select
          id={label}
          name={label}
          onChange={handleChange}
          value={value}
      >
      <option value={0}>All</option>
      {filterType === "location" && locationOptions.map(option => {
                return (
                    <option key={option.value} value={option.value}>{option.label}</option>
                )
            })} 
      {filterType === "episode" && episodeOptions.map(option => {
                return (
                    <option key={option.value} value={option.value}>{option.label}</option>
                )
            })} 
            
    </Select>
    </FilterWrapper>
    )
}