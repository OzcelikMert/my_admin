import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Admin from "./app/admin/";

ReactDOM.render(
  <BrowserRouter basename="../preview">
    <Admin />
  </BrowserRouter>,
  document.getElementById('root')
);
