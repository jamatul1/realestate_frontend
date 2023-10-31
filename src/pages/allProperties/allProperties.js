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
}) {
  let [properties, setProperties] = useState([]);
  let [loading, setLoading] = useState(true);
  let [error, setError] = useState("");
  let [currentPage, setCurrentPage] = useState(1);
  let [pageItemsSize, setPageItemsSize] = useState(6);
  let [filterProp, setFilterProp] = useState({ propertyTypes: "all" });
  let [sortProp, setSortProp] = useState({ field: "", order: "asc" });

  let productsRef = useRef();
  useEffect(() => {
    async function fetchProperties() {
      try {
        let { data } = await getAllProperties();
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
      {properties.length === 0 && <ErrorMessage style={{marginTop:400}}>There is no property!</ErrorMessage>}
     {properties.length &&  (
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
