import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Collapse } from 'react-bootstrap';
import { Trans } from 'react-i18next';
import {withRouter} from "../../index";

type PageState = {} & any;

type PageProps = {} & any;

interface SideBarPath {
  path: string,
  title: string,
  icon?: string,
  state?: string,
  subPaths?: Array<SideBarPath>
}

type SideBarItemProps = {
  currentPath: string,
  setStateMenuOpens: Function,
  openStates: any,
  sidebarData: Array<SideBarPath>
} & SideBarPath

class Sidebar extends Component<PageProps, PageState> {
  state = {
    isMenuOpen: {
      Pages: false,
      Blogs: false,
      Portfolios: false,
      Sliders: false,
      References: false,
      Settings: false,
      Users: false,
      Gallery: false
    }
  };

  setStateMenuOpens(paths: Array<SideBarPath>, activePath: string | null = null){
    paths.forEach(item => {
      if ((activePath !== null && activePath.search(item.path) > -1) || (activePath === null && this.isPathActive(item.path))) {
        if(typeof item.state !== "undefined") {
          let status = true;
          // @ts-ignore
          if(this.state.isMenuOpen[item.state] && activePath !== null && activePath.endsWith(item.path)) status = false;
          this.setState((state: any) => { // @ts-ignore
            state.isMenuOpen[item.state] = status; return state;})
          if(typeof item.subPaths !== "undefined"){
            this.setStateMenuOpens(item.subPaths, activePath);
          }
        }
      }else{
        if(typeof item.state !== "undefined") {
          this.setState((state: any) => { // @ts-ignore
            state.isMenuOpen[item.state] = false; return state;})
        }
      }
    });
  }

  get sidebarData (): {Paths: Array<SideBarPath>} {
    return {
      Paths: [
        {path: `/dashboard`, icon: `home`, title: `Dashboard`},
        {path: `/gallery`, icon: `home`, title: `Gallery`, state: `Gallery`, subPaths: [
            {path: `/upload`, icon: `home`, title: `Upload`},
            {path: `/list`, icon: `home`, title: `List`}
          ]
        },
        {path: `/page`, icon: `home`, title: `Pages`, state: `Pages`, subPaths: [
            {path: `/add`, icon: `home`, title: `Add`},
            {path: `/list`, icon: `home`, title: `List`}
          ]
        },
        {path: `/blog`, icon: `home`, title: `Blogs`, state: `Blogs`, subPaths: [
            {path: `/add`, icon: `home`, title: `Add`},
            {path: `/list`, icon: `home`, title: `List`}
          ]
        },
        {path: `/portfolio`, icon: `home`, title: `Portfolios`, state: `Portfolios`, subPaths: [
            {path: `/add`, icon: `home`, title: `Add`},
            {path: `/list`, icon: `home`, title: `List`}
          ]
        },
        {path: `/slider`, icon: `home`, title: `Sliders`, state: `Sliders`, subPaths: [
            {path: `/add`, icon: `home`, title: `Add`},
            {path: `/list`, icon: `home`, title: `List`}
          ]
        },
        {path: `/reference`, icon: `home`, title: `References`, state: `References`, subPaths: [
            {path: `/add`, icon: `home`, title: `Add`},
            {path: `/list`, icon: `home`, title: `List`}
          ]
        },
        {path: `/settings`, icon: `home`, title: `Settings`, state: `Settings`, subPaths: [
            {
              path: `/user`, icon: `home`, title: `Users`, state: `Users`, subPaths: [
                {path: `/add`, icon: `home`, title: `Add`},
                {path: `/list`, icon: `home`, title: `List`}
              ]
            },
            {path: `/seo`, icon: `home`, title: `SEO`},
            {path: `/general`, icon: `home`, title: `General`},
          ]
        },
      ]
    }
  }

