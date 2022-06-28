import { Container } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { icons } from "./../../assets/icons/index";
import style from "./Header.module.css";
export const Header = () => {
  return (
    <header className={style.header}>
      <Container maxWidth="xl">
        <div className={style.header__wrap}>
          <Link to="/manual" className={style.header__logo}>
            <img
              src={icons.medTechWhite}
              alt="logo"
              style={{
                width: "45px",
              }}
            />
            MEDTECH
          </Link>
        </div>
      </Container>
    </header>
  );
};
