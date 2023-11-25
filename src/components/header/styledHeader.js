import styled from "styled-components";
export const Container = styled.div`
  height: 7rem;
  width: 100%;
  padding: 0 15rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: auto;
  z-index: 1000;
  position: fixed;
  background-color: #fff;
  top: 0;
  @media (max-width: 1200px) {
    padding: 0 5rem;
  }
  @media (max-width: 900px) {
    padding: 0 3rem;
  }
  @media (max-width: 500px) {
    padding: 0 1rem;
  }
`;
export const LogoWrapper = styled.div``;
export const Navbar = styled.div`
  margin-right: 13rem;
  @media (max-width: 1000px) {
    margin-right: 0;
  }
`;
export const UserMenuWrapper = styled.div``;
