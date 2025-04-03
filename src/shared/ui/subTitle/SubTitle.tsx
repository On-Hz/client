import styled from 'styled-components';

const ConTitle = styled.p`
    font-size:20px;
    font-weight:600;
`;

interface SubTitleProps {
    text: string;
  }

export const SubTitle = ({text}: SubTitleProps) => {
    return<ConTitle>{text}</ConTitle>
};
  