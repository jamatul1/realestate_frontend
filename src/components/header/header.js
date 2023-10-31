import React from "react";
import Logo from "../logo/logo";
import Nav from "./nav";
import { useMediaQuery } from "react-responsive";
import {
  Container,
  LogoWrapper,
  Navbar,
  UserMenuWrapper,
} from "./styledHeader";
import UserMenu from "./userMenu";
export default function Header() {
  let lessThan1000 = useMediaQuery({
    query: "(max-width: 1000px)",
  });

  return (
    <>
      {lessThan1000 ? (
        <Container>
          <Navbar>
            <Nav />
          </Navbar>
          <LogoWrapper>
            <Logo />
          </LogoWrapper>
          <UserMenuWrapper>
            <UserMenu />
          </UserMenuWrapper>
        </Container>
      ) : (
        <Container>
          <LogoWrapper>
            <Logo />
          </LogoWrapper>
          <Navbar>
            <Nav />
          </Navbar>
          <UserMenuWrapper>
            <UserMenu />
          </UserMenuWrapper>
        </Container>
      )}
    </>
  );
}
