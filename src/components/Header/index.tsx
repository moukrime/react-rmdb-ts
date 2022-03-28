import React from "react";
import { Link } from "react-router-dom";

import RMDBLog from "../../images/react-movie-logo.svg";
import TMDBLog from "../../images/tmdb_logo.svg";

import { Wrapper, Content, LogoImg, TMDBLogoImg } from "./Header.styles";

const Header: React.FC = () => (
  <Wrapper>
    <Content>
      <Link to="/">
        <LogoImg src={RMDBLog} alt="rmdb-logo" />
      </Link>
      <TMDBLogoImg src={TMDBLog} alt="tmdb-logo" />
    </Content>
  </Wrapper>
);

export default Header;
