import { Container } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { icons } from "./../../assets/icons/index";
import style from "./Header.module.css";
export const Header = () => {
	const {user}=useSelector(state=>state.auth)
  return (
    <header className={style.header}>
      <Container maxWidth="xl">
        <div className={style.header__wrap}>
					<Link to="/manual" className={style.header__logo}
						style={{
							pointerEvents: user.role === 'doctor' ? 'auto' : 'none'
						}}
					>
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
