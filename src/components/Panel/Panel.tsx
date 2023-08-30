import { CSSProperties, useEffect, useRef, useState } from 'react';
import styles from './Panel.module.css';

interface IPanelProps {
    points: number;
}

const Panel = (props: IPanelProps) => {
    const btnRestartRef = useRef<HTMLButtonElement>(null);
    const [leftEmptyDivStyle, setLeftDivStyle] = useState({});

    useEffect(() => {
        // console.log(btnRestartRef.current?.offsetWidth);
        setLeftDivStyle({ width: btnRestartRef.current?.offsetWidth });
    }, []);

    return (
        <div className={styles.panel}>
            <div style={leftEmptyDivStyle}></div>
            <div className={styles.scoreCont}>
                <span className={styles.pointsLabel}>Очки:</span>
                <span className={styles.pointsCount}>{props.points}</span>
            </div>
            <button ref={btnRestartRef} className={styles.restartBtn}>
                Перезапустить
            </button>
        </div>
    );
};

export default Panel;
