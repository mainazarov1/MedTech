// MaterialUI
import { CircularProgress } from '@mui/material'
// styles
import styles from './Progress.module.css'
export const Progress = () => {
	return (
		<div className={styles.progress}>
			<CircularProgress className={styles.progress__bar} />
		</div>
	)
}