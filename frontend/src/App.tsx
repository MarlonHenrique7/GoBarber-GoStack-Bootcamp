import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import GlobalStyle from './styles/global';

import RoutesApp from './routes';
import AppProvider from './hooks';

const App: React.FC = () => {
    return (
        <Router>
            <AppProvider>
                <RoutesApp />
            </AppProvider>
            <GlobalStyle />
        </Router>
    );
};

export default App;
