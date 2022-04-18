import Image from "next/image";
import * as React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";


const CardContainer = styled(motion.div)`
  padding: 1rem;
  background: white;
  border-radius: 16px;
  display:flex;
  flex-direction:column;
  gap: 8px;
  width: 300px;
`;

const BioElContainer = styled(motion.div)`
  display:flex;
  flex-direction:row;
  gap: 8px;
`;

const Title = styled(motion.h3)`
  margin: 0;
  line-height: 1.2;
  font-size: 1rem;
`;

const Span = styled(motion.span)``

const StyledImage = styled(Image)`border-radius: 16px;`

export default function CharacterCard(props) {
    const {character, variants, location, href} = props

    // console.log(character)
    return (
      
        <CardContainer variants={variants}>
            <StyledImage width={200} height={200} alt={`An image of ${character.name}`} src={character.image}></StyledImage>
            <BioElContainer>
                <Title>{character.name}</Title>
            </BioElContainer>
            <BioElContainer>
                <Title>Origin</Title>
                <Span>{character.origin.name}</Span>
                </BioElContainer>
                <BioElContainer>
                <Title>Location</Title>
                <Span>{character.location.name}</Span>
            </BioElContainer>
                <BioElContainer>
                <Title>First episode</Title>
                <Span>{character.episode[0].name}</Span>
            </BioElContainer>
                <BioElContainer>
                <Title>ID</Title>
                <Span>{character.id}</Span>
            </BioElContainer>
        </CardContainer>

    )
}