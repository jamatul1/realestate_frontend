import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import HomeIcon from "../../assets/icons/home";

const Pan = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Text = styled.h3`
  font-size: 22px;
  font-weight: 700;
  // font-family: serif;
  color: ${(props) => props.theme.color.grayDark};
  margin: 0;
  @media (max-width: 500px) {
    font-size: 1.8rem;
  }
`;
const Circle = styled.span`
  background-color: ${(props) => props.theme.color.brand};
  height: 3rem;
  width: 3rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.5rem;
  @media (max-width: 500px) {
    height: 2rem;
    width: 2rem;
  }
`;
const HomeLink = styled(Link)`
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function Logo() {
  return (
    <Pan>
      <HomeLink to="/">
        <Circle>
          <HomeIcon height="1.4rem" width="1.4rem" />
        </Circle>
        <Text>realstateBd.com</Text>
      </HomeLink>
    </Pan>
  );
}
