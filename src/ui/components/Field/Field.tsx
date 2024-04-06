import { FC, useEffect, useState } from 'react';
import Cell from '../Cell/Cell';
import styles from './Field.module.css';
import { config } from './config';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../domain/store/store';
import { buildPath } from '../../../domain/useCases/buildPath/buildPath';
import { IPoint } from '../../../domain/store/slices/moveBall/model';
import { fieldActions, fieldSlice } from '../../../domain/store/slices/field/fieldSlice';
import { moveBallActions } from '../../../domain/store/slices/moveBall/moveBallSlice';
import { comparePoints } from '../../../lib/comparePoints';

interface IFieldProps {}

const Field: FC<IFieldProps> = (props) => {
    const { matrix, selected } = useSelector((state: RootState) => state.field);
    const moveBallData = useSelector((state: RootState) => state.moveBall);
    const dispatch = useDispatch();

    const handleCellClick = (point: IPoint) => {
        if (matrix[point.y][point.x] !== null) {
            dispatch(fieldActions.setSelected(point));
        } else {
            if (selected && moveBallData.startPos === null && matrix[selected.y][selected.x] !== null) {
                const path = buildPath(selected, point, matrix);
                console.log(path);
                if (path) {
                    dispatch(
                        moveBallActions.setMovingBall({
                            ballPos: selected,
                            endPos: point,
                            path,
                        })
                    );
                }
            }
        }
    };

    const [cellSize, setCellSize] = useState(Math.min(window.innerWidth * 0.08, config.maxCellSize));
    useEffect(() => {
        window.addEventListener('resize', (e) => {
            setCellSize(Math.min(window.innerWidth * 0.08, config.maxCellSize));
        });
    }, []);

    return (
        <div className={styles.field}>
            {matrix.map((row, y) =>
                row.map((el, x) => (
                    <Cell
                        size={cellSize}
                        onClick={() => handleCellClick({ x, y })}
                        isSelected={comparePoints(selected, { x, y })}
                        key={y * row.length + x}
                        ballType={el}
                        position={[x, y]}
                    />
                ))
            )}
        </div>
    );
};

export default Field;
