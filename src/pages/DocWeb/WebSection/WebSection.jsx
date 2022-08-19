// MaterialUI
import { Box } from "@mui/system";
import { Container, Stack, Typography } from "@mui/material";
// Components
import { ButtonApp } from "../../../components/ButtonApp/ButtonApp";
// assets
import { icons } from "../../../assets/icons";
// styles
import style from "./WebSection.module.css";
import { Link } from "react-router-dom";

export const WebSection = ({ image, title, text, buttonTitle, preTitle, route }) => {
	const size = buttonTitle === "Войти" ? "96px" : "40px";
	return (
		<div
			className={style.manual__page}
			style={{
				background: `url(${image}) center center no-repeat`,
				backgroundSize: "cover",
			}}
		>
			<Container
				maxWidth="xl"
			>
				<Stack
					className={style.manual__content}
					sx={{
						maxWidth: "660px",
						width: "100%",
					}}
				>
					{preTitle ? (
						<Stack className={style.manual__logo}
							alignItems={"start"}
							sx={{
								width: 'fit-content'
							}}
						>
							<img
								src={icons.medTechViolet}
								alt="logo"
								style={{
									width: "80px",
									margin: '0 auto'
								}}
							/>
							<Typography
								sx={{
									fontSize: "24px",
									fontWeight: 700,
									lineHeight: "100%",
									color: "#68B7EC",
								}}
							>
								Med Tech
							</Typography>
						</Stack>
					) : null}
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
							maxWidth: "300px",
							width: "100%",
						}}
					>
						<Link to={route}
							style={{
								textDecoration: 'none'
							}}
							children={
								<ButtonApp title={buttonTitle} variant="contained"
									style={{
										height: '44px'
									}} />
							} />
					</Box>
				</Stack>
			</Container>
		</div>
	);
};
