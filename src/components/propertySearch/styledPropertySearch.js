import styled from "styled-components";

export const Container = styled.div`
  width: 60%;
  background-color: #fff;
  border-radius: 1rem;
  overflow: hidden;
  @media (max-width: 768px) {
    width: 80%;
  }
  @media (max-width: 400px) {
    width: 95%;
    margin-bottom: 0.5rem;
  }
`;
export const Top = styled.div`
  display: flex;
  justify-content: flex-start;
  border-bottom: 0.2rem solid ${(props) => props.theme.color.whiteDark};
`;
export const Bottom = styled.div`
  padding: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const TopButton = styled.button`
  background-color: #fff;
  color: ${(props) => props.theme.color.grayDark};
  font-weight: 500;
  font-size: 1.6rem;
  padding: 1rem 7rem;
  border-radius: 0.3rem;
  border: none;
  cursor: pointer;
  border-bottom: 3px solid transparent;
  ${(props) => (props.active ? `border-bottom: 3px solid #e4002b;` : "")}
  transition: all 0.1s ease-in;
  @media (max-width: 500px) {
    font-size: 1.3rem;
    padding: 1rem 3rem;
  }
`;
export const SearchButton = styled.button`
  padding: 0.6rem 2rem;
  height: 4rem;
  border: none;
  color: ${(props) => props.theme.color.white};
  background-color: ${(props) => props.theme.color.brand};
  border-radius: 2rem;
  cursor: pointer;
  @media (max-width: 500px) {
    font-size: 1.3rem;
    height: 3rem;
    padding: 0.4rem 1rem;
  }
`;
export const BottomButton = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 1.8rem;
  color: ${(props) => props.theme.color.grayDark};
  font-weight: 300;
  width: 90%;
  padding: 1.5rem;
  border-radius: 0.5rem;
  transition: all 0.1s ease-in-out;
  &:hover {
    background-color: #f4f4f4;
  }
  @media (max-width: 500px) {
    padding: 0.3rem;
    font-size: 1.5rem;
  }
`;
export const Icon = styled.img``;
export const Overlay = styled.div`
  height: 100vh;
  width: 100vw;
  position: absolute;
  top: 0;
  left: 0;
  background-color: var(--blur);
  display: flex;
  align-items: center;
  justify-content: center;
`;
