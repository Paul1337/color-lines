import Field from './components/Field/Field';
import Panel from './components/Panel/Panel';
import './App.css';
import { useState } from 'react';
import { IPoint, TMatrix } from './Model/model';

const StartBallsCount = 3;
const Dimention = 8;
const BallTypesCount = 5;

const mixMatrix = (matrix: TMatrix) => {
    return matrix;
};

const buildStartMatrix = () => {
    const matrix = new Array(Dimention).fill(new Array(Dimention).fill(null));
    for (let i = 0; i < StartBallsCount; i++) {
        const rowInd = Math.floor(i / Dimention);
        const colInd = i % Dimention;
        matrix[rowInd][colInd] = Math.floor(Math.random() * BallTypesCount);
    }

    mixMatrix(matrix);

    return matrix;
};

const App = () => {
    const [matrix, setMatrix] = useState<TMatrix>(buildStartMatrix());
    const [score, setScore] = useState<number>(0);
    const [selected, setSelected] = useState<IPoint | null>(null);

    return (
        <div className='App'>
            <Panel points={0} />
            <Field matrix={matrix} />
        </div>
    );
};

export default App;
