import { TMatrix } from '../../Model/model';
import Cell from '../Cell/Cell';
import styles from './Field.module.css';

interface IFieldProps {
    matrix: TMatrix;
}

const Field = ({ matrix }: IFieldProps) => {
    return (
        <div className={styles.field}>
            {matrix.map((row, y) =>
                row.map((el, x) => <Cell key={y * row.length + x} ballType={el} position={[x, y]} />)
            )}
        </div>
    );
};

export default Field;
