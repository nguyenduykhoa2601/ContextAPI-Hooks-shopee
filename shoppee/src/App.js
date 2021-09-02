
import React from 'react';
import {
    BrowserRouter as Router
} from "react-router-dom";
import './App.css';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import MainPages from './components/mainpages/MainPages';

import { DataProvider } from './GlobalState';


function App() {
    return (
        <DataProvider>
            <Router>
                <div className="app">
                    <Header />
                    <MainPages />
                    <Footer />
                </div>
                
            </Router>
        </DataProvider>
    );

}

export default App;
