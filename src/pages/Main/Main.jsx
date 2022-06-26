import { Box, Stack } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { CheckList } from "../../components/CheckList/CheckList";
import { Header } from "../../components/Header/Header";
import { Navigation } from "../../components/Navigation/Navigation";
import { Schedule } from "../../components/Schedule/Schedule";
import { Users } from "../../components/Users/Users";
import { DocWeb } from "../DocWeb/DocWeb";

const calcHeight = (px) => {
	const windowHeight = window.innerHeight;
	const height = windowHeight - px;
	console.log(height)
	return height
}
export const Main = () => {
  return (
    <>
      <Header />
      <Navigation />
			<Stack
				sx={{
					height: calcHeight(130),
					background: "#F8F7F3",
				}}
			>
        <Container
					maxWidth="xl"
					sx={{
						height: calcHeight(290),
						paddingTop: "30px",
						paddingBottom: "30px",
					}}
        >
          <Routes>
            <Route path={"schedule"} element={<Schedule />} />
            <Route path={"check-list"} element={<CheckList />} />
            <Route path={"users"} element={<Users />} />
          </Routes>
        </Container>
      </Stack>
    </>
  );
};
