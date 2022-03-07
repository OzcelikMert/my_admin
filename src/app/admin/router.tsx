import React, { Component,Suspense, lazy } from 'react';
import {
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import Spinner from './views/tools/spinner';

const Home = React.lazy(() => import('./views/pages/home'));
const Gallery = {
    List: React.lazy(() => import('./views/pages/gallery/list')),
    Upload: React.lazy(() => import('./views/pages/gallery/upload'))
};
const Post = {
    List: React.lazy(() => import('./views/pages/post/list')),
    Add: React.lazy(() => import('./views/pages/post/add'))
};

class AppRouter extends Component {
  render () {
    return (
        <Suspense fallback={<Spinner/>}>
            <Routes>
                <Route path="/dashboard" element={ <Home /> } />

                <Route path="/gallery/list" element={ <Gallery.List /> } />
                <Route path="/gallery/upload" element={ <Gallery.Upload /> } />

                <Route path="/blog/list" element={ <Post.List /> } />
                <Route path="/blog/add" element={ <Post.Add /> } />

                <Route
                    path="*"
                    element={<Navigate to="/dashboard" />}
                />
            </Routes>
        </Suspense>
    );
  }
}

export default AppRouter;