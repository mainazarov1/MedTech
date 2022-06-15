import { Container } from "@mui/system";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { CheckList } from "../../components/CheckList/CheckList";
import { Header } from "../../components/Header/Header";
import { Navigation } from "../../components/Navigation/Navigation";
import { Schedule } from "../../components/Schedule/Schedule";
import { Users } from "../../components/Users/Users";
import { DocWeb } from "../DocWeb/DocWeb";

export const Main = () => {
  return (
    <>
      <Header />
      <Navigation />
      <Container>
        <Routes>
          <Route path={"schedule"} element={<Schedule />} />
          <Route path={"check-list"} element={<CheckList />} />
          <Route path={"users"} element={<Users />} />
        </Routes>
      </Container>
    </>
  );
};
