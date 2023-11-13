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
import * as Yup from "yup";
import { useFormik } from "formik";

const StyledLink = styled(Link)`
  color: #0078bd;
  text-decoration: none;
`;
export default function SignUp() {
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
        .email("invalid `email` address !")
        .required("`Email` is required !"),
      password: Yup.string()
        .required("`Password` is required !")
        .min(8, "`Password` is too short - should be 8 chars minimum !"),
    }),
    onSubmit: async (values) => {
      setLoading(true);

      try {
        let response = await signUpUser(values);
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
        <Heading>Create account</Heading>
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
          <Button style={{ marginBottom: "2rem" }}>Create Account</Button>
          <BounceLoader color={"#0078bd"} loading={loading} size={40} />
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </Form>
        <Text>
          Already have account?{" "}
          <StyledLink to={"/auth/signin"}>Sign in</StyledLink>
        </Text>
      </Frame>
      <Footer />
    </Container>
  );
}
