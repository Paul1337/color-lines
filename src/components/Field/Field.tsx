import { IPoint, TMatrix } from '../../Model/matrix/types';
import Cell from '../Cell/Cell';
import styles from './Field.module.css';

interface IFieldProps {
    matrix: TMatrix;
    selected: IPoint | null;
    onCellSelect?: (point: IPoint) => void;
}

const comparePoints = (point1: IPoint | null, point2: IPoint) => {
    return point1 !== null && point1.x === point2.x && point1.y === point2.y;
};

const Field = ({ matrix, selected, onCellSelect }: IFieldProps) => {
    return (
        <div className={styles.field}>
            {matrix.map((row, y) =>
                row.map((el, x) => (
                    <Cell
                        onSelect={() => onCellSelect && onCellSelect({ x, y })}
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
