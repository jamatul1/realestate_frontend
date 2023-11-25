import { useDebugValue, useEffect, useMemo, useRef, useState } from "react";
import useInput from "../../hooks/useInput";
import styled from "styled-components";
import { filter, max, min, valuesIn } from "lodash";
const Overlay = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: var(--blur);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 3000;
`;
const Wrapper = styled.div`
  font-size: 1.8rem;
  padding: 3rem 4rem 4rem 4rem;
  border-radius: 2rem;
  position: absolute;
  width: 40%;
  // height: 75vh;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  z-index: 4000;
  @media (max-width: 1300px) {
    top: 2rem;
    width: 55%;
    transform: translate(-50%, 0);
  }
  @media (max-width: 1000px) {
    width: 70%;
  }
  @media (max-width: 800px) {
    width: 90%;
    font-size: 1.6rem;
  }
  @media (max-width: 630px) {
    width: 100%;
  }
  @media (max-width: 500px) {
    top: 2.5rem;
    width: 100%;
    font-size: 1.6rem;
    transform: translate(-50%, 0);
  }
  @media (max-width: 480px) {
    padding: 2rem;
    top: 2.5rem;
    left: 50%;
    transform: translate(-50%, 0);
  }
`;
const Heading = styled.h1`
  font-size: 2.4rem;
  color: var(--grayDark);
  text-align: center;
  padding-bottom: 0 0.5rem 0.5rem 0.5rem;
  margin: 0;
  border-bottom: 1px solid ${(props) => props.theme.color.whiteDark};
`;
const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const InputLabel = styled.label`
  font-size: 2rem;
  font-weight: bold;
  color: var(--grayDark);
  margin: 1rem 0;
  cursor: pointer;
`;
const CheckBox = styled.input`
  margin-right: 0.5rem;
  cursor: pointer;
`;
const Select = styled.select`
  padding: 1.5rem 2rem;
  border: 1px solid var(--grayDark);
  border-radius: 2rem;
  color: var(--grayDark);
  @media (max-width: 630px) {
    padding: 1rem 0.5rem;
  }
`;
const Option = styled.option``;
const Input = styled.input`
cursor: pointer;
  border: none;
  border: 1px solid var(--grayDark);
  font-size: 1.6rem;
  color:var(--grayDark);
  padding: 1.5rem 2rem;
  border-radius: 2rem;
  flex:1;
  &:active,&:focus {
    outline:2px solid var(--blue);
    border:none;
  }
  @media (min-width: 700) {
    padding 1rem .7rem;
  }
  @media (max-width: 630px) {
    padding: 1rem 0.5rem;
  }
  @media (max-width: 500px) {
    padding: 1rem 0.5rem;
  }`;

const InputWrapper = styled.div`
  display: flex;
  ${(props) => (props.column ? "flex-direction:column" : "")};
  gap: 1rem;
  flex: 1;
  @media (max-width: 480px) {
    flex-direction: column;
    ${(props) => (props.radio ? "flex-direction:row" : "")}
  }
`;
const SmallLabel = styled.label`
  color: var(--grayDark);
  margin-right: 1rem;
  cursor: pointer;
`;
const CrossButton = styled.button`
  border: none;
  background-color: transparent;
  color: var(--gray);
  font-size: 1.6rem;
  font-weight: 800;
  position: absolute;
  top: 2rem;
  right: 3rem;
  cursor: pointer;
  z-index: 3100;
  @media (max-width: 480px) {
    right: 1.5rem;
    font-size: 1.4rem;
  }
