import Head from "next/head";
import Image from "next/image";
import * as React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import CharacterCard from "../components/CharacterCard";
import Filter from "../components/Filter";

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

export default function Home(results) {
  const initial = results;
  const [characters, setCharacters] = React.useState(initial.characters);
  // Filter for Dimension
  const [industriesFilter, setIndustriesFilter] = React.useState("all");

  console.log(initial);

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
        <Filter></Filter>
        <CharactersGallery
          animate={"show"}
          variants={container}
          initial="hidden"
        >
          {characters.map((char) => {
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
  const client = new ApolloClient({
    uri: "https://rickandmortyapi.com/graphql/",
    cache: new InMemoryCache(),
  });
  const { data } = await client.query({
    query: gql`
      query {
        characters(page: 1) {
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
            }
          }
        }
      }
    `,
  });

  return {
    props: {
      characters: data.characters.results,
    },
  };
}
