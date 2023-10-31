import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  margin: auto;
  padding-bottom: 10rem;
`;
export const Wrapper = styled.div`
  width: 100%;
  margin: auto;
  margin-top: 6rem;
  border-top: 1px solid ${(props) => props.theme.color.whiteDark};
`;
export const Pan = styled.div`
  width: 80%;
  margin: auto;
`;
export const Heading = styled.h1`
  font-size: 2.8rem;
  letter-spacing: 1px;
  color: ${(props) => props.theme.color.grayDark};
  text-align: center;
  font-weight: 500;
  width: 30%;
  line-height: 1.3;
  margin: 0;
  margin: auto;
  margin-top: 2rem;
  @media (max-width: 1100px) {
    width: 60%;
    font-size: 2.6rem;
  }
  @media (max-width: 850px) {
    width: 70%;
    font-size: 2.4rem;
  }
  @media (max-width: 650px) {
    width: 100%;
  }
`;

export const Form = styled.form`
  width: 96%;
  margin: auto;
  margin-top: 2rem;

  @media (max-width: 1100px) {
  }
  @media (max-width: 850px) {
    width: 90%;
  }
  @media (max-width: 650px) {
    width: 100%;
    padding: 0 2rem;
  }
`;
export const InputLabel = styled.label`
  font-weight: 500;
  color: ${(props) => props.theme.color.grayDark};
  margin-bottom: 0.5rem;
  display: inline-block;
`;
export const InputWrapper = styled.div`
  ${(props) => props.row && "display:flex;gap:.5rem;align-items:center;"}
  margin-bottom:1rem;
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
  margin-top: 2rem;
`;

export const TextArea = styled.textarea`
  width: 100%;
  height: 20rem;
  padding: 1rem;
  font-size: 1.6rem;
  border-radius: 0.5rem;
`;
export const Select = styled.select`
  padding: 1rem 2rem;
  border-radius: 0.5rem;
`;
export const Option = styled.option``;
export const Radio = styled.input`
  margin-right: 1rem;
`;
export const UploadLabel = styled.label``;
export const UploadInput = styled.input`
  display: none;
`;
export const UploadIcon = styled.img`
  height: 5rem;
  transform: translateY(2rem);
  margin-left: 2rem;
  cursor: pointer;
`;
export const ImagePreview = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
  gap: 1rem;
`;
export const Image = styled.img`
  width: 100%;
  border-radius: 0.5rem;
`;
export const ImageWrapper = styled.div`
  position: relative;
`;
export const CrossButton = styled.button`
  text-decoration: none;
  cursor: pointer;
  background-color: ${(props) => props.theme.color.brand};
  color: ${(props) => props.theme.color.white};
  font-size: 2rem;
  border: none;
  padding: 0 0.5rem;
  border-radius: 2px;
  position: absolute;
  top: 0;
  right: 0;
`;
export const SuccessMessage = styled.div`
  padding: 1rem 2rem;
  background-color: ${(props) => props.theme.color.whiteDark};
  text-align: center;
  color: ${(props) => props.theme.color.text.success};
`;
export const Center = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem 0;
`;

export const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  @media (max-width: 800px) {
    display: flex;
    flex-direction: column;
  }
`;
