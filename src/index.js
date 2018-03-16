import React from 'react'
import ReactDom from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Keras from './keras'


ReactDom.render((
  <Router>
    <div>
      <Route exact path='/' component={Keras} />
    </div>
  </Router>
), document.getElementById('root'));
