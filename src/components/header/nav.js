import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import LeftNav from "./leftNav";
import { useMediaQuery } from "react-responsive";

const Container = styled.div``;
const List = styled.ul`
  display: flex;

  list-style: none;
`;
const ListItem = styled.li`
  list-style: none;
`;
const ListLink = styled(Link)`
  text-decoration: none;
  font-size: 1.6rem;
  color: ${(props) => props.theme.color.grayDark};
  font-weight: 500;
  padding: 0.5rem 1.5rem;
  border-radius: 0.5rem;
  transition: all 0.3s ease-out;
  &:hover {
    background-color: ${(props) => props.theme.color.whiteDark};
  }
`;

export default function Nav() {
  let lessThan1000 = useMediaQuery({
    query: "(max-width: 1000px)",
  });

  return (
    <>
      {lessThan1000 ? (
        <LeftNav />
      ) : (
        <Container>
          <List>
            <ListLink to="/buy">Buy</ListLink>
            <ListLink to="/rent">Rent</ListLink>
            <ListLink to="/explores">Explores </ListLink>
            <ListLink to="/newHomes">New Homes</ListLink>
            <ListLink to="/blogs">Blogs</ListLink>
          </List>
        </Container>
      )}
    </>
  );
}
