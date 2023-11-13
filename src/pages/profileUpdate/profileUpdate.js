import React, { useState } from "react";
import Header from "../../components/header/header";
import FormInput from "../../components/input/input";
import BounceLoader from "react-spinners/BounceLoader";
import { ErrorMessage } from "../signin/styledSignIn";
import { useUser } from "../../contexts/user/userContext";
import {
  Container,
  Pan,
  Heading,
  Frame,
  AgentWrapper,
  Triangle,
  AgentLabel,
  AgentAvatar,
  SubHeading,
  Text,
  Form,
  Button,
  InputsWrapper,
  Avatar,
  Label,
  FileInput,
  UploadIcon,
} from "./styledProfileUpdate";
import avatarUrl from "../../assets/images/agent.svg";
import tickUrl from "../../assets/icons/tick.png";
import uploadUrl from "../../assets/icons/upload.png";
import useInput from "../../hooks/useInput";
import { updateUser } from "../../contexts/user/userActions";
import { useNavigate } from "react-router-dom";
import { url } from "../../config/url";
import Footer from "../../components/footer/footer";

export default function ProfileUpdate() {
  //user context
  const { user, dispatch } = useUser();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [agent, setAgent] = useState(user.role === "agent" ? true : false);
  const username = useInput(user.name || "");
  const phone = useInput(user.phone || "");
  const address = useInput(user.address || "");

  //image is for previewing the avatar
  const [image, setImage] = useState("");
  const [photo, setPhoto] = useState(null);

  const navigateTo = useNavigate();
  const submitForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    let formData = new FormData();
    if (agent) {
      formData.append("role", "agent");
    } else {
      formData.append("role", "general");
    }
    if (phone.value) {
      formData.append("phone", phone.value);
    }
    if (address.value) {
      formData.append("address", address.value);
    }
    if (username.value) {
      formData.append("name", username.value);
    }
    if (photo) {
      formData.append("photo", photo);
    }
    try {
      const response = await updateUser(formData);
      let updatedUser = response.data.user;
      localStorage.setItem("real_state-user", JSON.stringify(updatedUser));
      dispatch({ type: "UPDATE_USER", payload: updatedUser });
      setTimeout(() => {
        navigateTo("/profile");
      }, 3000);
    } catch (error) {
      setLoading(false);
      setError("Something bad happens! Please try again.");
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  const onChangeFile = (e) => {
    const file = e.target.files[0];
    if (
      file.type !== "image/jpeg" &&
      file.type !== "image/png" &&
      file.type !== "image/webp" &&
      file.type !== "image/gif"
    ) {
      setError(
        `${file.name} format is unsupported ! only Jpeg, Png, Webp, Gif are allowed.`
      );
      setTimeout(() => {
        setError("");
      }, 3000);
    } else if (file.size > 1024 * 1024) {
      setError(`${file.name} size is too large max 1mb allowed.`);
      setTimeout(() => {
        setError("");
      }, 3000);
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (readerEvent) => {
        setImage((image) => readerEvent.target.result);
      };
      setPhoto(file);
    }
  };
  return (
    <Container>
      <Header />

      <Frame>
        <Pan tight>
          <Heading>Update Your Profile</Heading>

          <AgentWrapper
            clicked={agent ? true : false}
            onClick={() => {
              setAgent((agent) => !agent);
            }}
          >
            <Triangle>{agent && <img alt="agent" src={tickUrl} />}</Triangle>
            <AgentAvatar src={avatarUrl} />
            <AgentLabel clicked={agent ? true : false}>
              {agent ? "I'm an agent" : "General User"}
            </AgentLabel>
          </AgentWrapper>
          <SubHeading>Your Details</SubHeading>
          <Text>
            We'd love to find out more about you. It'll help us make sure our
            website and apps tick the right boxes.
          </Text>
          <Form>
            <Label htmlFor="avatar-input">
              <Avatar src={image ? image : user.photo} alt="" />
              <UploadIcon src={uploadUrl} alt="Upload" />
              <FileInput
                onChange={onChangeFile}
                type="file"
                id="avatar-input"
              />
            </Label>
            <InputsWrapper>
              <FormInput
                square
                style={{ marginBottom: "2rem" }}
                type="text"
                placeholder="Username"
                {...username}
              />
              <FormInput
                square
                style={{ marginBottom: "2rem" }}
                type="number"
                placeholder="Phone number"
                {...phone}
              />
            </InputsWrapper>

            <FormInput
              square
              style={{ marginBottom: "2rem" }}
              type="text"
              placeholder="Address"
              {...address}
            />
            <Pan
              tight
              style={{
                marginBottom: "2rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <div
                style={{
                  margin: "auto",
                }}
              >
                <BounceLoader color={"#0078bd"} loading={loading} size={40} />
                {error && <ErrorMessage>{error}</ErrorMessage>}
              </div>
            </Pan>
            <Button style={{ marginBottom: "2rem" }} onClick={submitForm}>
              Update
            </Button>
          </Form>
        </Pan>
      </Frame>
      <Footer />
    </Container>
  );
}
