import Field from './ui/components/Field/Field';
import Panel from './ui/components/Panel/Panel';
import './App.css';
import { useState } from 'react';
import { buildStartMatrix } from './domain/useCases/buildStartMatrix/buildStartMatrix';
import { buildPath } from './domain/useCases/buildPath/buildPath';

const App = () => {
    return (
        <div className='App'>
            <Panel points={0} />
            <Field />
        </div>
    );
};

export default App;
