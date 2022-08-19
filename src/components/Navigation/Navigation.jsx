import React from "react";
import { Container, Stack, useMediaQuery } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { ButtonApp } from "../ButtonApp/ButtonApp";
import IconCalendar from './../../assets/icons/IconCalendar'
import styles from "./Navigation.module.css";
import { useDispatch, useSelector } from "react-redux";
import { images } from './../../assets/images'
import IconNotification from "../../assets/icons/IconNotification";
import IconLogOut from './../../assets/icons/IconLogOut'
import { reset } from "../../redux/features/user/userSlice";
import IconContent from "../../assets/icons/IconContent";
import IconPatients from "../../assets/icons/IconPatients";
import IconEmployees from "../../assets/icons/IconEmployees";
import { icons } from "../../assets/icons";

export const Navigation = () => {
	const dispatch = useDispatch();
	const matches = useMediaQuery('(min-width:900px)');
	const { user } = useSelector((state) => state.auth)
	return (
		<nav
			className={styles.nav}
		>
			<Container
				maxWidth="xl">
				<Stack
					display={'flex'}
					direction={'row'}
					justifyContent={'space-between'}
				>
					<Stack
						direction={'row'}
						gap='20px'
						margin={'13px 0'}
					>
						<NavLink
							to={"/schedule"}
							className={styles.nav__link}
							children={({ isActive }) => (
								<ButtonApp
									className={styles.nav__button}
									title={"Расписание"}
									variant={isActive ? 'contained' : 'text'}
									startIcon={<IconCalendar props={isActive ? '#FFFFFF' : '#4C464B'} />}
									style={{
										color: isActive ? '#FFFFFF' : '#4C464B'
									}}
								/>
							)}
						/>
						<NavLink
							to={"/employees"}
							className={styles.nav__link}
							children={({ isActive }) => (
								<ButtonApp
									className={styles.nav__button}
									title={"Сотрудники"}
									variant={isActive ? 'contained' : 'text'}
									startIcon={<IconEmployees props={isActive ? '#FFFFFF' : '#4C464B'} />}
									style={{
										color: isActive ? '#FFFFFF' : '#4C464B'
									}}
								/>
							)}
						/>
						<NavLink
							to={"/patients"}
							className={styles.nav__link}
							children={({ isActive }) => (
								<ButtonApp
									className={styles.nav__button}
									title={"Пациенты"}
									variant={isActive ? 'contained' : 'text'}
									startIcon={<IconPatients props={isActive ? '#FFFFFF' : '#4C464B'} />}
									style={{
										color: isActive ? '#FFFFFF' : '#4C464B'
									}}
								/>
							)}
						/>
						{
							user?.role === 'superadmin'
								? <NavLink
									to={"/medcard"}
									className={styles.nav__link}
									children={({ isActive }) => (
										<ButtonApp
											className={styles.nav__button}
											title={"Контент"}
											variant={isActive ? 'contained' : 'text'}
											startIcon={<IconContent props={isActive ? '#FFFFFF' : '#4C464B'} />}
											style={{
												color: isActive ? '#FFFFFF' : '#4C464B'
											}}
										/>
									)}
								/>
								: null
						}
					</Stack>
					<Stack
						display={'flex'}
						direction={'row'}
						alignItems={'center'}
						gap={'15px'}
					>
						{
							user.role === 'doctor'
								?
								<NavLink
									to={"/profile"}
									className={styles.nav__link}
									children={({ isActive }) => (
										<ButtonApp className={styles.nav__profile}
											variant={isActive ? 'contained' : 'text'}
											startIcon={
												<img src={
													user?.image !== null
														? user.image
														: icons.avatar
												}
													style={{
														width: '38px',
														height: '38px',
														borderRadius: '50%'
													}}
													alt="" srcSet="" />
											}
											sx={{
												'&.MuiButton-root': {
													minWidth: 'fit-content',
													height: '44px',
													color: isActive ? '#fff' : '#4C464B',
												}
											}}
											title={`${user.last_name} ${user.name[0].toUpperCase()}.`}
										/>
									)}
								/>

								: null
						}
						{/* <ButtonApp
							className={styles.nav__button}
							startIcon={<IconNotification props={'#4C464B'} />}
							variant={'contained'}
							sx={{
								'&.MuiButton-root': {
									minWidth: '44px',
									maxWidth: '44px',
									background: '#F7F3F7',
									'&:hover': {
										color: '#FFFFFF',
										'& span.MuiButton-startIcon': {
											marginRight: 0,
											'& svg': {
												'& path': {
													fill: '#FFFFFF',
												}
											}
										}
									},
									'& span.MuiButton-startIcon': {
										marginRight: 0,
										'& svg': {
											'& path': {
												fill: '#4C464B',
											}
										}
									},
								}
							}}
						/> */}
						<ButtonApp
							title={matches ? 'Выйти' : ''}
							variant={'contained'}
							endIcon={<IconLogOut />}
							handleClick={(e) => {
								localStorage.removeItem('user')
								dispatch(reset());
							}}
							sx={{
								'&.MuiButton-root': {
									minWidth: matches ? 'fit-content' : '44px',
									maxWidth: '44px',
									background: '#F7F3F7',
									color: '#4C464B',
									'&:hover': {
										color: '#FFFFFF',
										'& span.MuiButton-endIcon': {
											marginRight: 0,
											'& svg': {
												'& path': {
													fill: '#FFFFFF',
												}
											}
										}
									},
									'& span.MuiButton-endIcon': {
										margin: matches ? '0 0 0 11px ' : '0',
										'& svg': {
											'& path': {
												fill: '#4C464B',
											}
										}
									}
								}
							}} />
					</Stack>
				</Stack>
			</Container>
		</nav>
	);
};
