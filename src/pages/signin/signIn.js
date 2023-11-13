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
} from "./styledSignIn";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import FormInput from "../../components/input/input";
import Logo from "../../components/logo/logo";
import useInput from "../../hooks/useInput";
import { signInUser } from "../../contexts/user/userActions";
import { useUser } from "../../contexts/user/userContext";
import BounceLoader from "react-spinners/BounceLoader";
import Footer from "../../components/footer/footer";
import { useFormik } from "formik";
import * as Yup from "yup";

const StyledLink = styled(Link)`
  color: #0078bd;
  text-decoration: none;
`;
export default function SignIn() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { dispatch } = useUser();
  const navigateTo = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("invalid `email` address")
        .required("`Email` is required !"),
      password: Yup.string()
        .required("`Password` is required !")
        .min(8, "`Password` is too short - should be 8 chars minimum !"),
    }),
    onSubmit: async (values) => {
      setLoading(true);

      try {
        let response = await signInUser(values);
        if (response.status === "success") {
          let { user } = response.data;
          let token = response.token;
          // Save them into local storage
          localStorage.setItem("real_state-user", JSON.stringify(user));
          localStorage.setItem("real_state-token", token);
          // Dispatch an action
          dispatch({ type: "SIGN_IN", payload: user });
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
    },
  });

  return (
    <Container>
      <Frame>
        <LogoWrapper>
          <Logo />
        </LogoWrapper>
        <Heading>Sign in</Heading>
        <Form onSubmit={formik.handleSubmit}>
          <FormInput
            type="email"
            required
            placeholder="Email address"
            {...formik.getFieldProps("email")}
          />
          {formik.touched.email && formik.errors.email ? (
            <ErrorMessage>{formik.errors.email}</ErrorMessage>
          ) : null}
          <FormInput
            type="password"
            placeholder="Passwrod"
            required
            {...formik.getFieldProps("password")}
          />
          {formik.touched.password && formik.errors.password ? (
            <ErrorMessage>{formik.errors.password}</ErrorMessage>
          ) : null}
          <Button style={{ marginBottom: "2rem" }}>Sign in</Button>
          <BounceLoader color={"#0078bd"} loading={loading} size={40} />
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </Form>
        <Text>
          Not signed up?{" "}
          <StyledLink to={"/auth/signup"}>Create an acccount</StyledLink>
        </Text>
      </Frame>
      <Footer />
    </Container>
  );
}
