import styled from "styled-components";
import { useState } from "react";
import { url } from "../../config/url";
const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background: var(--grayDark);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 3000;
`;
const Image = styled.img`
  width: 100%;
`;
const Button = styled.button`
  font-size: 15rem;
  color: var(--gray);
  background: transparent;
  border: none;
  font-weight: 300;
  cursor: pointer;
  @media (max-width: 800px) {
    font-size: 10rem;
  }
`;
const ExitButton = styled.button`
  border: none;
  background-color: var(--grayDark);
  color: var(--gray);
  font-size: 2rem;
  font-weight: 800;
  position: absolute;
  top: 2rem;
  right: 5rem;
  cursor: pointer;
  z-index: 3100;
`;
const ContentWrapper = styled.div`
  position: relative;
  width: 60%;
  margin: auto;
  margin-top: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 800px) {
    margin-top: 15rem;
  }
`;
const CurrentLabel = styled.p`
  color: white;
  position: absolute;
  top: 2rem;
  left: 7rem;
  color: var(--gray);
  font-weight: 500;
`;
export default function ImageGallery({ start = 0, images, setShowImgPreview }) {
  let [index, setIndex] = useState(start);

  const handleButtons = (btnType) => {
    if (btnType === "next") {
      if (index + 1 < images.length) {
        setIndex((index) => index + 1);
      } else {
        setIndex(0);
      }
    } else {
      if (index - 1 >= 0) {
        setIndex((index) => index - 1);
      } else {
        setIndex(images.length - 1);
      }
    }
  };
  return (
    <Container>
      <CurrentLabel>{`${index + 1}/${images.length}`}</CurrentLabel>
      <ExitButton onClick={() => setShowImgPreview(false)}>╳</ExitButton>
      <ContentWrapper>
        <Button onClick={() => handleButtons("prev")}>{"<"}</Button>
        <Image src={url + images[index]} alt="imgs" />
        <Button onClick={() => handleButtons("next")}>{">"}</Button>
      </ContentWrapper>
    </Container>
  );
}
