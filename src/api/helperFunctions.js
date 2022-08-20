export const getToken = () => {
	return localStorage.getItem('token');
}
export const removeToken = () => {
	localStorage.removeItem('token');
}
export const setToken = (val) => {
	localStorage.setItem('token', val);
}
export const showShortName = ({ last_name, name, patronymic }) => {
	return `${last_name || ''} ${name?.charAt(0) || ''}.${patronymic?.charAt(0) || ''}`
}
export const addListNumber = (i) => {
	if (i + 1 <= 9) {
		return `00${i + 1}`;
	} else if (i + 1 <= 99) {
		return `0${i + 1}`
	} else {
		return `${i + 1}`
	}
}
// export const formatData = (arr) => {
// 	return arr.map(({ id, last_name, name, patronymic, phone, email, week, address, active }, i) => {
// 		return {
// 			id: id,
// 			number: `00${i + 1}`,
// 			patient: <Link to={`${id}`}>{showShortName({ last_name, name, patronymic })}</Link>,
// 			phone: <a href={`tel:${phone}`}>{phone}</a>,
// 			email: <a href={`mailto:${email}`} target='_blank' rel={'noreferrer'}>{email}</a>,
// 			week: week + ' неделя',
// 			address: address,
// 			active
// 		}
// 	})
// }
export const nameControl = (name, i) => {
	if (name === 'analysis') {
		return `question${i + 1}`
	}
	if (name === 'indicators') {
		return `answer${i + 1}`
	}
	if (name === 'description') {
		return `description${i + 1}`
	}
}