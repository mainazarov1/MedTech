import { Container, Stack } from "@mui/material";
import { margin } from "@mui/system";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import { ButtonApp } from "../ButtonApp/ButtonApp";
import { MyButton } from "../MyButton/MyButton";
import { icons } from "./../../assets/icons";
import styles from "./Navigation.module.css";
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
								title={"Рассписание"}
								type={""}
								variant={isActive ? 'contained' : 'text'}
								icon={icons.calendar}
								iconWidth="22px"
								colorText={""}
								hover={""}
								fullWidth={false}
								style={{
									width: "fit-content",
									height: "44px",
									textTransform: 'inherit'
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
								icon={icons.checkList}
								iconWidth={"22px"}
								colorText={""}
								hover={""}
								fullWidth={false}
								style={{
									height: "44px",
									width:'fit-content'
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
