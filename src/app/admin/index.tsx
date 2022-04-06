import React, { Component } from 'react';
import '../../assets/app/admin/styles/index.scss';
import AppRouter from './router';
import Navbar from './views/tools/navbar';
import Sidebar from './views/tools/sidebar';
import Footer from './views/tools/footer';
import $ from 'jquery';
import {
  useLocation,
  useNavigate,
  useParams
} from "react-router-dom";

type PageState = {} & any;

type PageProps = {} & any;

class Admin extends Component<PageProps, PageState> {
  state = {
    breadCrumbTitle: "",
    isFullPageLayout: false
  };

  constructor(prop: any) {
    super(prop);
  }

  componentDidMount() {
    this.onRouteChanged();
  }

  componentDidUpdate(prevProps: any) {
    if (this.props.router.location.pathname !== prevProps.router.location.pathname) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    const fullPageLayoutRoutes = ['/login'];
    let pageBodyWrapper = (document.querySelector('.page-body-wrapper') as HTMLDivElement);
    if(fullPageLayoutRoutes.includes(this.props.router.location.pathname)){
      this.setState({
        isFullPageLayout: true
      });
      pageBodyWrapper.classList.add('full-page-wrapper');
    }else {
      this.setState({
        isFullPageLayout: false
      });
      pageBodyWrapper.classList.remove('full-page-wrapper');
    }
    this.setBreadCrumbTitle();
  }

  setBreadCrumbTitle() {
    let pageName = ``;
    let sidebarElements = Array.from($(`.sidebar .menu-title.active`));

    sidebarElements.forEach((item: any) => {
      item = $(item);
      pageName += `${item.html()} > `;
    });

    pageName = pageName.slice(0, -3);

    this.setState({breadCrumbTitle: pageName});
  }

  render () {
    let navbarComponent = !this.state.isFullPageLayout ? <Navbar/> : '';
    let sidebarComponent = !this.state.isFullPageLayout ? <Sidebar/> : '';
    let footerComponent = !this.state.isFullPageLayout ? <Footer/> : '';
    let breadCrumbComponent = this.state.breadCrumbTitle !== "" && !this.state.isFullPageLayout ?
        <div className="page-header">
          <h3 className="page-title">
            <span className="page-title-icon bg-gradient-primary text-white mr-2">
              <i className="mdi mdi-home"></i>
            </span> {this.state.breadCrumbTitle}
          </h3>
        </div> : ``;
    return (
      <div className="container-scroller">
        {navbarComponent}
        <div className="container-fluid page-body-wrapper">
          {sidebarComponent}
          <div className="main-panel">
            <div className="content-wrapper">
              {breadCrumbComponent}
              <AppRouter/>
            </div>
            {footerComponent}
          </div>
        </div>
      </div>
    );
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
