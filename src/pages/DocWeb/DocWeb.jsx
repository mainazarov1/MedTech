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
			text: "Решение которое помогает автомотизировать ваш процесс работы с пациентами.",
			buttonTitle: "Войти",
			route: isLogged ? '/schedule' : '/',
		},
		{
			img: images.manualImg2,
			title: "Расписание",
			text: "В данном разделе вы сможете распределить свой график приема на обследование пациентов. Для этого вам надо всего лишь прописать время в какое время вы проводите осмотр, а в свою очередь пациенты с помощью мобильного приложения смогут просмотреть и забронировать время для обследования.",
			buttonTitle: "Перейти",
			route: '/schedule'
		},
		{
			img: images.manualImg5,
			title: "Пациенты",
			text: "На данной странице сайта будут отображаться ваши пациенты, что бы перейти на детальную страницу пациента вам не обходи кликнуть  на определенного пациента после чего вас перебросят на детальную страницу пациента где будут отображаться подробная информация о нем, также вы можете вносить изменения в данных о пользователе.",
			buttonTitle: "Перейти",
			route: '/patients'
		},
		{
			img: images.manualImg4,
			title: "Сотрудники",
			text: "В этом разделе вы прописываете вопросы для своих пациентов и сохраняете их и прикрепляете к определённому пациенту в свою очередь этот чек-лист отображается в мобильном приложение пациентов которые вносят ответы на заданные вопросы с пошью  галочки или свободного ответа.",
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