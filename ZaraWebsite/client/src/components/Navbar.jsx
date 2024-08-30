import React from "react";
import styled from "styled-components";
import LogoImg from "../utils/Images/Logo.png";
import { NavLink } from "react-router-dom";
import Button from "./Button";
const NavbarContainer = styled.div``;
const NavLogo = styled.div``;
const NavItems = styled.div``;
const Logo = styled.img`
  width: 100px;
  height: 50px;`;
const ButtonContainer = styled.div``;
const Navbar = () => {
  return (
    <nav>
      <NavbarContainer>
        <NavLogo>
          <Logo src={LogoImg}/>
        </NavLogo>
        <NavItems>
          <NavLink to="/">Home</NavLink><br></br>
          <NavLink to="/Shop">Shop</NavLink><br></br>
          <NavLink to="/New_Arrivals">New Arrivals</NavLink><br></br>
          <NavLink to="/Orders">Orders</NavLink><br></br>
          <NavLink to="/Contact">Contact</NavLink><br></br>
        </NavItems>
        <ButtonContainer>
         <Button text="SignIn" small/>
        </ButtonContainer>
      </NavbarContainer>
    </nav>
  );
};

export default Navbar;
