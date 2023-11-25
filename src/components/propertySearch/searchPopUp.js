import { useCallback, useState } from "react";
import styled from "styled-components";
import searchUrl from "../../assets/icons/search.png";
import { callAutoComplete } from "../../contexts/properties/propertiesActions";
import mapIconUrl from "../../assets/icons/map.png";
import { throttle } from "throttle-debounce";
import { useMediaQuery } from "react-responsive";
import backIconUrl from "../../assets/icons/back.png";

const BluryBackground = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: var(--blur);
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  @media (max-width: 500px) {
    display: none;
  }
`;
const Container = styled.div`
  background: #fff;
  z-index: 2000;
  position: absolute;
  width: 60%;
  padding: 1rem;
  border-radius: 1rem;
  top: 21rem;
  @media (max-width: 500px) {
    height: 100vh;
    width: 100vw;
    top: 0;
    left: 0;
    border-radius: 0;
  }
`;
const Top = styled.div`
  padding: 1rem;
  border-bottom: 0.1rem solid ${(props) => props.theme.color.whiteDark};
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 2rem;
`;
const InputWrapper = styled.div`
  flex: 5;
  display: flex;
  align-items: center;
  img {
    position: absolute;
    top: 4.800000000000001rem;
    left: 3rem;
  }
`;
const Input = styled.input`
  height: 3.5rem;
  width: 80%;
  border: none;
  padding: 0.5rem 2rem;
  padding-left: 4rem;
  border-radius: 2rem;
  color: ${(props) => props.theme.color.grayDark};
  &:active,
  &:focus {
    outline: none;
    border: none;
  }
`;
const Icon = styled.img``;
const DoneButton = styled.button`
  padding: 1rem 2rem;
  border: none;
  color: ${(props) => props.theme.color.white};
  background-color: ${(props) => props.theme.color.grayDark};
  border-radius: 2rem;
  cursor: pointer;
`;
const SuggestionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
const Suggestion = styled.div`
  cursor: pointer;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 0.5rem;
  padding: 1rem;
  width: 100%;
  img {
    height: 2rem;
    width: 2rem;
    margin-top: 0.5rem;
    margin-right: 0.5rem;
  }
  border-bottom: 1px solid ${(props) => props.theme.color.whiteDark};
`;
const TextWrapper = styled.div``;
const Text = styled.p`
  color: var(--grayDark);
  font-weight: ${(props) => (props.bold ? "bold" : "normal")};
`;
const BackButton = styled.button`
  border: none;
  cursor: pointer;
  position: absolute;
  top: 2rem;
  left: 2rem;
  color: #999;
  font-size: 16px;
  font-weight: 700;
  background: transparent;
  img {
    height: 2rem;
  }
`;

export default function SearchPopUp({ setSearchData, setShowPopUp }) {
  let [suggestions, setSuggestions] = useState([]);
  const [text, setText] = useState("");

  const isMobile = useMediaQuery({
    query: "(max-width: 500px)",
  });
  let throttleSuggestions = useCallback(
    throttle(2, async function fetchAutoComplete(text) {
      let { data } = await callAutoComplete(text);
      setSuggestions(data.results);
    }),
    []
  );
  const onChangeInput = (e) => {
    setText(e.target.value);
    throttleSuggestions(e.target.value);
  };
  return (
    <>
      <Container>
        {isMobile && (
          <BackButton onClick={() => setShowPopUp(false)}>
            {/* <Icon src={backIconUrl} alt="back-icon"></Icon> */}
            &#10005;
          </BackButton>
        )}
        <Top>
          <InputWrapper>
            <Icon src={searchUrl} alt="search-icon" />
            <Input
              type="text"
              value={text}
              onChange={onChangeInput}
              placeholder="Name of the location ... "
            ></Input>
          </InputWrapper>
          <DoneButton
            onClick={() => {
              setShowPopUp(false);
            }}
          >
            Done
          </DoneButton>
        </Top>
        <SuggestionsWrapper>
          {suggestions.length > 0 &&
            suggestions.map((s, i) => (
              <Suggestion
                onClick={() => {
                  setSearchData(s);
                  setShowPopUp(false);
                }}
                key={i}
              >
                <Icon src={mapIconUrl} alt="map-icon" />
                <TextWrapper>
                  <Text>{s.address_line1}</Text>
                  <Text bold>{s.address_line2}</Text>
                </TextWrapper>
              </Suggestion>
            ))}
        </SuggestionsWrapper>
      </Container>
      <BluryBackground
        onClick={() => {
          setShowPopUp(false);
        }}
      />
    </>
  );
}
