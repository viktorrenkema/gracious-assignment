// 📦 Packages
import * as React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

// 🌱 Components
import Image from "next/image";

// 🧰 Utils

// 💅🏽 Styled Components
const CardContainer = styled(motion.div)`
  padding: 1rem;
  background: white;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 232px;
  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.12);
  cursor: pointer;
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
  overflow: hidden;
  height: 200px;
  width: 200px;
  border-radius: 16px;
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

export const DetailType = styled(motion.span)`
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
  overflow: visible;
  box-shadow: 0px 2px 8px 0px rgb(0 0 0 / 12%);
`;

// 🌀 Variants
const nameVariants = {
  default: {
    y: 0,
  },
  hover: {
    y: -10,
  },
};

const idVariants = {
  default: {
    opacity: 1,
  },
  hover: {
    opacity: 0,
  },
};

const imageVariants = {
  default: {
    transform: "scale(1)",
  },
  hover: {
    transform: "scale(1.2)",
  },
};

export default function CharacterCard(props) {
  const [hover, setHover] = React.useState(false);
  const { character, variants, animate, initial } = props;

  const str = character.name;
  const maxLen = 17;
  let charName = character.name;

  if (str.length > maxLen) {
    let result = str.substr(0, maxLen);
    charName = result.substr(
      0,
      Math.min(result.length, result.lastIndexOf(" "))
    );
  }

  return (
    <CardContainer
      animate={animate}
      initial={initial}
      variants={variants}
      onHoverStart={() => {
        setHover(true);
      }}
      onHoverEnd={() => {
        setHover(false);
      }}
    >
      <RelativeContainer>
        <motion.div
          variants={imageVariants}
          initial={"default"}
          animate={hover ? "hover" : "default"}
        >
          <StyledImage
            width={200}
            height={200}
            alt={`An image of ${character.name}`}
            src={character.image}
          ></StyledImage>
        </motion.div>
        <AbsoluteShade>
          {" "}
          <OverlayDetailsContainer>
            <IDSpan
              variants={idVariants}
              initial="default"
              animate={hover ? "hover" : "default"}
            >
              #{character.id}
            </IDSpan>
            <Title
              variants={nameVariants}
              initial="default"
              animate={hover ? "hover" : "default"}
              title={character.name}
            >
              {charName}
            </Title>
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
        <DetailType>1st episode</DetailType>
        <DetailData title={character.episode[0].name}>
          {character.episode[0].name}
        </DetailData>
      </DetailsContainer>
    </CardContainer>
  );
}
