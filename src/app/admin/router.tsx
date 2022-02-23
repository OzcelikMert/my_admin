import React, { Component,Suspense, lazy } from 'react';
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import Spinner from './views/tools/spinner';

const Home = lazy(() => import('./views/pages/home'));

class Router extends Component {
  render () {
    return (
      <Suspense fallback={<Spinner/>}>
          <BrowserRouter>
              <Routes>
                  <Route index element={ Home } />
                  <Route path="*" element={<Navigate to="/" />}/>
              </Routes>
          </BrowserRouter>
      </Suspense>
    );
  }
}

export default Router;