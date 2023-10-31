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

  const { searchResults, resultsPlace } = useProperty();
  useEffect(() => {
    setProperties(searchResults);
    setPlace(resultsPlace);
    setLoading(false);
  }, []);
  return (
    <Container>
      <Header />
      <PropertyFilter filterProp={filterProp} setFilterProp={setFilterProp} />
      {loading && (
        <Pan>
          <MoonLoader loading={loading} color="red" size={40} />
        </Pan>
      )}
      {properties.length > 0 && (
        <Frame>
          <Heading>
            Total {properties.length} Properites are Available in {place}
          </Heading>
          <SortWrapper>
            <Sort setSortProp={setSortProp} />
          </SortWrapper>
          {properties.length > 0 && (
            <ProductsWrapper ref={productsRef}>
              {paginate(
                currentPage,
                pageItemsSize,
                sortItems(
                  sortProp.field,
                  sortProp.order,
                  getFilteredArray(properties, filterProp)
                )
              ).map((p, i) => (
                <ProductCard key={i} product={p} />
              ))}
            </ProductsWrapper>
          )}
        </Frame>
      )}
      {properties.length === 0 && (
        <Pan>
          <Heading style={{ width: "60%", margin: "0 auto" }}>
            No properties found in area, {place}
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
