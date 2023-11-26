import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MoonLoader from "react-spinners/MoonLoader";
import styled from "styled-components";
import { ErrorMessage } from "../signin/styledSignIn";
import { getSingleProperty } from "../../contexts/properties/propertiesActions";
import Header from "../../components/header/header";
import { url } from "../../config/url";
import bedUrl from "../../assets/icons/bed.png";
import squareUrl from "../../assets/icons/square.png";
import { PropertyMap } from "../../components/propertyMap/propertyMap";
import ImageGallery from "../../components/imageGallery/imageGallery";
import AgentCard from "../../components/agentCard/agentCard";
import featureIconUrl from "../../assets/icons/feature.png";
import Footer from "../../components/footer/footer";
import { useUser } from "../../contexts/user/userContext";
import editIconPath from "../../assets/icons/edit.png";

const Container = styled.div`
  width: 100%;
`;
const Pan = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
`;
const HeadingPrimary = styled.h1`
  font-size: 3.6rem;
  line-height: 1.2;
  color: var(--grayDark);
  margin-bottom: 2rem;
  @media (max-width: 800px) {
    font-size: 3rem;
    margin-bottom: 1rem;
  }
`;
const HeadingSecondary = styled.h2`
  font-size: 2.4rem;
  line-height: 1.2;
  color: var(--grayDark);
`;
const SectionTop = styled.section`
  margin: auto;
  margin-top: 8rem;
  display: flex;
  max-width: 80vw;
  height: 83vh;
  padding-top: 4rem;
  background: #fff;
  @media (max-width: 1105px) {
    flex-direction: column;
    align-items: center;
    padding-top: 0;
  }
  @media (max-width: 800px) {
    max-width: 92%;
  }
`;
const TopLeft = styled.div`
  flex: 1.5;
  width: 40vw;
  padding: 5rem 0;
  @media (max-width: 1105px) {
    width: 100%;
    padding: 3rem 0;
  }
  @media (max-width: 705px) {
    width: 100%;
    padding: 1rem 0;
  }
`;
const TopRight = styled.div`
  flex: 1;
  max-wdith: 50vw;
  display: flex;
  flex-direction: column;
  padding-top: 3rem;
  @media (max-width: 1105px) {
    padding-top: 0;
    width: 100%;
  }
`;
const ImageWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  grid-gap: 0.5rem;
  @media (max-width: 1105px) {
    display: none;
  }
`;

const LargeImg = styled.img`
  cursor: pointer;
  width: 50vw;
  height: 45vh;
  object-fit: cover;
  margin-bottom: 0.5rem;
  @media (max-width: 1105px) {
    width: 100%;
  }
`;
const Image = styled.img`
  width: 100%;
  object-fit: cover;
  cursor: pointer;
  height: 45vh;
`;
const ImageBox = styled.div`
  cursor: pointer;
  position: relative;
  img {
    filter: brightness(0.7);
  }
`;
const ImageText = styled.h5`
  font-size: 7.4rem;
  color: #fff;
  font-weight: 500;
  line-height: 1.2;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
`;
const SmallBoxWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;
const SmallBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
`;
const Icon = styled.img`
  height: 2rem;
  width: 2rem;
  margin-right: 0.5rem;
`;
const Text = styled.p`
  color: var(--grayDark);
`;
const GrayText = styled.p`
  color: var(--gray);
  font-weight: 500;
  text-transform: uppercase;
