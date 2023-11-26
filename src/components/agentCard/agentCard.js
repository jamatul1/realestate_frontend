import styled from "styled-components";
import { url } from "../../config/url";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Container = styled.div`
  width: 20rem;
  height: 25rem;
  border: 0.1rem solid ${(props) => props.theme.color.whiteDark};
  background: #fff;
  border-radius: 0.2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  gap: 1rem;
  box-shadow: 1px 1px 5px 0 rgba(0, 0, 0, 0.1);
`;
const Avatar = styled.img`
  height: 8rem;
  width: 8rem;
  object-fit: cover;
  border-radius: 50%;
`;
const Text = styled.p`
  color: var(--gray);
  margin: 0;
`;
const Top = styled.div`
  display: flex;
  align-items: center;
  gap: 0.2rem;
  flex-direction: column;
`;
const Button = styled.a`
  background-color: ${(props) => (props.phone ? "#ffffff" : "#00e489")};
  color: ${(props) => (props.phone ? "var(--green)" : "#ffffff")};
  font-weight: 500;
  cursor: pointer;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 1rem;
  text-decoration: none;
`;
const Title = styled.h3`
  color: var(--grayDark);
  margin: 0;
  line-height: 1.2;
`;
export default function AgentCard({ agent }) {
  return (
    <Container>
      <Top>
        <Avatar src={agent.photo} alt="agent-photo"></Avatar>
        <Title>{agent.name}</Title>
        <Text>{agent.address}</Text>
      </Top>

      <Button href={`tel:${agent.phone}`}>Call Agent</Button>
    </Container>
  );
}
