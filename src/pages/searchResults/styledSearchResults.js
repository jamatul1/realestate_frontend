import styled from "styled-components";

export const Container = styled.div``;
export const Pan = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 50vh;
`;
export const Frame = styled.div`
  margin-top: 16rem;
`;
export const Heading = styled.h1`
  font-size: 2.8rem;
  letter-spacing: 1px;
  color: ${(props) => props.theme.color.grayDark};
  text-align: center;
  font-weight: 500;
  margin: 0;
  margin-top: 0.5rem;
  line-height: 1.2;
  padding: 0 1rem;
  @media (max-width: 500px) {
    font-size: 2.2rem;
  }
`;
export const ProductsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(25rem, 30rem));
  gap: 2rem;

  margin: auto;
  padding: 2rem 10rem;
  @media (max-width: 1300px) {
    padding: 2rem 5rem;
  }
  @media (max-width: 1100px) {
    padding: 2rem 3rem;
  }
  @media (max-width: 800px) {
    padding: 2rem 2rem;
    justify-content: center;
  }
  @media (max-width: 500px) {
    padding: 2rem 0.5rem;
    justify-content: center;
  }
`;

export const NotFoundImage = styled.img`
  height: 30rem;
`;
export const SortWrapper = styled.div`
  position: absolute;
  top: 17rem;
  right: 2rem;
  @media (max-width: 700px) {
    top: 16rem;
  }
  @media (max-width: 500px) {
    top: 13rem;
  }
`;

export const PaginateWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
