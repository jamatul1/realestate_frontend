import React, { useRef, useState } from "react";
import styled from "styled-components";
import { url } from "../../config/url";
import { useUser } from "../../contexts/user/userContext";
import { Link, useNavigate } from "react-router-dom";
import useClickOutside from "../../utils/clickOutside";
import { ErrorMessage } from "../../pages/signin/styledSignIn";
import { signOutUser } from "../../contexts/user/userActions";

const Container = styled.div`
  width: 30rem;
  background: white;
  position: absolute;
  top: 8rem;
  right: 9rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem 0;
  border-radius: 1rem;
  gap: 0.5rem;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);
  @media (max-width: 1200px) {
    right: 2rem;
  }
  @media (max-width: 500px) {
    width: 20rem;
    font-size: 1.4rem;
    padding: 1rem 0;
  }
`;
const Wrapper = styled.div``;
const Avatar = styled.img`
  width: 7rem;
  height: 7rem;
  border-radius: 100%;
  object-fit: cover;
`;
const Title = styled.h3``;
const SubTitle = styled.h5``;
const Text = styled.p``;
const GrayText = styled.p`
  color: var(--gray);
`;
const Button = styled.button`
  color: var(--grayDark);
  background-color: ${(props) => props.theme.color.whiteDark};
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  margin-top: 0.5rem;
  cursor: pointer;
`;
const LinkButton = styled(Link)`
  color: var(--blue);
  text-decoration: none;
  font-weight: 700;
`;

export default function UserPopUp({ setUserPopUp }) {
  const [error, setError] = useState("");
  const { user, dispatch } = useUser();
  const popUpRef = useRef();
  const navigateTo = useNavigate();
  useClickOutside(popUpRef, () => {
    setUserPopUp(false);
  });

  const handleSignOut = async (e) => {
    try {
      await signOutUser();
      localStorage.removeItem("real_state-user");
      localStorage.removeItem("real_state-token");
      dispatch({ type: "SIGN_OUT" });
      navigateTo("/auth/signin");
    } catch (error) {
      setError("Failed to sign out.");
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  return (
    <Container ref={popUpRef}>
      <Avatar src={user.photo} alt="user-avatar" />
      <Title>{user.name}</Title>
      <GrayText>Role : {user.role}</GrayText>
      {user.role === "agent" && (
        <LinkButton to={"/addProperty"}>Add a property</LinkButton>
      )}
      {user.role === "agent" && (
        <LinkButton to={"/agent/" + user._id}>Your Agent Profile</LinkButton>
      )}
      <LinkButton to="/profile/update">Update Account</LinkButton>
      <LinkButton to="/profile">Account Overview</LinkButton>

      <Button onClick={handleSignOut}>Sign Out</Button>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </Container>
  );
}
