import React, { useState } from "react";
import Header from "../../components/header/header";
import { useUser } from "../../contexts/user/userContext";
import {
  Heading,
  Item,
  ItemDetails,
  ItemLabel,
  ItemText,
  Container,
  Frame,
  Pan,
  Avatar,
  Button,
} from "./styledProfile";
import { signOutUser } from "../../contexts/user/userActions";
import { useNavigate } from "react-router-dom";
import { ErrorMessage } from "../signin/styledSignIn";
import { url } from "../../config/url";
import Footer from "../../components/footer/footer";

export default function Profile() {
  const { user, dispatch } = useUser();
  const [error, setError] = useState("");
  const navigateTo = useNavigate();
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
    <Container>
      <Header />
      <Frame>
        <Heading>Account Overview</Heading>
        <Pan tight>
          <Avatar src={url + user.photo} alt="" />
          <Item>
            <ItemLabel>Username </ItemLabel>
            <ItemDetails>
              <ItemText>{user.name ? user.name : "Unknown"}</ItemText>
            </ItemDetails>
          </Item>
          <Item>
            <ItemLabel>Email</ItemLabel>
            <ItemDetails>
              <ItemText>{user.email}</ItemText>
            </ItemDetails>
          </Item>
          <Item>
            <ItemLabel>Role : </ItemLabel>
            <ItemDetails>
              <ItemText>{user.role.toUpperCase()}</ItemText>
            </ItemDetails>
          </Item>
          <Item>
            <ItemLabel>Phone : </ItemLabel>
            <ItemDetails>
              <ItemText>{user.phone ? user.phone : "Not Available"}</ItemText>
            </ItemDetails>
          </Item>
          <Item>
            <ItemLabel>Address : </ItemLabel>
            <ItemDetails>
              <ItemText>
                {user.address ? user.address : "Not Available"}
              </ItemText>
            </ItemDetails>
          </Item>
          {error && (
            <ErrorMessage style={{ marginBottom: "1rem" }}>
              {error}
            </ErrorMessage>
          )}
          <Button
            as="button"
            style={{ marginRight: "2rem" }}
            onClick={handleSignOut}
          >
            Sign out
          </Button>
          <Button to="/profile/update">Update Your Profile</Button>
        </Pan>
      </Frame>
      <Footer />
    </Container>
  );
}
