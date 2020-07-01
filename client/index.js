import React from 'react';
import ReactDOM from 'react-dom';
import ReviewHighlights from './components/ReviewHighlights.jsx';
import Reviews from './components/App.jsx';


ReactDOM.render(<ReviewHighlights/>, document.getElementById('Highlights'));
ReactDOM.render(<Reviews/>, document.getElementById('Reviews'));