import React, { Component,Suspense, lazy } from 'react';
import {
    Routes,
    Route
} from "react-router-dom";

import Spinner from './views/tools/spinner';

const Home = React.lazy(() => import('./views/pages/home'));
/*
<Suspense fallback={<Spinner/>}>
        <Routes>
            <Route path="/dashboard" element={ Home } />
        </Routes>
</Suspense>

<Routes>
            <Route path="/dashboard" element={
                <React.Suspense fallback={<Spinner/>}>
                    <Home />
                </React.Suspense>
            } />
        </Routes>
 */
class AppRouter extends Component {
  render () {
    return (
        <Suspense fallback={<Spinner/>}>
            <Routes>
                <Route path="/dashboard" element={ <Home /> } />
            </Routes>
        </Suspense>
    );
  }
}

export default AppRouter;