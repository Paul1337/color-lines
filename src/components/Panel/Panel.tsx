import { CSSProperties, useContext, useEffect, useRef, useState } from 'react';
import styles from './Panel.module.css';
import { AppContext } from '../../App';
import { buildStartMatrix } from '../../Model/useCases/buildStartMatrix/buildStartMatrix';

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

    const context = useContext(AppContext);

    const handleClick = () => {
        context?.setMatrix(buildStartMatrix());
        context?.setSelected(null);
    };

    return (
        <div className={styles.panel}>
            <div style={leftEmptyDivStyle}></div>
            <div className={styles.scoreCont}>
                <span className={styles.pointsLabel}>Очки:</span>
                <span className={styles.pointsCount}>{props.points}</span>
            </div>
            <button ref={btnRestartRef} className={styles.restartBtn} onClick={handleClick}>
                Перезапустить
            </button>
        </div>
    );
};

export default Panel;
