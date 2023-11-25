import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Header from "../../components/header/header";
import ProductCard from "../../components/productCard/productCard";
import { getPropertiesByAgentId } from "../../contexts/properties/propertiesActions";
import { paginate, getTotalPagesSize } from "../../utils/paginate";
import Paginate from "../../components/paginate/paginate";
import Footer from "../../components/footer/footer";

const Container = styled.div``;
const Wrapper = styled.div`
  margin-top: 6rem;
  width: 80%;
  margin: auto;
  text-align: center;
`;
const Heading = styled.h1`
  font-size: 3.4rem;
  letter-spacing: 1px;
  color: ${(props) => props.theme.color.grayDark};
  text-align: center;
  margin-bottom: 1rem;
  margin-top: 1rem;
  @media (max-width: 500px) {
    font-size: 2.4rem;
  }
`;

const SubHeading = styled.h2`
  font-size: 2.4rem;
  letter-spacing: 1px;
  color: ${(props) => props.theme.color.grayDark};
  text-align: center;
  margin-bottom: 1rem;
  margin-top: 1rem;
  @media (max-width: 500px) {
    font-size: 2rem;
  }
`;

const TirtiaryHeading = styled.h3`
  font-size: 2rem;
  font-weight: bold;
  color: var(--grayDark);
`;

const Pan = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 25rem));
  gap: 2rem;
  justify-content: center;
`;

export const PaginateWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
`;

export default function AgentProfile() {
  let { id } = useParams();
  let [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  let [pageItemsSize] = useState(8);
  const [pageCurrentRent, setPageCurrentRent] = useState(1);
  const [pageCurrentSale, setPageCurrentSale] = useState(1);

  const parentRefSale = useRef();
  const parentRefRent = useRef();
  useEffect(() => {
    async function fetchProperties() {
      try {
        let { data } = await getPropertiesByAgentId(id);
        setProperties(data.data.data);
        setLoading(false);
        setError("");
      } catch (e) {
        setError("Something went wrong while fetching your properties");
        setLoading(false);
      }
    }
    fetchProperties();
  }, [id]);
  return (
    <Container>
      <Header />
      <Wrapper>
        <Heading>Agent Profile</Heading>
        <SubHeading>You have listed {properties.length} properties</SubHeading>
        <TirtiaryHeading>Properties For Sale : </TirtiaryHeading>
        <Pan ref={parentRefSale}>
          {paginate(
            pageCurrentSale,
            pageItemsSize,
            filterByProperty("forSale", properties)
          ).map((p, i) => (
            <ProductCard agent key={i} product={p} />
          ))}
        </Pan>
        <PaginateWrapper>
          <Paginate
            total={getTotalPagesSize(
              pageItemsSize,
              filterByProperty("forSale", properties).length
            )}
            currentPage={pageCurrentSale}
            setPage={setPageCurrentSale}
            parentRef={parentRefSale}
          />
        </PaginateWrapper>
        <TirtiaryHeading>Properties For Rent : </TirtiaryHeading>
        <Pan ref={parentRefRent}>
          {paginate(
            pageCurrentRent,
            pageItemsSize,
            filterByProperty("forRent", properties)
          ).map((p, i) => (
            <ProductCard agent key={i} product={p} />
          ))}
        </Pan>
        <PaginateWrapper>
          <Paginate
            total={getTotalPagesSize(
              pageItemsSize,
              filterByProperty("forRent", properties).length
            )}
            currentPage={pageCurrentRent}
            setPage={setPageCurrentRent}
            parentRef={parentRefRent}
          />
        </PaginateWrapper>
      </Wrapper>
      <Footer />
    </Container>
  );
}

function filterByProperty(property, properties) {
  return properties.filter((p) => p[property] === true);
}
