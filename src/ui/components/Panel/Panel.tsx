import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fieldActions } from '../../../domain/store/slices/field/fieldSlice';
import styles from './Panel.module.css';

interface IPanelProps {
    points: number;
}

const Panel = (props: IPanelProps) => {
    const dispatch = useDispatch();

    const btnRestartRef = useRef<HTMLButtonElement>(null);
    const [leftEmptyDivStyle, setLeftDivStyle] = useState({});

    useEffect(() => {
        // console.log(btnRestartRef.current?.offsetWidth);
        setLeftDivStyle({ width: btnRestartRef.current?.offsetWidth });
    }, []);

    const handleRestartClick = () => {
        dispatch(fieldActions.resetMatrix());
    };

    return (
        <div className={styles.panel}>
            <div style={leftEmptyDivStyle}></div>
            <div className={styles.scoreCont}>
                <span className={styles.pointsLabel}>Очки:</span>
                <span className={styles.pointsCount}>{props.points}</span>
            </div>
            <button ref={btnRestartRef} className={styles.restartBtn} onClick={handleRestartClick}>
                Перезапустить
            </button>
        </div>
    );
};

export default Panel;
