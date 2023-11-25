import styled from "styled-components";
import bgImgUrl from "../.././assets/images/cover_signin.jpg";

export const Container = styled.div`
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background-color: ${(props) => props.theme.color.whiteDark};
  background: url(${bgImgUrl});
  background-size: 100%;
  display: flex;
  flex-direction: column;
`;
export const Frame = styled.div`
  width: 40rem;
  padding: 5rem 3rem;
  background-color: ${(props) => props.theme.color.white};
  margin: auto;
  display: flex;
  align-items: center;
  margin-top: 20vh;
  flex-direction: column;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
  border-radius: 1rem;
  transform: translateY(-5rem);
  @media (max-width: 500px) {
    @media (max-width: 500px) {
      width: 96%;
    }
  }
`;
export const Heading = styled.h1`
  margin: 1rem 0;
  font-size: 2.8rem;
  color: ${(props) => props.theme.color.grayDark};
  margin-bottom: 2rem;
  margin-top: 2rem;
`;
export const LogoWrapper = styled.span``;
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
export const Text = styled.p`
  margin-top: 5rem;
`;

export const Form = styled.form`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
`;

export const ErrorMessage = styled.div`
  color: ${(props) => props.theme.color.text.warning};
  font-size: 1.5rem;
  background-color: ${(props) => props.theme.color.whiteDark};
  padding: 1rem;
  border-radius: 0.5rem;
  text-align: center;
  width: 100%;
`;
