import { createContext, useContext, useReducer } from "react";

const PropertyContext = createContext();

const PropertyReducer = (state, action) => {
  switch (action.type) {
    case "SEARCH":
      return {
        ...state,
        searchResults: action.payload.searchResults,
        resultsPlace: action.payload.resultsPlace,
      };
    case "REFRESH":
      return { ...state, searchResults: [] };
    default:
      return state;
  }
};

export const PropertyProvider = ({ children }) => {
  const initialState = {
    searchResults: [],
    resultsPlace: "",
  };

  const [state, dispatch] = useReducer(PropertyReducer, initialState);

  return (
    <PropertyContext.Provider
      value={{
        searchResults: state.searchResults,
        resultsPlace: state.resultsPlace,
        dispatch,
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
};

export const useProperty = () => useContext(PropertyContext);

export default PropertyContext;
