import Image from "next/image";
import * as React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";


const CardContainer = styled(motion.div)`
  padding: 1rem;
`;

export default function CharacterCard(props) {
    const {character, key} = props

    console.log(character)
    return (
        <CardContainer key={key}>
            <Image width={200} height={200} alt={`An image of ${character.name}`} src={character.image}></Image>
        </CardContainer>
    )
}