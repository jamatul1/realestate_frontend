import React, { useState } from "react";
import Header from "../../components/header/header";
import FormInput from "../../components/input/input";

import {
  Container,
  Wrapper,
  Heading,
  Form,
  Button,
  InputLabel,
  InputWrapper,
  TextArea,
  Select,
  Option,
  Radio,
  UploadIcon,
  UploadInput,
  UploadLabel,
  Image,
  ImagePreview,
  ImageWrapper,
  CrossButton,
  SuccessMessage,
  Center,
  ContentWrapper,
} from "./styledAddProperty";
import gallaryUrl from "../../assets/icons/gallery.png";
import useInput from "../../hooks/useInput";
import { useUser } from "../../contexts/user/userContext";
import {
  addProperty,
  uploadPropertyImages,
} from "../../contexts/properties/propertiesActions";
import { ErrorMessage } from "../../pages/signin/styledSignIn";
import PropagateLoader from "react-spinners/PropagateLoader";
import { Link } from "react-router-dom";
import Footer from "../../components/footer/footer";

export default function AddProperty() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(false);

  const [images, setImages] = useState([]);
  const [imgFiles, setImgFiles] = useState([]);

  const name = useInput("");
  const slogan = useInput("");
  const description = useInput("");
  const price = useInput("");
  const beds = useInput("");
  const area = useInput("");
  const propertyType = useInput("apartment");
  const address = useInput("");
  const locDescription = useInput("");
  const longitute = useInput("");
  const latitute = useInput("");
  const sale = useInput("");
  const rent = useInput("");
  const feature_1 = useInput("");
  const feature_2 = useInput("");
  const feature_3 = useInput("");
  const feature_4 = useInput("");
  const feature_5 = useInput("");
  const feature_6 = useInput("");

  const { user } = useUser();
  let [propertyId, setPropertyId] = useState();

  const handleImages = (e) => {
    let files = Array.from(e.target.files);
    files.forEach((img) => {
      if (
        img.type !== "image/jpeg" &&
        img.type !== "image/png" &&
        img.type !== "image/webp" &&
        img.type !== "image/gif"
      ) {
        setError(
          `${img.name} format is unsupported ! only Jpeg, Png, Webp, Gif are allowed.`
        );
        setTimeout(() => {
          setError("");
        }, 3000);
        files = files.filter((item) => item.name !== img.name);
        return;
      } else if (img.size > 1024 * 1024 * 5) {
        setError(`${img.name} size is too large max 5mb allowed.`);
        files = files.filter((item) => item.name !== img.name);
        return;
      } else {
        const reader = new FileReader();
        reader.readAsDataURL(img);
        reader.onload = (readerEvent) => {
          setImages((images) => [...images, readerEvent.target.result]);
        };
        setImgFiles((imgFiles) => [...imgFiles, img]);
      }
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    let property = {};
    if (name.value) {
      property.name = name.value;
    } else {
      setError("Please enter the property name!");
      setLoading(false);
      return;
    }
    if (slogan.value) {
      property.slogan = slogan.value;
    }
    if (description.value) {
      property.description = description.value;
    } else {
      setError("Please enter the property description!");
      setLoading(false);
      return;
    }
    if (propertyType.value) {
      property.type = propertyType.value;
    } else {
      setError("Please enter the property type!");
      setLoading(false);
      return;
    }
    if (price.value) {
      property.price = price.value;
    } else {
      setError("Please enter the property price!");
      setLoading(false);
      return;
    }
    if (area.value) {
      property.area = area.value;
    } else {
      setError("Please enter the property area!");
      setLoading(false);
      return;
    }
    if (beds.value) {
      property.beds = beds.value;
    }
    // build the features
    let features = [];
    if (feature_1.value) {
      features.push(feature_1.value);
    }
    if (feature_2.value) {
      features.push(feature_2.value);
    }
    if (feature_3.value) {
      features.push(feature_3.value);
    }
    if (feature_4.value) {
      features.push(feature_4.value);
    }
    if (feature_5.value) {
      features.push(feature_5.value);
    }
    if (feature_6.value) {
      features.push(feature_6.value);
    }

    property.features = features;

    // build the location
    let location = { coordinates: [],type:'Point' };
    if (address.value) {
      location.address = address.value;
    } else {
      setError("Please provide the address of your property");
      setLoading(false);
      return;
    }
    if (locDescription.value) {
      location.description = locDescription.value;
    } else {
      setError(
        "Please provide the description of the location of your property"
      );
      setLoading(false);
      return;
    }
    if (longitute.value) {
      location.coordinates[0] = longitute.value;
    } else {
      setError("Please provide the longitute of the location of your property");
      setLoading(false);
    }
    if (latitute.value) {
      location.coordinates[1] = latitute.value;
    } else {
      setError("Please provide the latitude of your location");
      setLoading(false);
    }

    property.location = location;
    if (sale.value) {
      property.forSale = true;
    } else {
      property.forRent = true;
      property.forSale = false;
    }
    property.owner = user._id;
    try {
      let { data } = await addProperty(property);

      // formdata for imgs
      const formData = new FormData();
      Object.values(imgFiles).forEach((file) => {
        formData.append("images", file);
      });
      setPropertyId(data.data.data._id);
      await uploadPropertyImages(data.data.data._id, formData);
      setTimeout(() => {
        setLoading(false);
        setError("");
        setAdded(true);
      }, 3000);
    } catch (error) {
      setLoading(false);
      setError("Sorry something went wrong! please try again.");
      setTimeout(() => {
        setError("");
      }, 3000);
    }

    //let uploadResponse = await uploadPropertyImages()
    // console.log(uploadResponse);
  };

  const removeImage = (e) => {
    e.preventDefault();
    let newImgFiles = imgFiles.filter((file, index) => index !== +e.target.id);
    let newImages = images.filter((image, index) => index !== +e.target.id);
    setImgFiles(newImgFiles);
    setImages(newImages);
  };
  return (
    <Container>
      <Header />
      <Wrapper>
        <Heading>
          Please fill up the all the necessary details correctly.
        </Heading>
        <Form>
          <ContentWrapper>
            <InputWrapper>
              <InputLabel htmlFo="name">Name :</InputLabel>
              <FormInput id="name" {...name} type="text" placeholder="Name" />
            </InputWrapper>
            <InputWrapper>
              <InputLabel htmlFor="slogan">Slogan :</InputLabel>
              <FormInput
                {...slogan}
                id="slogan"
                type="text"
                placeholder="Property Slogan"
              />
            </InputWrapper>
            <InputWrapper>
              <TextArea {...description} placeholder="Description"></TextArea>
            </InputWrapper>
            <InputWrapper row>
              <FormInput {...price} type="number" placeholder="Price" />
              <FormInput {...beds} type="number" placeholder="Beds" />
              <FormInput {...area} type="number" placeholder="Area (sqrf)" />
            </InputWrapper>

            <InputWrapper row>
              <InputWrapper style={{ marginRight: "1rem" }}>
                <InputLabel style={{ marginRight: "1rem" }} htmlFor="property">
                  Property type :
                </InputLabel>
                <Select {...propertyType}>
                  <Option value="apartment">Apertment</Option>
                  <Option value="house">House</Option>
                  <Option value="villa">Villa</Option>
                  <Option value="land">Land</Option>
                </Select>
              </InputWrapper>
              <InputWrapper row>
                <InputLabel>For Sale : </InputLabel>
                <Radio {...sale} name="check" type="radio" value={"sale"} />
              </InputWrapper>
              <InputLabel style={{ marginRight: "1rem" }}>Or </InputLabel>
              <InputWrapper row>
                <InputLabel>For Rent : </InputLabel>
                <Radio {...rent} name="check" type="radio" value={"rent"} />
              </InputWrapper>
            </InputWrapper>
          </ContentWrapper>
          <ContentWrapper>
            <InputWrapper>
              <InputLabel as={"h2"}>Location :</InputLabel>
              <InputWrapper row>
                <FormInput {...address} type="text" placeholder="Address" />
                <FormInput
                  {...locDescription}
                  type="text"
                  placeholder="Description"
                />
                <FormInput
                  {...longitute}
                  type="number"
                  placeholder="Longitute"
                />
                <FormInput {...latitute} type="number" placeholder="Latitude" />
              </InputWrapper>
            </InputWrapper>
            <InputWrapper>
              <InputLabel as="h2">Features :</InputLabel>
              <InputWrapper row>
                <InputWrapper>
                  <InputLabel>Feature 1:</InputLabel>
                  <FormInput
                    {...feature_1}
                    type="text"
                    placeholder="Features"
                  />
                </InputWrapper>
                <InputWrapper>
                  <InputLabel>Feature 2:</InputLabel>
                  <FormInput
                    {...feature_2}
                    type="text"
                    placeholder="Features"
                  />
                </InputWrapper>
                <InputWrapper>
                  <InputLabel>Feature 3:</InputLabel>
                  <FormInput
                    {...feature_3}
                    type="text"
                    placeholder="Features"
                  />
                </InputWrapper>
              </InputWrapper>
              <InputWrapper row>
                <InputWrapper>
                  <InputLabel>Feature 4:</InputLabel>
                  <FormInput
                    {...feature_4}
                    type="text"
                    placeholder="Features"
                  />
                </InputWrapper>
                <InputWrapper>
                  <InputLabel>Feature 5:</InputLabel>
                  <FormInput
                    {...feature_5}
                    type="text"
                    placeholder="Features"
                  />
                </InputWrapper>
                <InputWrapper>
                  <InputLabel>Feature 6:</InputLabel>
                  <FormInput
                    {...feature_6}
                    type="text"
                    placeholder="Features"
                  />
                </InputWrapper>
              </InputWrapper>
            </InputWrapper>
            <InputWrapper>
              <InputLabel as="h2">Images :</InputLabel>
              <InputWrapper>
                <InputLabel>Choose Images :</InputLabel>
                <UploadLabel htmlFor="upload">
                  <UploadIcon src={gallaryUrl} alt="Upload" />
                  <UploadInput
                    onChange={handleImages}
                    id="upload"
                    type="file"
                    multiple
                  />
                </UploadLabel>
              </InputWrapper>
            </InputWrapper>
            <ImagePreview>
              {images.map((img, index) => (
                <ImageWrapper key={index}>
                  <CrossButton id={index} onClick={removeImage}>
                    x
                  </CrossButton>
                  <Image src={img} alt={img.name} />
                </ImageWrapper>
              ))}
            </ImagePreview>
          </ContentWrapper>
          <Button onClick={submitForm}>Submit Your Property</Button>
          <Center>
            {" "}
            <PropagateLoader color={"#0078bd"} loading={loading} size={30} />
          </Center>

          {error && <ErrorMessage>{error}</ErrorMessage>}
          {added && (
            <SuccessMessage>
              Your property is added to our portal successfully. You can visit
              your new created property{" "}
              <Link to={"/property/" + propertyId}>here</Link>
            </SuccessMessage>
          )}
        </Form>
      </Wrapper>
      <Footer />
    </Container>
  );
}
