import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { url } from "../../config/url";
import { useUser } from "../../contexts/user/userContext";
import UserPopUp from "../userPopUp/userPopUp";

const SignInButton = styled(Link)`
  text-decoration: none;
  color: ${(props) => props.theme.color.grayDark};
  padding: 1rem 2rem;
  font-weight: bold;
  background-color: ${(props) => props.theme.color.whiteDark};
  border-radius: 0.5rem;
  transition: all 0.3s ease-in;
  &:hover {
    background-color: ${(props) => props.theme.color.gray};
  }
  @media (max-width: 500px) {
    font-size: 1.2rem;
    padding: 0.5rem 1rem;
  }
`;
const JoinButton = styled(Link)`
  text-decoration: none;
  color: ${(props) => props.theme.color.white};
  padding: 1rem 2rem;
  background-color: ${(props) => props.theme.color.brand};
  border-radius: 1rem;
  font-weight: bold;
  margin-left: 1rem;
  transition: all 0.3s ease-in;
  &:hover {
    background-color: ${(props) => props.theme.color.text.warning};
  }
  @media (max-width: 500px) {
    font-size: 1.2rem;
    padding: 0.5rem 1rem;
  }
`;
const Wrapper = styled.div``;
const UserAvatar = styled.div`
  height: 3.6rem;
  width: 3.6rem;
  border-radius: 50%;
  background-color: ${(props) => props.theme.color.gray};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }
`;
export default function UserMenu() {
  const [showUserPopUp, setShowUserPopUp] = useState(false);
  let { user } = useUser();
  return (
    <Wrapper>
      {user ? (
        <>
          <UserAvatar
            onClick={() => {
              if (showUserPopUp) return;
              setShowUserPopUp((val) => !val);
            }}
          >
            <img src={user?.photo} alt="user-avatar" />
          </UserAvatar>
          {showUserPopUp && <UserPopUp setUserPopUp={setShowUserPopUp} />}
        </>
      ) : (
        <>
          <SignInButton to="/auth/signin">Sign in</SignInButton>
          <JoinButton to="/auth/signup">Join</JoinButton>
        </>
      )}
    </Wrapper>
  );
}
