import React, { Component,Suspense, lazy } from 'react';
import {
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import Spinner from './views/tools/spinner';

const Login = React.lazy(() => import('./views/pages/login'));
const Home = React.lazy(() => import('./views/pages/home'));
const Gallery = {
    List: React.lazy(() => import('./views/pages/gallery/list')),
    Upload: React.lazy(() => import('./views/pages/gallery/upload'))
};
const Post = {
    List: React.lazy(() => import('./views/pages/post/list')),
    Add: React.lazy(() => import('./views/pages/post/add'))
};
const Settings = {
    User: {
        List: React.lazy(() => import('./views/pages/settings/user/list')),
        Add: React.lazy(() => import('./views/pages/settings/user/add'))
    },
    SEO: React.lazy(() => import('./views/pages/settings/seo')),
    General: React.lazy(() => import('./views/pages/settings/general'))
}

class AppRouter extends Component {
  render () {
    return (
        <Suspense fallback={<Spinner/>}>
            <Routes>
                <Route path="/login" element={ <Login /> } />

                <Route path="/dashboard" element={ <Home /> } />

                <Route path="/gallery/list" element={ <Gallery.List /> } />
                <Route path="/gallery/upload" element={ <Gallery.Upload /> } />

                <Route path="/blog/list" element={ <Post.List /> } />
                <Route path="/blog/add" element={ <Post.Add /> } />

                <Route path="/portfolio/list" element={ <Post.List /> } />
                <Route path="/portfolio/add" element={ <Post.Add /> } />

                <Route path="/slider/list" element={ <Post.List /> } />
                <Route path="/slider/add" element={ <Post.Add /> } />

                <Route path="/reference/list" element={ <Post.List /> } />
                <Route path="/reference/add" element={ <Post.Add /> } />

                <Route path="/page/list" element={ <Post.List /> } />
                <Route path="/page/add" element={ <Post.Add /> } />

                <Route path="/settings/user/list" element={ <Settings.User.List /> } />
                <Route path="/settings/user/add" element={ <Settings.User.Add /> } />
                <Route path="/settings/seo" element={ <Settings.SEO /> } />
                <Route path="/settings/general" element={ <Settings.General /> } />

                <Route path="*" element={<Navigate to="/dashboard"/>}/>
            </Routes>
        </Suspense>
    );
  }
}

export default AppRouter;