import { FC } from 'react';
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
    const dispatch = useDispatch();

    const handleCellClick = (point: IPoint) => {
        if (matrix[point.y][point.x] !== null) {
            dispatch(fieldActions.setSelected(point));
        } else {
            if (selected) {
                const path = buildPath(selected, point, matrix);
                dispatch(
                    moveBallActions.setMovingBall({
                        ballPos: selected,
                        path,
                    })
                );
            }
        }
    };

    return (
        <div className={styles.field}>
            {matrix.map((row, y) =>
                row.map((el, x) => (
                    <Cell
                        size={config.cellSize}
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
