import { Container } from "@mui/material";
import { margin } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";
import { ButtonApp } from "../ButtonApp/ButtonApp";
import { MyButton } from "../MyButton/MyButton";
import { icons } from "./../../assets/icons";
import style from "./Navigation.module.css";
export const Navigation = () => {
  return (
    <nav>
      <Container>
        <div className={style.nav__wrap}>
          <Link
            to={"/schedule"}
            className={style.nav__link}
            style={{ textDecoration: "none" }}
            children={
              <ButtonApp
                title={"Рассписание"}
                type={""}
                variant={"contained"}
                icon={icons.calendar}
                iconWidth="22px"
                colorText={""}
                hover={""}
                fullWidth={false}
                style={{
                  width: "fit-content",
                  height: "44px",
                  color: "#FFFFFF",
                  "text-decoration-style": "none",
                }}
              />
            }
          ></Link>
          <Link
            to={"/check-list"}
            className={style.nav__link}
            style={{ textDecoration: "none" }}
            children={
              <ButtonApp
                title={"Чек лист"}
                type={""}
                variant={"contained"}
                icon={icons.checkList}
                iconWidth="22px"
                colorText={""}
                hover={""}
                fullWidth={true}
                style={{
                  height: "44px",
                  width: "fit-content",
                }}
              />
            }
          ></Link>
          <Link
            to={"/users"}
            className={style.nav__link}
            style={{ textDecoration: "none" }}
            children={
              <ButtonApp
                title={"Пользователи"}
                type={""}
                variant={"contained"}
                icon={icons.calendar}
                iconWidth={"22px"}
                colorText={""}
                hover={""}
                fullWidth={false}
                style={{
                  height: "44px",
                  width: "fit-content",
                }}
              />
            }
          ></Link>

          {/* <MyButton title={"Schedule"} width="300px" height="40px" /> */}
        </div>
      </Container>
    </nav>
  );
};
