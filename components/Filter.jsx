import Image from "next/image";
import * as React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

const Select = styled.select`
  font-size: 30px;
  line-height: 32px;
  font-family: "Teko Light";
  color: black;
  border: 0px solid white;
  border-bottom: 1px solid black;
  -webkit-appearance: none;
  border-radius: 0px;
`;

export default function Filter(results) {
    const [industriesFilter, setIndustriesFilter] = React.useState("all");
    const initial = results;
    console.log(results);
    return (
      <Select
      id="industries"
      name="industries"
      onChange={(e) => setIndustriesFilter(e.target.value)}
    >
      <option value="all">all industries</option>
      <option value="ecommerce">e-commerce</option>
      <option value="art">art</option>
      <option value="travel">travel</option>
      <option value="tech">technology</option>
    </Select>
    )
}


export async function getStaticProps() {
  const client = new ApolloClient({
    uri: "https://rickandmortyapi.com/graphql/",
    // cache: new InMemoryCache(),
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
        dimensions: data.locations.results,
      },
    };
  }
  
  // query {
  //   locations(page: 1) {
  //     info {
  //       count
  //       pages
  //     }
  //     results {
  //       name
  //       id
  //     }
  //   }
  // }