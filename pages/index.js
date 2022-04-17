import Head from "next/head";
import * as React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { gql, useQuery } from "@apollo/client";
import CharacterCard from "../components/CharacterCard";
import Filter from "../components/Filter";
import { addApolloState, initializeApollo } from "../lib/apolloClient";

const MainFlexColumn = styled(motion.main)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #f7f7f9;
`;

const CharactersGallery = styled(motion.main)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 16px;
`;

// 🌀 Variants
const container = {
  hidden: {
    opacity: 0,
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.07 },
  },
};

const client = {
  hidden: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.3,
    },
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
    },
  },
};

const INITIAL_DATA_QUERY = gql`
  query FetchInitialData($id: Int) {
    locations(page: 1) {
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
    episodes(page: 1) {
      info {
        count
        pages
      }
      results {
        name
        id
      }
    }
    characters(page: $id) {
      info {
        count
        pages
      }
      results {
        name
        id
        location {
          name
          id
          dimension
        }
        image
        origin {
          name
          id
        }
        episode {
          id
          episode
          air_date
          name
        }
      }
    }
  }
`;

export default function Home() {
  const [characters, setCharacters] = React.useState([]);
  const [locations, setLocations] = React.useState([]);
  const [dimensions, setDimensions] = React.useState([]);
  const [episodes, setEpisodes] = React.useState([]);

  // Set which page we're quering with graphQL
  const [queryPage, setQueryPage] = React.useState(1);

  // Search filters
  const [episodeFilter, setEpisodeFilter] = React.useState({
    label: "All",
    value: 0,
  });
  const [locationFilter, setLocationFilter] = React.useState({
    label: "All",
    value: 0,
  });
  const [dimensionFilter, setDimensionFilter] = React.useState({
    label: "All",
    value: 0,
  });

  const { data, fetchMore } = useQuery(INITIAL_DATA_QUERY, {
    variables: { id: queryPage },
  });

  React.useEffect(() => {
    fetchMore({ variables: { id: queryPage } });
  }, [fetchMore, queryPage]);

  React.useEffect(() => {
    if (!data) return;
    if (data.locations) setLocations(data.locations.results);
    // if (data.locations) setDimensions(data.locations.results);
    if (data.characters) setCharacters(data.characters.results);
    if (data.episodes) setEpisodes(data.episodes.results);
  }, [data]);

  // Locations passed to Filter
  const locationOptions = locations.map((location) => {
    return {
      label: location.name,
      value: location.id,
    };
  });

  // Dimensions passed to Filter
  const dimensionOptions = dimensions.map((dimension) => {
    return {
      label: dimension.name,
      value: dimension.id,
    };
  });

  // Episodes passed to Filter
  const episodeOptions = episodes.map((episodes) => {
    return {
      label: episodes.name,
      value: episodes.id,
    };
  });

  console.log(characters);

  const filterCharacters = () => {
    // If both filters are set to All, return all characters retrieved from API
    if (episodeFilter.label === "All" && locationFilter.label === "All") {
      return characters;
    } else if (
      // If we're **not** filtering episodes while we **do** filter location
      episodeFilter.label === "All" &&
      locationFilter.label !== "All"
    ) {
      return characters.filter(
        (ch) => ch.location.name === locationFilter.label
      );
    } else if (
      // If we **are** filtering episodes while we **dont** filter location
      episodeFilter.label !== "All" &&
      locationFilter.label === "All"
    ) {
      return characters.filter(
        (ch) => ch.episode[0].name === episodeFilter.label
      );
    } else if (
      episodeFilter.label !== "All" &&
      locationFilter.label !== "All"
    ) {
      return characters.filter(
        (ch) =>
          ch.episode[0].name === episodeFilter.label &&
          ch.location.name === locationFilter.label
      );
    }
  };

  return (
    <div>
      <Head>
        <title>Rick and Morty finder</title>
        <meta
          name="description"
          content="All you need to know about Rick and Morty characters"
        />
        <link rel="icon" href="/snowball-icon.jpg" />
      </Head>

      <MainFlexColumn>
        <h1>Welcome to the Rick and Morty database</h1>
        <Filter
          label={"episode"}
          value={episodeFilter.value}
          options={episodeOptions}
          onChange={setEpisodeFilter}
        ></Filter>
        <Filter
          label={"location"}
          value={locationFilter.value}
          options={locationOptions}
          onChange={setLocationFilter}
        ></Filter>
        {/* <Filter
          label={"dimension"}
          value={dimensionFilter}
          options={dimensionOptions}
          onChange={setDimensionFilter}
        ></Filter> */}
        <CharactersGallery
          animate={"show"}
          variants={container}
          initial="hidden"
        >
          {filterCharacters().map((char) => {
            return (
              <CharacterCard
                variants={client}
                key={char.id}
                character={char}
              ></CharacterCard>
            );
          })}
        </CharactersGallery>
      </MainFlexColumn>
    </div>
  );
}

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: INITIAL_DATA_QUERY,
    variables: { id: 1 },
  });

  return addApolloState(apolloClient, {
    props: {},
    revalidate: 1,
  });
}
