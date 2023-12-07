import Field from './ui/components/Field/Field';
import Panel from './ui/components/Panel/Panel';
import './App.css';
import { useSelector } from 'react-redux';
import { RootState } from './domain/store/store';
import { LoseModal } from './ui/components/LoseModal/LoseModal';

const App = () => {
    const endGame = useSelector((state: RootState) => state.field.endGame);

    return (
        <div className='App'>
            <Panel />
            {endGame && <LoseModal />}
            <Field />
        </div>
    );
};

export default App;
