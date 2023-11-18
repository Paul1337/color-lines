import Field from './components/Field/Field';
import Panel from './components/Panel/Panel';
import './App.css';
import { createContext, useEffect, useState } from 'react';
import { IPoint, TMatrix } from './Model/matrix/types';
import { buildStartMatrix } from './store/useCases/buildStartMatrix/buildStartMatrix';
import { buildPath } from './store/useCases/buildPath/buildPath';

export interface IAppContext {
    setMatrix: (matrix: TMatrix) => void;
    setSelected: (cell: IPoint | null) => void;
}

export const AppContext = createContext<IAppContext | null>(null);

const App = () => {
    const [matrix, setMatrix] = useState<TMatrix>(buildStartMatrix);
    const [score, setScore] = useState<number>(0);
    const [selected, setSelected] = useState<IPoint | null>(null);

    const handleCellClick = (point: IPoint) => {
        if (matrix[point.y][point.x] !== null) {
            setSelected(point);
        } else {
            if (selected) {
                const path = buildPath(selected, point, matrix);
            }
        }
    };

    const contextValue = {
        setMatrix,
        setSelected,
    };

    return (
        <AppContext.Provider value={contextValue}>
            <div className='App'>
                <Panel points={0} />
                <Field matrix={matrix} selected={selected} onCellClick={handleCellClick} />
            </div>
        </AppContext.Provider>
    );
};

export default App;
