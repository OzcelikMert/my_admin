import React, { Component,Suspense, lazy } from 'react';
import {
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import Spinner from './views/tools/spinner';

const Home = lazy(() => import('./views/pages/home'));
/*
<Routes>
                  <Route path="/" element={ Home } />
              </Routes>
 */
class Router extends Component {
  render () {
    return (
      <Suspense fallback={<Spinner/>}>
          <div className='root-page'>

          </div>
      </Suspense>
    );
  }
}

export default Router;