import { Container } from '@mui/material'
import React from 'react'
import { WebSection } from './WebSection/WebSection'
import img1 from './../../assets/images/manual-bg.jpeg'
import img2 from './../../assets/images/manual-bg2.jpeg'
import img3 from './../../assets/images/manual-bg3.jpeg'
import img4 from './../../assets/images/manual-bg4.jpeg'

const pages = [
	{
		img: img1,
		preTitle: 'Ваш личный кабинет',
		title: 'Med Tech',
		text: 'Решение которое помогает автомотизировать ваш процесс работы с пациентами.',
		buttonTitle: 'Войти',
	},
	{
		img: img2,
		title: 'Расписание',
		text: 'В данном разделе вы сможете распределить свой график приема на обследование пациентов. Для этого вам надо всего лишь прописать время в какое время вы проводите осмотр, а в свою очередь пациенты с помощью мобильного приложения смогут просмотреть и забронировать время для обследования.',
		buttonTitle: 'Перейти',
		
	},
	{
		img: img3,
		title: 'Чек-лист',
		text: 'В этом разделе вы прописываете вопросы для своих пациентов и сохраняете их и прикрепляете к определённому пациенту в свою очередь этот чек-лист отображается в мобильном приложение пациентов которые вносят ответы на заданные вопросы с пошью  галочки или свободного ответа.',
		buttonTitle: 'Перейти',
		
	},
	{
		img: img4,
		title: 'Пользователи',
		text: 'На данной странице сайта будут отображаться ваши пациенты, что бы перейти на детальную страницу пациента вам не обходи кликнуть  на определенного пациента после чего вас перебросят на детальную страницу пациента где будут отображаться подробная информация о нем, также вы можете вносить изменения в данных о пользователе.',
		buttonTitle: 'Перейти',
	},
]
export const DocWeb = () => {
	const sections = pages.map((item, i) => {
		return <WebSection key={i} image={item.img} title={item.title} text={item.text} buttonTitle={item.buttonTitle} preTitle={item.preTitle}/>
	})
	return (
		<>
			{sections}
		</>

	)
}
