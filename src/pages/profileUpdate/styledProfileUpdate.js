import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  margin: auto;
`;
export const Pan = styled.div`
  width: 90%;
  margin: auto;
  width: ${(props) => (props.tight ? "40%" : "90%")};
  @media (max-width: 1000px) {
    width: ${(props) => (props.tight ? "100%" : "90%")};
  }
`;
export const Frame = styled.div`
  border-top: 1px solid ${(props) => props.theme.color.whiteDark};
  padding: 0rem 2rem;
  width: 100%;
  margin: auto;
  text-align: center;
  margin-top: 8rem;
`;
export const Heading = styled.h1`
  font-size: 2.8rem;
  letter-spacing: 1px;
  color: ${(props) => props.theme.color.grayDark};
  text-align: center;
  font-weight: 500;
  margin: 0;
  margin-top: 0.5rem;
  @media (max-width: 500px) {
    font-size: 2.4rem;
  }
`;
export const AgentWrapper = styled.div`
  width: 14rem;
  height: 12rem;
  background-color: #eff0f4;
  border-radius: 1rem;
  position: relative;
  padding: 0.5rem 2rem;
  overflow: hidden;
  background-color: ${(props) => (props.clicked ? " #01c794" : "#eff0f4")};
  margin: auto;
  margin-top: 2rem;
  cursor: pointer;
  @media (max-width: 500px) {
    width: 45%;
  }
`;
export const Triangle = styled.div`
  border-right: 27px solid #eff0f4;
  border-top: 27px solid #eff0f4;
  border-left: 27px solid transparent;
  border-bottom: 27px solid transparent;
  width: 18%;
  position: absolute;
  top: 0;
  right: 0;
  img {
    width: 2.5rem;
    position: absolute;
    top: -2.2rem;
    right: -2.2rem;
  }
`;
export const AgentLabel = styled.h3`
  font-size: 1.8rem;
  color: ${(props) =>
    props.clicked ? "#ffffff" : "props.theme.color.grayDark"};
  @media (max-width: 500px) {
    font-size: 1.6rem;
  }
`;
export const AgentAvatar = styled.img`
  width: 10rem;
  height: 10rem;
`;

export const SubHeading = styled.h2`
  font-size: 2.4rem;
  font-weight: 400;
  color: ${(props) => props.theme.color.grayDark};
  margin: 1.5rem 0;
  @media (max-width: 500px) {
    font-size: 2rem;
  }
`;
export const Text = styled.p`
  color: ${(props) => props.theme.color.gray};
  font-size: 1.4rem;
  width: 80%;
  margin: auto;
`;
export const Form = styled.form`
  width: 80%;
  margin: auto;
  margin-top: 2.5rem;
  @media (max-width: 500px) {
    width: 90%;
  }
  z-index: -10000;
`;
export const Button = styled.button`
  width: 100%;
  border: none;
  height: 4.5rem;
  font-size: 1.6rem;
  font-weight: bold;
  color: ${(props) => props.theme.color.white};
  background-color: ${(props) => props.theme.color.brand};
  border-radius: 0.5rem;
  cursor: pointer;
`;
export const InputsWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 1rem;
`;
export const Avatar = styled.img`
  height: 8rem;
  width: 8rem;
  border-radius: 50%;
  object-fit: cover;
  background: ${(props) => props.theme.color.grayDark};
  margin-bottom: 3rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateY(1.3rem) translateX(-1rem);
  border: 0.3rem solid ${(props) => props.theme.color.brand};
  z-index: -10000;
`;
export const Label = styled.label`
  display: flex;
  // flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  height: 8rem;
  font-weight: bold;
  transform: translateY(-1rem);
  z-index: -10000;
`;
export const FileInput = styled.input`
  display: none;
`;
export const UploadIcon = styled.img`
  width: 3rem;
`;
