import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MapComponent from './MapComponent'; // 
import './App.css'; // Import your styles

function App() {
    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <h1>Vehicle Tracking System</h1>
                </header>
                <main>
                    <Routes>
                        <Route path="/" exact>
                            <MapComponent /> 
                        </Route>
                       
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
