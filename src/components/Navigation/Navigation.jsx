import { Container, Stack } from "@mui/material";
import { margin } from "@mui/system";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import { ButtonApp } from "../ButtonApp/ButtonApp";
import { MyButton } from "../MyButton/MyButton";
import IconCalendar from './../../assets/icons/IconCalendar'
import { icons } from "./../../assets/icons";
import styles from "./Navigation.module.css";
import IconCheckList from "../../assets/icons/IconCheckList";
import IconUser from "../../assets/icons/IconUser";
export const Navigation = () => {
	return (
		<nav>
			<Container
				maxWidth="xl">
				<Stack
					direction={'row'}
					gap='20px'
					margin={'13px 0'}
				>
					<NavLink
						to={"/schedule"}
						className={styles.nav__link}
						style={{
							textDecoration: "none",
						}}
						children={({ isActive }) => (
							<ButtonApp
								className={styles.btn}
								title={"Расписание"}
								type={""}
								variant={isActive ? 'contained' : 'text'}
								icon={<IconCalendar props={isActive ? '#FFFFFF' : '#4C464B'} />}
								iconWidth="22px"
								isActive={isActive}
								color={isActive ? '#FFFFFF' : '#4C464B'}
								hover={""}
								fullWidth={false}
								style={{
									width: "fit-content",
									height: "44px",
									color: isActive ? '#FFFFFF' : '#4C464B'
								}}
							/>
						)}
					></NavLink>
					<NavLink
						to={"/check-list"}
						className={styles.nav__link}
						style={{ textDecoration: "none" }}
						children={({ isActive }) => (
							<ButtonApp
								title={"Чек лист"}
								type={""}
								variant={isActive ? 'contained' : 'text'}
								icon={<IconCheckList props={isActive ? '#FFFFFF' : '#4C464B'} />}
								iconWidth="22px"
								isActive={isActive}
								color={isActive ? '#FFFFFF' : '#4C464B'}
								hover={""}
								fullWidth={false}
								style={{
									width: "fit-content",
									height: "44px",
									color: isActive ? '#FFFFFF' : '#4C464B'
								}}
							/>
						)}
					></NavLink>
					<NavLink
						to={"/users"}
						className={styles.nav__link}
						style={{ textDecoration: "none" }}
						children={({ isActive }) => (
							<ButtonApp
								title={"Пользователи"}
								type={""}
								variant={isActive ? 'contained' : 'text'}
								icon={<IconUser props={isActive ? '#FFFFFF' : '#4C464B'} />}
								iconWidth="22px"
								isActive={isActive}
								color={isActive ? '#FFFFFF' : '#4C464B'}
								hover={""}
								fullWidth={false}
								style={{
									width: "fit-content",
									height: "44px",
									color: isActive ? '#FFFFFF' : '#4C464B'
								}}
							/>
						)}
					></NavLink>
					{/* <MyButton title={"Schedule"} width="300px" height="40px" /> */}
				</Stack>
			</Container>
		</nav>
	);
};
