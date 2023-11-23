import Field from './ui/components/Field/Field';
import Panel from './ui/components/Panel/Panel';
import './App.css';

const App = () => {
    return (
        <div className='App'>
            <Panel points={0} />
            <Field />
        </div>
    );
};

export default App;
