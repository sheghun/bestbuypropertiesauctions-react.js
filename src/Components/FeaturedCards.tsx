import React from 'react';
import Card from './Card';
import styled, {keyframes} from 'styled-components';

const slide = keyframes`
  from {
    transform: translateY(-2%);
  }

  to {
    transform: translateY(2%);
  }
`;

interface Props {
    title: string;
    description: string;
    index: number;
    id: number;
}

export default function FeaturedCards({id, index, ...props}: Props) {
    const StyledCard = styled(Card)`
        margin-top: ${index * 4}rem
        animation: ${slide} ${1}s linear infinite alternate;
        animation-delay: ${index + 1}s;
    `;

    return (
        <StyledCard
            // @ts-ignore
            elevation={24}
            id={id}
            {...props}
        />
    );
}
