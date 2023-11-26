import { useEffect, useRef, useState } from "react";
import Header from "../../components/header/header";
import ProductCard from "../../components/productCard/productCard";
import { getAllProperties } from "../../contexts/properties/propertiesActions";
import {
  Container,
  Pan,
  Frame,
  Heading,
  ProductsWrapper,
  SortWrapper,
  PaginateWrapper,
} from "./styledAllProperties";
import MoonLoader from "react-spinners/MoonLoader";
import { ErrorMessage } from "../signin/styledSignIn";
import Footer from "../../components/footer/footer";
import PropertyFilter from "../../components/propertyFilter/propertyFilter";
import { getTotalPagesSize, paginate } from "../../utils/paginate";
import Paginate from "../../components/paginate/paginate";
import { getFilteredArray } from "../../utils/filter";
import Sort from "../../components/sort/sort";
import sortItems from "../../utils/sort";
export default function AllProperties({
  title = "Explore all our Properties",
  sorted = "createdAt",
}) {
  let [properties, setProperties] = useState([]);
  let [loading, setLoading] = useState(true);
  let [error, setError] = useState("");
  let [currentPage, setCurrentPage] = useState(1);
  let [pageItemsSize, setPageItemsSize] = useState(8);
  let [filterProp, setFilterProp] = useState({
    propertyTypes: "all",
  });
  let [sortProp, setSortProp] = useState({ field: "", order: "asc" });
  let productsRef = useRef();
  useEffect(() => {
    async function fetchProperties() {
      try {
        let { data } = await getAllProperties(sorted);
        setProperties(data.data.data);
        setLoading(false);
        setError("");
      } catch (e) {
        setLoading(false);
        setError("Something went wrong! Please try again.");
      }
    }
    fetchProperties();
  }, []);
  let proccessedProperties = paginate(
    currentPage,
    pageItemsSize,
    sortItems(
      sortProp.field,
      sortProp.order,
      getFilteredArray(properties, filterProp)
    )
  );

  return (
    <Container>
      <Header />
      <PropertyFilter filterProp={filterProp} setFilterProp={setFilterProp} />
      {(error || loading) && (
        <Pan>
          <MoonLoader loading={loading} color="red" size={40} />
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </Pan>
      )}
      {properties.length === 0 && !loading && (
        <ErrorMessage style={{ marginTop: 400 }}>
          There is no property!
        </ErrorMessage>
      )}

      {properties.length && (
        <Frame ref={productsRef}>
          <Heading>
            {title}{" "}
            {shouldViewFilterData(filterProp) && (
              <span> Filter Setting - {formateFilterSetting(filterProp)}</span>
            )}
          </Heading>
          {proccessedProperties.length > 1 && (
            <SortWrapper>
              <Sort setSortProp={setSortProp} />
            </SortWrapper>
          )}
          {properties.length > 0 && (
            <ProductsWrapper>
              {proccessedProperties.map((p, i) => (
                <ProductCard key={i} product={p} />
              ))}
            </ProductsWrapper>
          )}
          {properties.length > 0 &&
            !loading &&
            proccessedProperties.length === 0 && (
              <ErrorMessage style={{ marginTop: 0 }}>
                There is no property for this filter!
              </ErrorMessage>
            )}
        </Frame>
      )}

      <PaginateWrapper>
        <Paginate
          total={getTotalPagesSize(
            pageItemsSize,
            getFilteredArray(properties, filterProp).length
          )}
          currentPage={currentPage}
          setPage={setCurrentPage}
          parentRef={productsRef}
        />
      </PaginateWrapper>
      <Footer />
    </Container>
  );
}
export function shouldViewFilterData(filterProp) {
  let keys = Object.keys(filterProp);
  if (
    keys.length === 1 &&
    keys[0] === "propertyTypes" &&
    filterProp[keys[0]] === "all"
  )
    return false;
  return true;
}

export function formateFilterSetting(propObj) {
  let formatString = "";
  for (let [key, value] of Object.entries(propObj)) {
    if (key === "propertyTypes") {
      formatString += "Property Types : ";
      let values = value
        .split(",")
        .map((val) => val[0].toUpperCase() + val.slice(1));
      values = values.join(" ");
      formatString += values;
    } else {
      formatString += key[0].toUpperCase() + key.slice(1) + ": ";
      formatString +=
        "Minimum - " + value?.min + " and " + "Maximum - " + value?.max;
    }
    formatString += ", ";
  }
  return formatString;
}
