import Image from "next/image";
import * as React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { Label } from "./Filter";

const CardContainer = styled(motion.div)`
  padding: 1rem;
  background: white;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 232px;
  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.12);
`;

const OverlayDetailsContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 0px;
  align-content: center;
  justify-content: center;
  align-items: center;
`;

const RelativeContainer = styled(motion.div)`
  position: relative;
`;

const AbsoluteShade = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  background: #00000054;
  width: 200px;
  height: 200px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled(motion.h3)`
  margin: 0;
  line-height: 1.2;
  font-size: 1.25rem;
  flex-shrink: 0;
  width: auto; /* 119px */
  height: auto; /* 24px */
  white-space: pre;
  font-weight: 700;
  font-style: normal;
  font-family: "DM Sans", sans-serif;
  color: #ffffff;
  font-size: 20px;
  letter-spacing: 0px;
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const IDSpan = styled(motion.span)`
  font-family: "DM Mono", sans-serif;
  color: #ffffffcc;
  font-size: 14px;
  letter-spacing: 0px;
  line-height: 1.2;
`;

const DetailsContainer = styled(motion.div)`
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
`;

const DetailType = styled(motion.span)`
  font-weight: 700;
  font-family: "DM Sans", sans-serif;
  color: #7d7d7d;
  font-size: 10px;
  line-height: 1.2;
  text-transform: uppercase;
  letter-spacing: 0.4px;
`;

const DetailData = styled(motion.span)`
  font-weight: 500;
  font-style: normal;
  font-family: "DM Sans", sans-serif;
  color: #000000;
  font-size: 14px;
  letter-spacing: 0px;
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StyledImage = styled(Image)`
  border-radius: 16px;
`;

export default function CharacterCard(props) {
  const { character, variants, location, href } = props;

  // console.log(character)
  return (
    <CardContainer variants={variants}>
      <RelativeContainer>
        <StyledImage
          width={200}
          height={200}
          alt={`An image of ${character.name}`}
          src={character.image}
        ></StyledImage>
        <AbsoluteShade>
          {" "}
          <OverlayDetailsContainer>
            <IDSpan>#{character.id}</IDSpan>
            <Title title={character.name}>{character.name}</Title>
          </OverlayDetailsContainer>
        </AbsoluteShade>
      </RelativeContainer>

      <DetailsContainer>
        <DetailType>Origin</DetailType>
        <DetailData title={character.origin.name}>
          {character.origin.name}
        </DetailData>
      </DetailsContainer>
      <DetailsContainer>
        <DetailType>Location</DetailType>
        <DetailData title={character.location.name}>
          {character.location.name}
        </DetailData>
      </DetailsContainer>
      <DetailsContainer>
        <DetailType>First episode</DetailType>
        <DetailData title={character.episode[0].name}>
          {character.episode[0].name}
        </DetailData>
      </DetailsContainer>
    </CardContainer>
  );
}