  sidebarItem(props: SideBarPath) {
    let self = this;

    function hasChild(_props: SideBarPath) {
      return (
          <Link className={`nav-link ${self.isPathActive(_props.path) ? 'active' : ''}`} to={_props.path}>
            <span className={`menu-title text-capitalize ${self.isPathActive(_props.path) ? 'active' : ''}`}><Trans>{_props.title}</Trans></span>
            <i className={`mdi mdi-${_props.icon} menu-icon`}></i>
          </Link>
      );
    }

    function hasChildren(_props: SideBarPath) {
      // @ts-ignore
      let state = (typeof _props.state === "undefined") ? false : self.state.isMenuOpen[_props.state];
      return (
          <span>
            <div className={ `nav-link ${state ? 'menu-expanded' : ''} ${self.isPathActive(_props.path) ? 'active' : ''}` } onClick={ () => self.toggleMenuState(_props.path) } data-toggle="collapse">
              <span className={`menu-title text-capitalize ${self.isPathActive(_props.path) ? 'active' : ''}`}><Trans>{_props.title}</Trans></span>
              <i className="menu-arrow"></i>
              <i className={`mdi mdi-${_props.icon} menu-icon`}></i>
            </div>
            <Collapse in={state}>
              <ul className="nav flex-column sub-menu">
                {
                  // @ts-ignore
                  _props.subPaths.map(item => {
                    item.path = _props.path + item.path;
                    return (
                        <li className="nav-item">
                          {
                            (typeof item.subPaths === "undefined") ? hasChild(item) : hasChildren(item)
                          }
                        </li>
                    );
                  })
                }
              </ul>
            </Collapse>
          </span>
      );
    }

    return (
        <li className={`nav-item ${self.isPathActive(props.path) ? 'active' : ''}`}>
          {
            (typeof props.subPaths === "undefined") ? hasChild(props) : hasChildren(props)
          }
        </li>
    )
  }

  toggleMenuState(activePath: string) {
    this.setStateMenuOpens(this.sidebarData.Paths, activePath);
  }

  componentDidUpdate(prevProps: any) {
    if (this.props.router.location.pathname !== prevProps.router.location.pathname) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    let self = this;
    (document.querySelector('#sidebar') as HTMLDivElement).classList.remove('active');
    this.setStateMenuOpens(self.sidebarData.Paths);
  }

  isPathActive(path: any) {
    return this.props.router.location.pathname.search(path) > -1;
  }

  componentDidMount() {
    this.onRouteChanged();
    // add class 'hover-open' to sidebar navitem while hover in sidebar-icon-only menu
    const body = document.querySelector('body') as HTMLBodyElement;
    document.querySelectorAll('.sidebar .nav-item').forEach((el) => {

      el.addEventListener('mouseover', function() {
        if(body.classList.contains('sidebar-icon-only')) {
          el.classList.add('hover-open');
        }
      });
      el.addEventListener('mouseout', function() {
        if(body.classList.contains('sidebar-icon-only')) {
          el.classList.remove('hover-open');
        }
      });
    });
  }

  render () {
    return (
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <ul className="nav">

          <li className="nav-item nav-profile">
            <a href="!#" className="nav-link" onClick={evt =>evt.preventDefault()}>
              <div className="nav-profile-image">
                <img src={ require("../../../../assets/images/faces/face1.jpg") } alt="profile" />
                <span className="login-status online"></span> {/* change to offline or busy as needed */}
              </div>
              <div className="nav-profile-text">
                <span className="font-weight-bold mb-2"><Trans>David Grey. H</Trans></span>
                <span className="text-secondary text-small"><Trans>Project Manager</Trans></span>
              </div>
              <i className="mdi mdi-bookmark-check text-success nav-profile-badge"></i>
            </a>
          </li>

          {
            this.sidebarData.Paths.map(item => {
              return this.sidebarItem(item);
            })
          }
        </ul>
      </nav>
    );
  }
}

export default withRouter(Sidebar);