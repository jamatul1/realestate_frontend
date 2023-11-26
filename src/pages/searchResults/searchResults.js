import { useEffect, useState, useRef } from "react";
import Header from "../../components/header/header";
import ProductCard from "../../components/productCard/productCard";
import {
  Container,
  Pan,
  Frame,
  Heading,
  ProductsWrapper,
  NotFoundImage,
  SortWrapper,
  PaginateWrapper,
} from "./styledSearchResults";
import PropertyFilter from "../../components/propertyFilter/propertyFilter";
import { getTotalPagesSize, paginate } from "../../utils/paginate";
import Paginate from "../../components/paginate/paginate";
import { getFilteredArray } from "../../utils/filter";
import Sort from "../../components/sort/sort";
import sortItems from "../../utils/sort";
import MoonLoader from "react-spinners/MoonLoader";
import { useProperty } from "../../contexts/properties/propertiesContext";
import notFoundImgUrl from "../../assets/images/notfound.jpg";
import Footer from "../../components/footer/footer";
import {
  formateFilterSetting,
  shouldViewFilterData,
} from "../allProperties/allProperties";
export default function SearchResults() {
  let [properties, setProperties] = useState([]);
  let [place, setPlace] = useState("");
  let [loading, setLoading] = useState(true);
  let [currentPage, setCurrentPage] = useState(1);
  let [pageItemsSize] = useState(6);
  let [filterProp, setFilterProp] = useState({ propertyTypes: "all" });
  let [sortProp, setSortProp] = useState({ field: "", order: "asc" });

  // For the animation of the changed page after clicked on the pagination button
  let productsRef = useRef();
  let proccessedProperties = paginate(
    currentPage,
    pageItemsSize,
    sortItems(
      sortProp.field,
      sortProp.order,
      getFilteredArray(properties, filterProp)
    )
  );
  const { searchResults, resultsPlace } = useProperty();
  useEffect(() => {
    setProperties(searchResults);
    setPlace(resultsPlace);
    setLoading(false);
  }, []);
  return (
    <Container>
      <Header />
      {searchResults.length > 1 && (
        <PropertyFilter filterProp={filterProp} setFilterProp={setFilterProp} />
      )}
      {loading && (
        <Pan>
          <MoonLoader loading={loading} color="red" size={40} />
        </Pan>
      )}
      {properties.length > 0 && (
        <Frame>
          <Heading>
            Total {properties.length} Properites are available around ,{place}{" "}
            <br></br>
            {shouldViewFilterData(filterProp) && (
              <span style={{ fontSize: "16px" }}>
                Filter Setting - {formateFilterSetting(filterProp)}
              </span>
            )}
          </Heading>
          {proccessedProperties.length > 1 && (
            <SortWrapper>
              <Sort setSortProp={setSortProp} />
            </SortWrapper>
          )}
          {proccessedProperties.length > 0 && (
            <ProductsWrapper ref={productsRef}>
              {proccessedProperties.map((p, i) => (
                <ProductCard key={i} product={p} />
              ))}
            </ProductsWrapper>
          )}
        </Frame>
      )}
      {proccessedProperties.length === 0 && properties.length > 0 && (
        <Pan>
          <Heading style={{ width: "60%", margin: "0 auto 0 auto" }}>
            There is no properties for this filter!
          </Heading>
        </Pan>
      )}
      {properties.length === 0 && (
        <Pan>
          <Heading style={{ width: "60%", margin: "15rem auto 0 auto" }}>
            No properties found around area, {place}
          </Heading>
          <NotFoundImage src={notFoundImgUrl} alt="not found" />
        </Pan>
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
