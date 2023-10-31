import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
`;
export const ShowCaseWrapper = styled.div`
  margin-top: 8rem;
  height: calc(100vh - 16rem);
`;
export const Heading = styled.h1`
  font-size: 2.4rem;
  letter-spacing: 1px;
  color: ${(props) => props.theme.color.grayDark};
  text-align: center;
  font-weight: 700;
  margin: 0;
  margin-top: 2.5rem;
  line-height: 1.2;
  @media (max-width: 500px) {
    font-size: 2rem;
  }
`;
