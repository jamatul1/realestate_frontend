import styled from "styled-components";
import { useState } from "react";
import FilterPopUp from "./filterPopUp";
import FilterIcon from "../../assets/icons/filter";
const Container = styled.div`
  height: 7rem;
  width: 100%;
  padding: 2rem 10rem;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.01);
  background-color: #fff;
  // margin-top: 6rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: fixed;
  top: 6rem;
  z-index: 1;
  @media (max-width: 800px) {
    justify-content: center;
    flex-wrap: wrap;
    padding: 1rem 5rem;
    height: 8rem;
  }
  @media (max-width: 500px) {
    padding: 1rem 2rem;
    height: 5rem;
  }
`;
const FilterButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
const Button = styled.button`
  padding: 1.5rem 2rem;
  background-color: #fff;
  border: 1px solid ${(props) => props.theme.color.whiteDark};
  border-radius: 2rem;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  &:hover {
    background-color: ${(props) => props.theme.color.whiteDark};
  }
  @media (max-width: 500px) {
    font-size: 1.4rem;
    padding: 0.7rem 1.4rem;
  }
`;
export default function PropertyFilter({ filterProp, setFilterProp }) {
  const [showPopUp, setShowPopUp] = useState(false);
  const [focusField, setFocusField] = useState("");
  return (
    <>
      {showPopUp ? (
        <FilterPopUp
          filterProp={filterProp}
          setFilterProp={setFilterProp}
          focusField={focusField}
          setShowPopUp={setShowPopUp}
        />
      ) : (
        <Container>
          <FilterButtonWrapper>
            <Button
              onClick={() => {
                setShowPopUp(true);
                setFocusField("");
              }}
            >
              Property type
            </Button>
            <Button
              onClick={() => {
                setShowPopUp(true);
                setFocusField("price");
              }}
            >
              Price
            </Button>
            <Button
              onClick={() => {
                setShowPopUp(true);
                setFocusField("beds");
              }}
            >
              Beds
            </Button>
            <Button
              onClick={() => {
                setShowPopUp(true);
                setFocusField("");
              }}
            >
              <FilterIcon /> Filters
            </Button>
          </FilterButtonWrapper>
        </Container>
      )}
    </>
  );
}
