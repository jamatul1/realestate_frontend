import { Link } from "react-router-dom";
import styled from "styled-components";
export const Container = styled.div`
  width: 100%;
  margin: auto;
`;
export const Pan = styled.div`
  width: 90%;
  margin: auto;
  width: ${(props) => (props.tight ? "40%" : "90%")};
  @media (max-width: 1000px) {
    width: ${(props) => (props.tight ? "70%" : "90%")};
  }
  @media (max-width: 500px) {
    width: ${(props) => (props.tight ? "100%" : "90%")};
  }
`;
export const Frame = styled.div`
  border-top: 1px solid ${(props) => props.theme.color.whiteDark};
  padding: 0rem 2rem;
  width: 100%;
  margin: auto;
  margin-top: 8rem;
  text-align: center;
`;
export const Heading = styled.h1`
  font-size: 3.4rem;
  letter-spacing: 1px;
  color: ${(props) => props.theme.color.grayDark};
  text-align: center;
  margin-bottom: 1rem;
  margin-top: 1rem;
  @media (max-width: 500px) {
    font-size: 2.4rem;
  }
`;
export const Item = styled.div`
  margin-bottom: 1rem;
  text-align: left;
  border: 1px solid ${(props) => props.theme.color.whiteDark};
  padding: 0.5rem 2rem;
  border-radius: 0.5rem;
`;
export const ItemLabel = styled.h6`
  font-size: 1.6rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: ${(props) => props.theme.color.text.primary};
`;
export const ItemDetails = styled.div``;
export const ItemText = styled.p`
  color: ${(props) => props.theme.color.text.secondary};
  font-size: 1.4rem;
`;
export const Avatar = styled.img`
  height: 8rem;
  width: 8rem;
  border-radius: 50%;
  background: ${(props) => props.theme.color.grayDark};
  margin-bottom: 1rem;
  object-fit: cover;
`;

export const Button = styled(Link)`
  padding: 1rem 2rem;
  font-weight: bold;
  background-color: ${(props) => props.theme.color.whiteDark};
  text-decoration: none;
  border-radius: 0.5rem;
  border: none;
  color: ${(props) => props.theme.color.grayDark};
  cursor: pointer;
  @media (max-width: 500px) {
    font-size: 1.4rem;
    padding: 0.8rem 1.6rem;
  }
`;
