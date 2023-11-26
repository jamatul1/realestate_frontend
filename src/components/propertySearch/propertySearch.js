import React, { useEffect, useState } from "react";
import {
  Bottom,
  Top,
  Container,
  SearchButton,
  TopButton,
  BottomButton,
  Icon,
  Overlay,
} from "./styledPropertySearch";
import search from "../../assets/icons/search.png";
import SearchPopUp from "./searchPopUp";
import { searchPropertiesWithin } from "../../contexts/properties/propertiesActions";
import { useProperty } from "../../contexts/properties/propertiesContext";
import { useNavigate } from "react-router-dom";
import FadeLoader from "react-spinners/FadeLoader";
import { ErrorMessage } from "../../pages/signin/styledSignIn";

export default function PropertySearch({ isBuy = true }) {
  const [btnValue, setBtnValue] = useState("location of the properties...");
  const [buy, setBuy] = useState(false);
  const [rent, setRent] = useState(false);
  const [showPopUp, setShowPopUp] = useState(false);
  const [searchData, setSearchData] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { dispatch } = useProperty();
  const navigateTo = useNavigate();

  //refreshing the searchResults
  useEffect(() => {
    if (isBuy) {
      setBuy(true);
      setRent(false);
    } else {
      setBuy(false);
      setRent(true);
    }
    dispatch({ type: "REFRESH" });
  }, [isBuy]);
  useEffect(() => {
    if (searchData) {
      setBtnValue(searchData.address_line1);
    }
  }, [searchData]);

  const filterResults = (data) => {
    let filtered = data.filter((d) => {
      if (buy) return d.forSale === true;
      else return d.forRent === true;
    });
    return filtered;
  };

  const searchProperties = async (e) => {
    setLoading(true);
    if (!searchData) {
      setLoading(false);
      return;
    }
    try {
      const { data } = await searchPropertiesWithin(
        searchData.lat,
        searchData.lon
      );
      let filtered = filterResults(data.data.data);
      // adding this for recent autosuggestions
      let suggestions = JSON.parse(
        localStorage.getItem("real_state_autosuggestions")
          ? localStorage.getItem("real_state_autosuggestions")
          : "[]"
      );
      let index = suggestions.findIndex(
        (val, i) => val.lat === searchData.lat && val.lon === searchData.lon
      );
      if (index !== -1) suggestions.splice(index, 1);
      suggestions.push(searchData);
      if (suggestions.length > 5) localStorage.shift();
      localStorage.setItem(
        "real_state_autosuggestions",
        JSON.stringify(suggestions)
      );

      dispatch({
        type: "SEARCH",
        payload: {
          searchResults: filtered,
          resultsPlace: btnValue,
        },
      });
      setLoading(false);
      navigateTo("/property/search");
    } catch (error) {
      setLoading(false);
      setError("Failed to searching. Try again later.");
      setTimeout(() => setError(""), 3000);
    }
  };

  return (
    <Container>
      <Top>
        <TopButton
          onClick={() => {
            setBuy(true);
            setRent(false);
          }}
          active={buy ? true : false}
        >
          Buy
        </TopButton>
        <TopButton
          onClick={() => {
            setRent(true);
            setBuy(false);
          }}
          active={rent ? true : false}
        >
          Rent
        </TopButton>
      </Top>
      <Bottom>
        <BottomButton
          onClick={() => {
            setShowPopUp((value) => !value);
          }}
        >
          <Icon style={{ marginRight: ".5rem" }} alt="icon" src={search} />
          {btnValue}
        </BottomButton>
        <SearchButton onClick={searchProperties}>Search</SearchButton>
      </Bottom>
      {showPopUp && (
        <SearchPopUp
          setSearchData={setSearchData}
          setShowPopUp={setShowPopUp}
        />
      )}
      {loading && (
        <Overlay>
          <FadeLoader loading={loading} color={"white"} size={35}></FadeLoader>
        </Overlay>
      )}
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </Container>
  );
}
