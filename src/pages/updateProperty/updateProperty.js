import React, { useEffect, useState } from "react";
import Header from "../../components/header/header";
import FormInput from "../../components/input/input";
import {
  getSingleProperty,
  updateProperty,
} from "../../contexts/properties/propertiesActions";

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
} from "./styledUpdateProperty";
import gallaryUrl from "../../assets/icons/gallery.png";
import useInput from "../../hooks/useInput";
import { useUser } from "../../contexts/user/userContext";
import {
  uploadPropertyImages,
  removePropertyImages,
} from "../../contexts/properties/propertiesActions";
import { ErrorMessage } from "../../pages/signin/styledSignIn";
import PropagateLoader from "react-spinners/PropagateLoader";
import { Link, useNavigate, useParams } from "react-router-dom";
import Footer from "../../components/footer/footer";
import { url } from "../../config/url";

export default function UpdateProperty() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);

  const [images, setImages] = useState([]);
  const [removedImgs, setRemovedImgs] = useState([]);
  const [imgFiles, setImgFiles] = useState([]);

  const name = useInput("");
  const slogan = useInput("");
  const description = useInput("");
  const price = useInput("");
  const beds = useInput("");
  const area = useInput("");
  const propertyType = useInput("");
  const address = useInput("");
  const locDescription = useInput("");
  const longitute = useInput("");
  const latitute = useInput("");
  const sale = useInput(false);
  const rent = useInput(false);
  const feature_1 = useInput("");
  const feature_2 = useInput("");
  const feature_3 = useInput("");
  const feature_4 = useInput("");
  const feature_5 = useInput("");
  const feature_6 = useInput("");

  const { user } = useUser();
  let { id } = useParams();
  const navigateTo = useNavigate();

  useEffect(() => {
    async function fetchProperty() {
      try {
        const { data } = await getSingleProperty(id);
        let property = data.data.data;
        setLoading(false);
        setError("");
        loadFields(property);
      } catch (error) {
        setLoading(false);
        setError("Something went wrong on loading property. Please try again.");
      }
    }
    fetchProperty();
  }, [id]);
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
    let location = { coordinates: [], type: "Point" };
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
      let { data } = await updateProperty(id, property);

      // removing the images
      if (removedImgs.length > 0) {
        await removePropertyImages(id, removedImgs);
      }

      // updating the new images for imgs
      if (imgFiles.length > 0) {
        const formData = new FormData();
        Object.values(imgFiles).forEach((file) => {
          formData.append("images", file);
        });
        console.log(formData);
        await uploadPropertyImages(id, formData);
      }
      setTimeout(() => {
        setLoading(false);
        setError("");
        setAdded(true);
        navigateTo("/property/" + id);
      }, 1000);
    } catch (error) {
      setLoading(false);
      setError(
        "Sorry something went wrong while updating proeprty! please try again."
      );
      setTimeout(() => {
        setError("");
      }, 3000);
    }

    //let uploadResponse = await uploadPropertyImages()
    // console.log(uploadResponse);
  };

  const removeImage = (e) => {
    e.preventDefault();
    let removedImage = images[e.target.id];
    removedImage = removedImage.replace(url, "");
    if (String(images[e.target.id]).startsWith("http")) {
      setRemovedImgs((images) => [...images, removedImage]);
    }
    let newImgFiles = imgFiles.filter((file, index) => index !== +e.target.id);
    let newImages = images.filter((image, index) => index !== +e.target.id);
    setImgFiles(newImgFiles);
    setImages(newImages);
  };

  function loadFields(property) {
    name.setValue(property.name);
    slogan.setValue(property.slogan);
    description.setValue(property.description);
    price.setValue(property.price);
    beds.setValue(property.beds);
    area.setValue(property.area);
    propertyType.setValue(property.type);
    address.setValue(property.location.address);
    locDescription.setValue(property.location.description);
    longitute.setValue(property.location.coordinates[0]);
    latitute.setValue(property.location.coordinates[1]);
    sale.setValue(property.forSale);
    rent.setValue(property.forRent);
    if (property.features.length !== 0) {
      feature_1.setValue(property.features[0] ? property.features[0] : "");
      feature_2.setValue(property.features[1] ? property.features[1] : "");
      feature_3.setValue(property.features[2] ? property.features[2] : "");
      feature_4.setValue(property.features[3] ? property.features[3] : "");
      feature_5.setValue(property.features[4] ? property.features[4] : "");
      feature_6.setValue(property.features[5] ? property.features[5] : "");
    }
    let tempImages = [];
    for (let i = 0; i < property.images.length; i++) {
      let path = property.images[i];
      tempImages.push(path);
    }
    setImages(tempImages);
  }

  return (
    <Container>
      <Header />
      <Wrapper>
        <Heading>Update Property</Heading>
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
          <Button onClick={submitForm}>Update Your Property</Button>
          <Center>
            {" "}
            <PropagateLoader color={"#0078bd"} loading={loading} size={30} />
          </Center>

          {error && <ErrorMessage>{error}</ErrorMessage>}
          {added && (
            <SuccessMessage>
              Your property is updated successfully. You can visit the updated
              property <Link to={"/property/" + id}>here</Link>
            </SuccessMessage>
          )}
        </Form>
      </Wrapper>
      <Footer />
    </Container>
  );
}