`;

const SectionContent = styled.section`
  padding: 5rem 13rem;
  display: grid;
  grid-template-columns: 2fr 1fr;
  background: white;
  grid-gap: 2rem;
  @media (max-width: 1105px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  @media (max-width: 800px) {
    margin-top: 5rem;
  }
`;
const MapWrapper = styled.div`
  grid: 1/2;
  @media (max-width: 1105px) {
    grid: 1/3;
  }
`;
const AgentWrapper = styled.div`
  grid: 2/3;
  position: sticky;
  top: 300px;
  left: 50px;
`;

export const SectionDescription = styled.section`
  padding: 3rem 25rem;
  background: #fff;

  p {
    margin: 1rem 0;
  }
  @media (max-width: 1000px) {
    padding: 2rem 20rem;
  }
  @media (max-width: 850px) {
    padding: 2rem 17rem;
  }
  @media (max-width: 850px) {
    padding: 2rem 10rem;
  }
  @media (max-width: 550px) {
    padding: 0rem 4rem;
  }
`;
export const DescriptionWrapper = styled.div`
  width: 60%;
  border-top: 1px solid ${(props) => props.theme.color.whiteDark};
  border-bottom: 1px solid ${(props) => props.theme.color.whiteDark};
  padding-top: 2rem;
  padding-bottom: 2rem;
  @media (max-width: 1400px) {
    width: 80%;
  }
  @media (max-width: 1100px) {
    width: 90%;
  }
  @media (max-width: 1000px) {
    width: 100%;
  }
`;
const SectionFeatures = styled.section`
  padding: 1rem 25rem;
  background: #fff;

  p {
    margin: 1rem 0;
  }
  @media (max-width: 1000px) {
    padding: 2rem 20rem;
  }
  @media (max-width: 850px) {
    padding: 2rem 17rem;
  }
  @media (max-width: 850px) {
    padding: 2rem 10rem;
  }
  @media (max-width: 550px) {
    padding: 2rem 4rem;
  }
`;
const FeaturesWrapper = styled.div`
  width: 60%;
  border-bottom: 1px solid ${(props) => props.theme.color.whiteDark};
  padding-bottom: 2rem;
  @media (max-width: 1400px) {
    width: 80%;
  }
  @media (max-width: 1100px) {
    width: 90%;
  }
  @media (max-width: 1000px) {
    width: 100%;
  }
`;

const Feature = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;
const FeatureIcon = styled.img`
  width: 3rem;
  height: 3rem;
`;

const EditButton = styled.button`
  position: absolute;
  top: 10rem;
  right: 6.3rem;
  cursor: pointer;
  border: none;
  img {
    height: 3rem;
    width: 3rem;
  }
`;
export default function PropertyDetails() {
  let { propertyId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [property, setProperty] = useState(null);
  const [showImgPreview, setShowImgPreview] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);
  const [canEdit, setCanEdit] = useState(false);
  const navigateTo = useNavigate();
  let { user } = useUser();
  useEffect(() => {
    async function fetchProperty() {
      try {
        const { data } = await getSingleProperty(propertyId);
        setProperty(data.data.data);
        setLoading(false);
        setError("");
        if (user?._id === data.data.data.owner?._id) {
          setCanEdit(true);
        }
        return;
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError("Something went wrong on loading property. Please try again.");
      }
    }
    fetchProperty();
  }, [propertyId]);

  return (
    <Container>
      <Header />
      {canEdit && (
        <EditButton
          onClick={() => {
            navigateTo("/properties/update/" + propertyId);
          }}
        >
          <img src={editIconPath} alt="edit"></img>
        </EditButton>
      )}
      {(loading || error) && (
        <Pan>
          <MoonLoader loading={loading} size={40} color="red" />
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </Pan>
      )}
      {property && (
        <>
          <SectionTop>
            {!showImgPreview && (
              <>
                <TopLeft>
                  <HeadingPrimary>{property.name}</HeadingPrimary>
                  <SmallBoxWrapper>
                    <SmallBox>
                      <Icon src={bedUrl} alt="bed-icon" />
                      <Text>{property.beds}</Text>
                    </SmallBox>
                    <SmallBox>
                      <Icon src={squareUrl} alt="square-icon" />
                      <Text>{property.area}</Text>
                    </SmallBox>
                    <Text>Type: {property.type}</Text>
                  </SmallBoxWrapper>
                  <HeadingSecondary style={{ marginTop: "5rem" }}>
                    {new Intl.NumberFormat("hi-IN", {
                      style: "currency",
                      currency: "BDT",
                    }).format(property.price)}{" "}
                  </HeadingSecondary>
                </TopLeft>
                <TopRight>
                  {property.images.length > 0 && (
                    <LargeImg
                      onClick={() => {
                        setShowImgPreview(true);
                        setImgIndex(0);
                      }}
                      src={property.images[0]}
                      alt="PropertyImage"
                    />
                  )}
                  <ImageWrapper>
                    {property?.images[1] && (
                      <Image
                        onClick={() => {
                          setShowImgPreview(true);
                          setImgIndex(1);
                        }}
                        src={property.images[1]}
                        alt="PropertyImage"
                      />
                    )}
                    {property?.images[2] && (
                      <Image
                        onClick={() => {
                          setShowImgPreview(true);
                          setImgIndex(2);
                        }}
                        src={property.images[2]}
                        alt="PropertyImage"
                      />
                    )}
                    {property?.images[3] && (
                      <ImageBox
                        onClick={() => {
                          setShowImgPreview(true);
                          setImgIndex(3);
                        }}
                      >
                        {property.images.length > 4 && (
                          <ImageText>{property.images.length - 4}+</ImageText>
                        )}

                        <Image src={property.images[3]} alt="PropertyImage" />
                      </ImageBox>
                    )}
                  </ImageWrapper>
                </TopRight>
              </>
            )}
            {showImgPreview && (
              <ImageGallery
                start={imgIndex}
                images={property.images}
                setShowImgPreview={setShowImgPreview}
              />
            )}
          </SectionTop>
          <SectionContent>
            <MapWrapper>
              <PropertyMap
                height={400}
                zoom={12}
                long={property.location.coordinates[0]}
                lat={property.location.coordinates[1]}
              />
            </MapWrapper>
            <AgentWrapper>
              <AgentCard agent={property.owner} />
            </AgentWrapper>
          </SectionContent>
          <SectionDescription>
            <DescriptionWrapper>
              <HeadingSecondary>{property.slogan}</HeadingSecondary>
              <GrayText>{property.location.address}</GrayText>
              <Text>{property.description}</Text>
            </DescriptionWrapper>
          </SectionDescription>
          {property.features.length > 0 && (
            <SectionFeatures>
              <FeaturesWrapper>
                <HeadingSecondary style={{ marginBottom: "1rem" }}>
                  Features
                </HeadingSecondary>
                {property.features.map((f, i) => (
                  <Feature key={i}>
                    <FeatureIcon src={featureIconUrl} alt="feature-icon" />
                    <Text>{f}</Text>
                  </Feature>
                ))}
              </FeaturesWrapper>
            </SectionFeatures>
          )}
        </>
      )}
      <Footer />
    </Container>
  );
}
