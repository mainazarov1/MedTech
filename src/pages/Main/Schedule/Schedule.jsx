import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Stack, Typography } from "@mui/material";
// Components
import { SelectBtn } from "./../../../components/Select/Select";
import { CalendarCustom } from "./../../../components/Calendar/CalendarCustom";
import { TableCustom } from "./../../../components/TableCustom/TableCustom";
import { WorkShift } from "./../../../components/WorkShift/WorkShift";
import { ModalAppointment } from "./../../../components/Modals/ModalAppointment/ModalAppointment";
import { ModalAppointmentCreate } from "./../../../components/Modals/ModalAppointmentCreate/ModalAppointmentCreate";
// styles
import mainStyles from './../../../styles/index.module.scss'
import styles from "./Schedule.module.css";
import { getWorkShift } from "./../../../redux/features/workshift/workshiftAction";
import { getAppointmentsByDate, getAppointmentsByIdAndDate } from "../../../redux/features/appointment/appointmentAction";
import { addListNumber, showShortName } from "../../../api/helperFunctions";
import { Link } from "react-router-dom";
const Schedule = () => {
	const columns = [
		{ id: "number", label: "№", width: 35 },
		{ id: "doctor", label: "ФИО врача", minWidth: 'fit-content' },
		{
			id: "patient",
			label: "ФИО пациента",
			minWidth: 'fit-content',
		},
		{
			id: "date",
			label: "Дата",
			width: 'fit-content',
		},
		{
			id: "time",
			label: "Время",
			width: 'fit-content',
			format: (value) => value.toFixed(2),
		},
		{
			id: 'option',
			label: '',
			width: 20,
		}
	];

	const [modalAppointmentCreate, setModalAppointmentCreate] = useState(false);
	
	const dispatch = useDispatch()
	const [date, setDate] = useState(new Date().toISOString())
	const [time, setTime] = useState('')
	const [data, setData] = useState({})
	const [appointmentData, setAppointmentData] = useState()
	// const [day, setDay] = useState(new Date().getDay())
	const [doctorId, setDoctorId] = useState()
	const { user } = useSelector((state) => state.auth)
	const [modalAppointment, setModalAppointment] = useState(false);
	const modalAppointmentOpen = (val) => {
		setData(val)
		setModalAppointment(!modalAppointment)
	}
	const modalAppointmentCreateOpen = () => {
		setModalAppointmentCreate(!modalAppointmentCreate)
	}
	const { doctor } = useSelector((state) => state.doctor)
	const { appointment } = useSelector((state) => state.appointment)
	useEffect(() => {
		if (user?.role === 'doctor') {
			dispatch(getWorkShift({ id: user.id, date: date }))
			dispatch(getAppointmentsByIdAndDate({ id: user.id, date: date }))
		}
		if (['admin', 'superadmin'].includes(user?.role)) {
			if (doctorId) {
				dispatch(getWorkShift({ id: doctorId, date: date }))
				dispatch(getAppointmentsByIdAndDate({ id: doctorId, date: date }))
			} else {
				dispatch(getAppointmentsByDate(date))
				dispatch(getWorkShift({ id: 0, date: date }))
			}
		}
	}, [user, date, doctorId, dispatch])
	function getData() {
		if (appointment !== null) {
			return appointment?.map(({ id, doctor, patient, date, description }, i) => {
				return {
					number: addListNumber(i),
					doctor: <Link to={`/employees/${doctor.id}`}>{showShortName({ last_name: doctor?.last_name, name: doctor?.name, patronymic: doctor?.patronymic })}</Link>,
						// showShortName({ last_name: doctor?.last_name, name: doctor?.name, patronymic: doctor?.patronymic }),
					patient: <Link to={`/patients/${patient.id}`}>{showShortName({ last_name: patient?.last_name, name: patient?.name, patronymic: patient?.patronymic })}</Link>,
					date: `${date.slice(0, 10).split('-').reverse().join('.')}`,
					time: `${date.slice(11, 16)}`,
					doctorPhone: doctor?.phone,
					patientPhone: patient?.phone,
					description,
					id: id,
					doctorImage: doctor?.image,
					patientImage: patient?.image,
					active: true,
				}
			})
		}
	}
	console.log(getData());
	const rows = getData() || [];
	return (
		<section className={styles.schedule}>
			{modalAppointment || modalAppointmentCreate ?
				<Stack
					className={mainStyles.modal__view_background}
				>
					{modalAppointment
						? <ModalAppointment data={data} handleClick={modalAppointmentOpen} />
						: <ModalAppointmentCreate doctorId={doctorId} data={appointmentData} date={date} time={time} handleClick={modalAppointmentCreateOpen} />
					}
				</Stack> : ''}
			<Stack className={styles.schedule__content}>
				<Typography
					className={mainStyles.subtitle}
					component={"h3"}
					children={"Список запланированных встреч"}
				/>
				<Stack direction="row" gap={"20px"} margin={"20px 0 35px"}>
					{/* // TODO INPUT FOR SEARCH */}
					<SelectBtn label={"Врач"} values={doctor} getDoctorId={setDoctorId} />
					{/* <SelectBtn label={"Пациент"} values={names} /> */}
				</Stack>
				<TableCustom columns={columns} rows={rows} handleClick={modalAppointmentOpen} getData={setData} />
			</Stack>
			<Stack
				className={styles.schedule__calendar}
			>
				<Stack
					className={styles.calendar__content}>
					<Typography className={styles.calendar__text}>
						Календарь
					</Typography>
					<CalendarCustom getDate={setDate} />
				</Stack>
				<WorkShift modal={setModalAppointmentCreate} getTime={setTime} getData={setAppointmentData} />
			</Stack>
		</section>
	);
};
export default Schedule;