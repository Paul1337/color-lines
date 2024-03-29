import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fieldActions, fieldSlice } from '../../../domain/store/slices/field/fieldSlice';
import styles from './Panel.module.css';
import { RootState } from '../../../domain/store/store';
import { statActions } from '../../../domain/store/slices/stat/statSlice';
import SettingsSvg from '../../../assets/img/setting.svg?react';

const Panel = () => {
	const points = useSelector((state: RootState) => state.stat.score);
	const dispatch = useDispatch();

	const btnRestartRef = useRef<HTMLButtonElement>(null);
	const [leftEmptyDivStyle, setLeftDivStyle] = useState({});

	useEffect(() => {
		// console.log(btnRestartRef.current?.offsetWidth);
		setLeftDivStyle({ width: btnRestartRef.current?.offsetWidth });
	}, []);

	const handleRestartClick = () => {
		dispatch(fieldActions.resetMatrix());
		dispatch(statActions.setScore(0));
	};
	return (
		<div className={styles.panel}>
			{/* <div style={leftEmptyDivStyle}> */}
			{/* <SettingsSvg className={styles.settingsImg} /> */}
			{/* </div> */}
			<div className={styles.scoreCont}>
				<span className={styles.pointsLabel}>Очки:</span>
				<span className={styles.pointsCount}>{points}</span>
			</div>
			<button ref={btnRestartRef} className={styles.restartBtn} onClick={handleRestartClick}>
				Перезапустить
			</button>
		</div>
	);
};

export default Panel;
