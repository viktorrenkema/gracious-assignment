// 📦 Packages
import * as React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

// 🌱 Components
import CharacterCard from "../components/CharacterCard";
import Filter from "../components/Filter";
import Link from "next/link";

// 🧰 Utils
import Head from "next/head";
import { gql, useQuery } from "@apollo/client";
import { addApolloState, initializeApollo } from "../lib/apolloClient";

// 💅🏽 Styled Components
const H1 = styled(motion.h1)`
  font-family: "DM Mono", monospace;
  font-weight: 500;
  margin: 0;
  padding: 0;
`;

const MainFlexColumn = styled(motion.main)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  background: #f7f7f9;
  padding: 2rem 4rem;
`;

const CharactersGallery = styled(motion.main)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  gap: 16px;
  margin-top: 2rem;
`;

// 🌀 Variants
const container = {
  hidden: {
    opacity: 0,
    transition: { staggerChildren: 0.25, staggerDirection: -1 },
  },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.27 },
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

  ///////////////

  // Gets *all* characters (note: 800+, not performant)
  // React.useEffect(() => {
  //   if (!data) return;
  //   if (queryPage >= Math.ceil(data.characters.info.count / 20)) return;
  //   setQueryPage((queryPage) => queryPage + 1);
  //   fetchMore({ variables: { id: queryPage } });
  //   setCharacters(characters.concat(data.characters.results));
  // }, [fetchMore, data]);

  // Old, working but only returning first 20 results
  React.useEffect(() => {
    if (!data) return;
    if (data.characters) setCharacters(data.characters.results);
  }, [data]);

  ///////////

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
      return characters.filter((element) =>
        element.episode.some((episode) => episode.name === episodeFilter.label)
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
        <H1>Rick and Morty database</H1>
        <Filter
          filterType={"episode"}
          label={"episode"}
          value={episodeFilter.value}
          onChange={setEpisodeFilter}
        ></Filter>
        <Filter
          filterType={"location"}
          label={"location"}
          value={locationFilter.value}
          onChange={setLocationFilter}
        ></Filter>
        <CharactersGallery
          animate={"show"}
          variants={container}
          initial="hidden"
        >
          {filterCharacters().map((char) => {
            return (
              <Link key={char.id} href={`/character/${char.id}`} passHref>
                <a>
                  <CharacterCard
                    variants={client}
                    key={char.id}
                    character={char}
                  ></CharacterCard>
                </a>
              </Link>
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
