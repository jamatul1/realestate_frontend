import Footer from "../../components/footer/footer";
import Header from "../../components/header/header";
import PropertySearch from "../../components/propertySearch/propertySearch";
import ShowCase from "../../components/showcase/showCase";
import { Container, Heading, ShowCaseWrapper } from "./styledHome";

export default function Home({ isBuy = true }) {
  return (
    <Container>
      <Header />
      <ShowCaseWrapper>
        <ShowCase style={{ marginTop: "2rem" }}>
          <Heading style={{ marginBottom: "2rem" }}>
            Properties to call home
          </Heading>
          <PropertySearch isBuy={isBuy} />
        </ShowCase>
      </ShowCaseWrapper>
      <Footer />
    </Container>
  );
}
