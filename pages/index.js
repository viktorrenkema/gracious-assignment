import Head from "next/head";
import Image from "next/image";
import * as React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import CharacterCard from "../components/characterCard";

const Title = styled(motion.h1)`
  margin: 0;
  line-height: 1.2;
  font-size: 4rem;
`;

const MainFlexColumn = styled(motion.main)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const CharactersGallery = styled(motion.main)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

export default function Home(results) {
  const initial = results;
  const [characters, setCharacters] = React.useState(initial.characters);
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
        <CharactersGallery>
          {characters.map((char) => {
            return (
              <CharacterCard key={char.id} character={char}></CharacterCard>
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
