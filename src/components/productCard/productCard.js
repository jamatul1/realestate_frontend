import styled from "styled-components";
import bedUrl from "../../assets/icons/bed.png";
import squareUrl from "../../assets/icons/square.png";
import { Link, useNavigate } from "react-router-dom";
import { url } from "../../config/url";
import editIconPath from "../../assets/icons/edit.png";
const Container = styled.div`
  width: 100%;
  cursor: pointer;
  border: 2px solid transparent;
  border-radius: 1rem;
  padding: 0.5rem;
  position: relative;
`;
const Icon = styled.img`
  height: 2rem;
  margin-right: 0.5rem;
`;
const Box = styled.div`
  display: flex;
  margin-right: 1rem;
`;
const Image = styled.img`
  width: 100%;
  height: 18rem;
  object-fit: cover;
  border-radius: 0.2rem;
`;
const Heading = styled.h2`
  font-size: 2rem;
  color: ${(props) => props.theme.color.grayDark};
  line-height: 1.3;
  margin-top: 1rem;
`;
const Text = styled.p`
  font-size: 1.3rem;
  color: ${(props) => props.theme.color.gray};
`;
const Price = styled.h5`
  font-size: 2.4rem;
  color: ${(props) => props.theme.color.dark};
  color: var(--green);
`;
const Bottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const RedCircle = styled.div`
  height: 4rem;
  width: 4rem;
  border-radius: 50%;
  background-color: ${(props) => props.theme.color.brand};
  color: ${(props) => props.theme.color.white};
  position: absolute;
  top: 0.8rem;
  right: 0.8rem;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
`;
const EditButton = styled(Link)`
  img {
    height: 3rem;
    width: 3rem;
  }
`;

export default function ProductCard({ product, agent }) {
  const navigateTo = useNavigate();
  const navigateToProperty = () => {
    if (agent) return;
    navigateTo("/property/" + product._id);
  };
  return (
    <Container onClick={() => navigateToProperty()}>
      {!agent && (
        <RedCircle>{product.forSale ? "For Sale" : "For Rent"}</RedCircle>
      )}
      {agent && (
        <EditButton to={"/properties/" + "update/" + product._id}>
          <img src={editIconPath} alt="Edit" />
        </EditButton>
      )}

      <Image src={product.images[0]} />
      <Heading>{product.name}</Heading>
      <Text>{product.location.address}</Text>
      <Price>
        {new Intl.NumberFormat("hi-IN", {
          style: "currency",
          currency: "BDT",
        }).format(product.price)}{" "}
      </Price>
      <Bottom>
        <Box>
          <Icon src={bedUrl} alt="bed-icon"></Icon>
          <Text>{product.beds}</Text>
        </Box>
        <Box>
          <Icon src={squareUrl} alt="square-icon"></Icon>
          <Text>{product.area} sqft</Text>
        </Box>
      </Bottom>
    </Container>
  );
}
