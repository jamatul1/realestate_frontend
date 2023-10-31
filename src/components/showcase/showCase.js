import styled from "styled-components";
import hero from "../../assets/images/hero.webp";
const Container = styled.div`
  height: 85vh;
  margin: 0 3rem;
  background: url(${hero});
  background-size: cover;
  background-position: 100% 100%;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 1rem;
  @media (max-width: 1300px) {
    height: 75vh;
  }
  @media (max-width: 1200px) {
    height: 70vh;
  }
  @media (max-width: 1000px) {
    height: 60vh;
  }
  @media (max-width: 800px) {
    height: 50vh;
  }
  @media (max-width: 500px) {
    height: 45vh;
  }
  @media (max-width: 380px) {
    height: 35vh;
  }
`;
export default function ShowCase({ children, ...props }) {
  return <Container {...props}>{children}</Container>;
}
