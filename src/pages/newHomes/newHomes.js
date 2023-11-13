import { useEffect, useRef, useState } from "react";
import Header from "../../components/header/header";
import ProductCard from "../../components/productCard/productCard";
import { getRecentProperties } from "../../contexts/properties/propertiesActions";
import {
  Container,
  Pan,
  Frame,
  Heading,
  ProductsWrapper,
  SortWrapper,
  PaginateWrapper,
} from "./styledNewHomes";
import MoonLoader from "react-spinners/MoonLoader";
import { ErrorMessage } from "../signin/styledSignIn";
import Footer from "../../components/footer/footer";
import PropertyFilter from "../../components/propertyFilter/propertyFilter";
import { getTotalPagesSize, paginate } from "../../utils/paginate";
import Paginate from "../../components/paginate/paginate";
import { getFilteredArray } from "../../utils/filter";
import Sort from "../../components/sort/sort";
import sortItems from "../../utils/sort";
export default function NewHomes({ title = "Fresh Homes For You -" }) {
  let [properties, setProperties] = useState([]);
  let [loading, setLoading] = useState(true);
  let [error, setError] = useState("");
  let [currentPage, setCurrentPage] = useState(1);
  let [pageItemsSize, setPageItemsSize] = useState(6);
  let [filterProp, setFilterProp] = useState({ propertyTypes: "all" });
  let [sortProp, setSortProp] = useState({ field: "none", order: "asc" });

  // For the animation of the changed page after clicked on the pagination button
  let productsRef = useRef();
  useEffect(() => {
    async function fetchProperties() {
      try {
        let { data } = await getRecentProperties();
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
      (
      <Frame ref={productsRef}>
        <Heading>{title}</Heading>
        <SortWrapper>
          <Sort setSortProp={setSortProp} />
        </SortWrapper>
        {properties.length > 0 && (
          <ProductsWrapper>
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
      )
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
