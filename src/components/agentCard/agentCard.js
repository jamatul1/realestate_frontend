import styled from "styled-components";
import { url } from "../../config/url";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Container = styled.div`
  width: 23rem;
  height: 25rem;
  border: 0.1rem solid ${(props) => props.theme.color.whiteDark};
  background: #fff;
  border-radius: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  box-shadow: 1px 1px 5px 0 rgba(0, 0, 0, 0.2);
`;
const Avatar = styled.img`
  height: 8rem;
  width: 8rem;
  object-fit: cover;
  border-radius: 50%;
`;
const Text = styled.p`
  color: var(--gray);
  margin: 1.5rem 0;
`;
const Top = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;
const Button = styled.button`
  background-color: ${(props) =>
    props.phone ? "#ffffff" : props.theme.color.brand};
  color: ${(props) => (props.phone ? "var(--green)" : "#ffffff")};
  font-weight: 500;
  cursor: pointer;
  border: none;
  padding: 1rem 2rem;
  border-radius: 1rem;
`;
const Title = styled.h3`
  color: var(--grayDark);
`;
export default function AgentCard({ agent }) {
  const [showPhone, setShowPhone] = useState(false);
  const notify = () =>
    toast(
      `Agent Phone Number is copied ! 
                  You can call him for any information!`,
      {
        position: "bottom-right",
        autoClose: 8000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }
    );
  return (
    <Container>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Top>
        <Avatar src={url + agent.photo} alt="agent-photo"></Avatar>
        <Title>{agent.name}</Title>
      </Top>
      <Text>{agent.address}</Text>
      <Button
        phone={showPhone ? true : false}
        onClick={() => {
          setShowPhone(true);
          navigator.clipboard.writeText(agent.phone);
          notify();
        }}
      >
        {showPhone ? "Phone no: " + agent.phone : "Call Agent"}
      </Button>
    </Container>
  );
}
