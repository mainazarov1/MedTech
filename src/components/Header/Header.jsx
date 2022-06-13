import { Container } from "@mui/material";
import React from "react";
import logo from "./../../assets/icons/logo_med_tech.svg";
import style from "./Header.module.css";
export const Header = () => {
  return (
    <header className={style.header}>
      <Container>
        <div className={style.header__wrap}>
          <div className={style.header__logo}>
            <img
              src={logo}
              alt="logo"
              srcset=""
              style={{
                width: "45px",
              }}
            />
            MEDTECH
          </div>
        </div>
      </Container>
    </header>
  );
};
