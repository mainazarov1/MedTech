import { Container, Stack, Typography } from "@mui/material";
import { Box, fontSize, minHeight } from "@mui/system";
import React from "react";
import { ButtonApp } from "../../../components/ButtonApp/ButtonApp";
import img from "./../../../assets/images/manual-bg.png";
import style from "./WebSection.module.css";
import logo from "./../../../assets/icons/logo_violet.svg";
export const WebSection = ({ image, title, text, buttonTitle, preTitle }) => {
  const size = buttonTitle === "Войти" ? "96px" : "40px";
  return (
    <div
      className={style.manual__page}
      style={{
        background: `url(${image}) center center no-repeat`,
        backgroundSize: "cover",
        minHeight: "100vh",
      }}
    >
      {/* <img
				className={style.manual__bg__image} src={image} alt="image" /> */}
      <Container>
        {preTitle ? (
					<Stack
					className={style.manual__logo}>
            <img
              src={logo}
              alt="logo"
              style={{
                width: "80px",
              }}
            />
						<Typography
							sx={{
								fontSize: '24px'
							}}
						>Med Tech</Typography>
          </Stack>
        ) : null}
        <Stack
          className={style.manual__content}
          sx={{
            maxWidth: "660px",
            width: "100%",
          }}
        >
          <Typography
            component="h4"
            sx={{
              fontSize: "24px",
              fontWeight: "500",
              lineHeight: "100%",
              color: "#4C464B",
              mb: "30px",
            }}
          >
            {preTitle}
          </Typography>
          <Typography
            component="h4"
            sx={{
              fontSize: size,
              fontWeight: "700",
              lineHeight: "100%",
              color: "#68B7EC",
              mb: "30px",
            }}
          >
            {title}
          </Typography>
          <Typography
            component="p"
            sx={{
              fontSize: "20px",
              fontWeight: "500",
              lineHeight: "120%",
              color: "#4C464B",
              marginBottom: "50px",
            }}
          >
            {text}
          </Typography>
          <Box
            sx={{
              maxWidth: "400px",
              width: "100%",
            }}
          >
            <ButtonApp title={buttonTitle} variant="contained" />
          </Box>
        </Stack>
      </Container>
    </div>
  );
};
