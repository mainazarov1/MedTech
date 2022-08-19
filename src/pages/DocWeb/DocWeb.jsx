import React from "react";
import { WebSection } from "./WebSection/WebSection";
import { images } from "./../../assets/images/index.js";
import { useSelector } from "react-redux";

const DocWeb = () => {
	const {isLogged} =useSelector(state=>state.auth)
	const pages = [
		{
			img: images.manualImg,
			preTitle: "Ваш личный кабинет",
			title: "Med Tech",
			text: "Решение, которое помогает автоматизировать ваш процесс работы с пациентами.",
			buttonTitle: "Войти",
			route: isLogged ? '/schedule' : '/',
		},
		{
			img: images.manualImg2,
			title: "Расписание",
			text: "В данном разделе Вам доступен календарь с расписанием Ваших рабочих часов, в котором Вы можете просматривать все будущие встречи, а также сами назначать и отменять записи на приём.",
			buttonTitle: "Перейти",
			route: '/schedule'
		},
		{
			img: images.manualImg5,
			title: "Пациенты",
			text: "В данном разделе Вам будет предоставлена вся информация Ваших пациентов, а также их медицинские карты и чек-листы. Заполнение всех чек-листов происходит через готовый шаблон, имеющийся на сайте.",
			buttonTitle: "Перейти",
			route: '/patients'
		},
		{
			img: images.manualImg4,
			title: "Сотрудники",
			text: "Данный раздел служит для удалённого контроля персонала и анализа эффективности работы врачей. Вы можете просматривать, добавлять и редактировать информацию сотрудников клиники.",
			buttonTitle: "Перейти",
			route: '/employees'
		},
	];
	const sections = pages.map((item, i) => {
		return (
			<WebSection
				key={i}
				image={item.img}
				title={item.title}
				text={item.text}
				buttonTitle={item.buttonTitle}
				preTitle={item.preTitle}
				route={item.route}
			/>
		);
	});
	return <>{sections}</>;
};
export default DocWeb