import React, { Component } from 'react';
import '../../assets/app/admin/styles/index.scss';
import AppRouter from './router';
import Navbar from './views/tools/navbar';
import Sidebar from './views/tools/sidebar';
import Footer from './views/tools/footer';

import {
  useLocation,
  useNavigate,
  useParams
} from "react-router-dom";

type PageState = {
} & any;

type PageProps = {} & any;

class Admin extends Component<PageProps, PageState> {
  state = {
    isFullPageLayout: true
  };

  constructor(prop: any) {
    super(prop);
  }

  componentDidMount() {
    this.onRouteChanged();
  }

  render () {
    let navbarComponent = !this.state.isFullPageLayout ? <Navbar/> : '';
    let sidebarComponent = !this.state.isFullPageLayout ? <Sidebar/> : '';
    let footerComponent = !this.state.isFullPageLayout ? <Footer/> : '';
    return (
      <div className="container-scroller">
        { navbarComponent }
        <div className="container-fluid page-body-wrapper">
          { sidebarComponent }
          <div className="main-panel">
            <div className="content-wrapper">
              <AppRouter/>
            </div>
            { footerComponent }
          </div>
        </div>
      </div>
    );
  }

  componentDidUpdate(prevProps: any) {
    if (this.props.router.location !== prevProps.router.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    console.log("ROUTE CHANGED");
    const body = document.querySelector('body') as HTMLBodyElement;
    if(this.props.router.location.pathname === '/layout/RtlLayout') {
      body.classList.add('rtl');
    } else {
      body.classList.remove('rtl')
    }
    window.scrollTo(0, 0);
    const fullPageLayoutRoutes = ['/user-pages/login-1', '/user-pages/register-1', '/user-pages/lockscreen', '/error-pages/error-404', '/error-pages/error-500', '/general-pages/landing-page'];
    for ( let i = 0; i < fullPageLayoutRoutes.length; i++ ) {
      if (this.props.router.location.pathname === fullPageLayoutRoutes[i]) {
        this.setState({
          isFullPageLayout: true
        });
        (document.querySelector('.page-body-wrapper') as HTMLDivElement).classList.add('full-page-wrapper');
        break;
      } else {
        this.setState({
          isFullPageLayout: false
        });
        (document.querySelector('.page-body-wrapper') as HTMLDivElement).classList.remove('full-page-wrapper');
      }
    }
  }

}

export function withRouter(Component: any) {
  function ComponentWithRouterProp(props: any) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return (
        <Component
            {...props}
            router={{ location, navigate, params }}
        />
    );
  }

  return ComponentWithRouterProp;
}

export default withRouter(Admin);
