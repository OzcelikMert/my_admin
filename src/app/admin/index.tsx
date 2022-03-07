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
    breadCrumbTitle: ""
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
    console.log("ROUTE CHANGED");
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
    return (
      <div className="container-scroller">
        <Navbar/>
        <div className="container-fluid page-body-wrapper">
          <Sidebar/>
          <div className="main-panel">
            <div className="content-wrapper">
              {
                this.state.breadCrumbTitle !== ""
                    ? <div className="page-header">
                      <h3 className="page-title">
                      <span className="page-title-icon bg-gradient-primary text-white mr-2">
                        <i className="mdi mdi-home"></i>
                      </span> {this.state.breadCrumbTitle} </h3>
                    </div>
                    : ""
              }
              <AppRouter/>
            </div>
            <Footer/>
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
