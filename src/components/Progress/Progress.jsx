import { CircularProgress } from '@mui/material'
import styles from './Progress.module.css'
function Progress() {
	return (
		<div className={styles.progress}>
			<CircularProgress className={styles.progress__bar} />
		</div>
	)
}

export default Progress