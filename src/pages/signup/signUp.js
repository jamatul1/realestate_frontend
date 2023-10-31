import React, { useState } from "react";
import {
  Container,
  Frame,
  Heading,
  Button,
  Text,
  Form,
  LogoWrapper,
  ErrorMessage,
} from "./styledSignUp";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import FormInput from "../../components/input/input";
import Logo from "../../components/logo/logo";
import useInput from "../../hooks/useInput";
import { signUpUser } from "../../contexts/user/userActions";
import { useUser } from "../../contexts/user/userContext";
import BounceLoader from "react-spinners/BounceLoader";
import Footer from "../../components/footer/footer";

const StyledLink = styled(Link)`
  color: #0078bd;
  text-decoration: none;
`;
export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const email = useInput("");
  const password = useInput("");

  const { dispatch } = useUser();
  const navigateTo = useNavigate();

  const submitForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    // check if email and password is not empty
    if (email.value && password.value) {
      // create userObj
      let userObj = { email: email.value, password: password.value };
      try {
        let response = await signUpUser(userObj);
        if (response.status === "success") {
          let { user } = response.data;
          let token = response.token;
          // Save them into local storage
          localStorage.setItem("real_state-user", JSON.stringify(user));
          localStorage.setItem("real_state-token", token);
          // Dispatch an action
          dispatch({ type: "SIGN_UP", payload: user });
          setError("");
          setTimeout(() => {
            setLoading(false);
            navigateTo("/");
          }, 3000);
        }
      } catch (error) {
        setLoading(false);
        setError("Something went wrong when signing up. Please try again !");
      }
    } else {
      setLoading(false);
      setError("You haven't provided email or password.");
    }
  };

  return (
    <Container>
      <Frame>
        <LogoWrapper>
          <Logo />
        </LogoWrapper>
        <Heading>Create account</Heading>
        <Form>
          <FormInput
            style={{ marginBottom: "2rem" }}
            type="email"
            placeholder="Email address"
            {...email}
          />
          <FormInput
            style={{ marginBottom: "2rem" }}
            type="password"
            placeholder="Passwrod"
            {...password}
          />
          <Button style={{ marginBottom: "2rem" }} onClick={submitForm}>
            Create account
          </Button>
          <BounceLoader color={"#0078bd"} loading={loading} size={40} />
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </Form>
        <Text>
          Already have account?{" "}
          <StyledLink to={"/auth/signin"}>Sign in</StyledLink>
        </Text>
      </Frame>
      <Footer/>
    </Container>
  );
}
