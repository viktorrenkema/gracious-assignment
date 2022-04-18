import React from "react";
import { gql, useQuery } from "@apollo/client";

const CHARACTER_DATA_QUERY = gql`
  query FetchCharacter($charId: Int) {
    character(id: $charId) {
      name
    }
  }
`;

const TEST = gql`
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

const CharacterDetails = ({ charId }) => {
  const { data, loading } = useQuery(CHARACTER_DATA_QUERY, {
    variables: { charId: 1 },
    // variables: { id: parseInt(charId, 10) },
  });

  React.useEffect(() => {
    if (!data) return console.log("no data yet");
    if (data) {
      console.log(data);
    }
  }, [data]);

  // if (loading || !data) return null;
  // if (loading) {
  //   console.log("loading");
  // }
  // if (!loading) {
  //   console.log(data);
  // }

  // const { name, date, location, imageUrl, description } = data.event;

  return (
    <>
      <div>hey there this is the detail page for </div>
    </>
  );
};

export const getServerSideProps = async ({ params }) => {
  console.log(params);
  return {
    props: {
      charId: 1,
      // charId: params.id,
    },
  };
};

export default CharacterDetails;
