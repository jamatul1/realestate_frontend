import React, { useState } from "react";
import styled from "styled-components";
import menuIconUrl from "../../assets/icons/menu.png";
import crossIconUrl from "../../assets/icons/cross.png";
import { Link } from "react-router-dom";
import { useUser } from "../../contexts/user/userContext";

const Container = styled.div`
  position: relative;
`;
const MenuIconWrapper = styled.div``;
const MenuIconBtn = styled.button`
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const MenuIcon = styled.img`
  height: 2.4rem;
  pointer-events: none;
`;
const BlackBackground = styled.div`
  background-color: rgba(0, 0, 0, 0.247);
  height: calc(100vh - 6rem);
  width: 100vw;
  position: fixed;
  top: 6rem;
  left: 0;
  transform: scaleX(1.3);
  overflow: hidden;
`;
const LeftBackground = styled.div`
  background-color: #ffffff;
  height: calc(100vh - 6rem);
  width: 40vw;
  position: fixed;
  top: 6rem;
  left: 0;
  z-index: 400000;
  overflowy: hidden;
  transition: all 0.3s;
  @media (max-width: 800px) {
    width: 100vw;
  }
  @media (max-width: 400px) {
    width: 100vw;
  }
`;
const LeftMenu = styled.ul`
  position: fixed;
  top: 6rem;
  left: 0;
  z-index: 400000;
  padding: 3rem 3rem;
  width: 40vw;
  transition: all 0.3s;
  @media (max-width: 800px) {
    top: 12rem;
    width: 100vw;
    text-align: center;
  }
  @media (max-width: 400px) {
    width: 100vw;
  }
`;
const LeftMenuItem = styled.li`
  list-style: none;
  margin-bottom: 1rem;
`;

const LeftMenuLink = styled(Link)`
  text-decoration: none;
  color: ${(props) => props.theme.color.grayDark};
  font-size: 1.6rem;
`;

const CrossBtn = styled.button`
  border: none;
  background: white;
  font-size: 2rem;
  font-weight: 700;
`;

export default function LeftNav() {
  let [showMenu, setShowMenu] = useState(false);
  let toggleShowMenu = (e) => {
    setShowMenu((showMenu) => !showMenu);
  };
  const { user } = useUser();
  return (
    <Container>
      <MenuIconWrapper>
        <MenuIconBtn onClick={toggleShowMenu}>
          {showMenu && <CrossBtn> &#10005;</CrossBtn>}
          {!showMenu && <MenuIcon src={menuIconUrl} alt="" />}
        </MenuIconBtn>
      </MenuIconWrapper>
      {showMenu && <LeftBackground />}
      {showMenu && <BlackBackground onClick={() => setShowMenu(false)} />}
      {showMenu && (
        <LeftMenu>
          <LeftMenuItem>
            <LeftMenuLink onClick={() => showMenu((state) => !state)} to="/buy">
              Buy
            </LeftMenuLink>
          </LeftMenuItem>
          <LeftMenuItem>
            <LeftMenuLink
              onClick={() => showMenu((state) => !state)}
              to="/rent"
            >
              Rent
            </LeftMenuLink>
          </LeftMenuItem>
          <LeftMenuItem>
            <LeftMenuLink
              onClick={() => showMenu((state) => !state)}
              to="/explores"
            >
              Explores
            </LeftMenuLink>
          </LeftMenuItem>
          <LeftMenuItem>
            <LeftMenuLink
              onClick={() => showMenu((state) => !state)}
              to="/newHomes"
            >
              New Homes
            </LeftMenuLink>
          </LeftMenuItem>
          <LeftMenuItem>
            <LeftMenuLink
              onClick={() => showMenu((state) => !state)}
              to="/blogs"
            >
              Blogs
            </LeftMenuLink>
          </LeftMenuItem>
        </LeftMenu>
      )}
    </Container>
  );
}
