import React from "react";
import styled from "styled-components";

const Container = styled.div`
  margin-top: 2rem;
  height: 7rem;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  background-color: white;
  gap: 1rem;
  @media (max-width: 500px) {
    gap: 0;
  }
`;
const Text = styled.p`
  color: ${(props) =>
    props.gray ? props.theme.color.gray : props.theme.color.grayDark};
  @media (max-width: 500px) {
    font-size: 1.3rem;
  }
`;
export default function Footer() {
  return (
    <Container>
      <Text>All right reserved by © Jamatul Islam</Text>
      <Text gray>This site created for the learning purpose</Text>
    </Container>
  );
}