`;

let scrollOptions = {
  block: "center",
  inline: "nearest",
  behaviour: "smooth",
};

export default function FilterPopUp({
  filterProp,
  setFilterProp,
  setShowPopUp,
  focusField,
}) {
  const [propertyTypes, setPropertyTypes] = useState(
    filterProp.propertyTypes.split(",")
  );

  let minPrice = useInput(filterProp.price?.min);
  let maxPrice = useInput(filterProp.price?.max);

  let minBeds = useInput(filterProp.beds?.min);
  let maxBeds = useInput(filterProp.beds?.max);

  const priceRef = useRef();
  const bedsRef = useRef();

  const allTypeRef = useRef();
  const houseTypeRef = useRef();
  const villaTypeRef = useRef();
  const apartmentTypeRef = useRef();
  const landTypeRef = useRef();

  useEffect(() => {
    //focusing the selected field
    if (focusField === "price") {
      priceRef.current.focus();
      priceRef.current.scrollIntoView(scrollOptions);
    } else if (focusField === "beds") {
      bedsRef.current.focus();
      bedsRef.current.scrollIntoView(scrollOptions);
    } else {
      return;
    }
    return () => {};
  }, []);

  // For keep tracking the state of the checkbox
  useEffect(() => {
    if (filterProp.propertyTypes && filterProp.propertyTypes.length > 0) {
      for (let i of filterProp.propertyTypes.split(",")) {
        if (i === "all") {
          allTypeRef.current.checked = true;
        } else if (i === "house") {
          houseTypeRef.current.checked = true;
        } else if (i === "apartment") {
          apartmentTypeRef.current.checked = true;
        } else if (i === "villa") {
          villaTypeRef.current.checked = true;
        }
      }
    }
  }, []);

  const handleFilter = (e) => {
    e.preventDefault();
    let query = {};
    if (propertyTypes.length > 0) {
      query.propertyTypes = propertyTypes.join(",");
    } else {
      query.propertyTypes = "all";
    }
    if (minPrice.value && maxPrice.value) {
      query.price = {};
      query.price.min = minPrice.value;
      query.price.max = maxPrice.value;
    }

    if (minBeds.value && maxBeds.value) {
      query.beds = {};
      query.beds.min = minBeds.value;
      query.beds.max = maxBeds.value;
    }
    setFilterProp(query);
    setShowPopUp(false);
  };
  const onChangeCheckbox = (e) => {
    if (e.target.checked) {
      let types = [...propertyTypes];
      types.push(e.target.value);
      setPropertyTypes(types);
    } else {
      //getting types except unchecked one
      let filteredTypes = propertyTypes.filter((t) => t !== e.target.value);
      setPropertyTypes(filteredTypes);
    }
  };
  return (
    <>
      <Overlay onClick={handleFilter} />
      <Wrapper>
        <CrossButton onClick={handleFilter}>╳</CrossButton>
        <Heading>Filters</Heading>
        <FormWrapper>
          <InputLabel>Property type</InputLabel>
          <InputWrapper column>
            <InputWrapper radio>
              <CheckBox
                type="checkbox"
                id="all"
                value="all"
                onChange={onChangeCheckbox}
                ref={allTypeRef}
              />
              <SmallLabel htmlFor="all">All types</SmallLabel>
            </InputWrapper>
            <InputWrapper radio>
              <CheckBox
                type="checkbox"
                id="house"
                value="house"
                ref={houseTypeRef}
                onChange={onChangeCheckbox}
              />
              <SmallLabel htmlFor="house">House</SmallLabel>
            </InputWrapper>
            <InputWrapper radio>
              <CheckBox
                type="checkbox"
                id="apartment"
                value="apartment"
                ref={apartmentTypeRef}
                onChange={onChangeCheckbox}
              />
              <SmallLabel htmlFor="apartment">Apartment</SmallLabel>
            </InputWrapper>
            <InputWrapper radio>
              <CheckBox
                id="land"
                type="checkbox"
                value="land"
                ref={landTypeRef}
                onChange={onChangeCheckbox}
              />
              <SmallLabel htmlFor="land">Land</SmallLabel>
            </InputWrapper>
            <InputWrapper radio>
              <CheckBox
                id="villa"
                type="checkbox"
                value="villa"
                ref={villaTypeRef}
                onChange={onChangeCheckbox}
              />
              <SmallLabel htmlFor="villa">Villa</SmallLabel>
            </InputWrapper>
          </InputWrapper>
          <InputLabel>Price</InputLabel>
          <InputWrapper>
            <InputWrapper column>
              <SmallLabel htmlFor="minPrice">Min</SmallLabel>
              <Input
                id="minPrice"
                ref={priceRef}
                type={"number"}
                {...minPrice}
                placeholder="any"
              />
            </InputWrapper>
            <InputWrapper column>
              <SmallLabel htmlFor="maxPrice">Max</SmallLabel>
              <Input
                id="maxPrice"
                type="number"
                placeholder="any"
                {...maxPrice}
              />
            </InputWrapper>
          </InputWrapper>
          <InputLabel>Bedrooms</InputLabel>
          <InputWrapper>
            <InputWrapper column>
              <SmallLabel htmlFor="minBeds">Min</SmallLabel>
              <Input
                id="minBeds"
                {...minBeds}
                ref={bedsRef}
                type="number"
                placeholder="any"
              ></Input>
            </InputWrapper>
            <InputWrapper column>
              <SmallLabel id="maxBeds">Max</SmallLabel>
              <Input
                id="maxBeds"
                placeholder="any"
                {...maxBeds}
                type="number"
              ></Input>
            </InputWrapper>
          </InputWrapper>
        </FormWrapper>
      </Wrapper>
    </>
  );
}
