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
  state?: string | Array<string>,
  subPaths?: Array<SideBarPath>
}

class Sidebar extends Component<PageProps, PageState> {
  state = {
    isMenuOpen: {
      Pages: false,
      Blogs: false,
      Portfolios: false,
      Sliders: false,
      References: false,
      Settings: false,
      Users: false
    }
  };

  get sidebarData (): {Paths: Array<SideBarPath>} {
    return {
      Paths: [
        {path: `/dashboard`, icon: `home`, title: `Dashboard`},
        {path: `/gallery`, icon: `home`, title: `Gallery`},
        {
          path: `/page`, icon: `home`, title: `Pages`, state: `Pages`, subPaths: [
            {path: `/add`, icon: `home`, title: `Add`},
            {path: `/list`, icon: `home`, title: `List`}
          ]
        },
        {
          path: `/blog`, icon: `home`, title: `Blogs`, state: `Blogs`, subPaths: [
            {path: `/add`, icon: `home`, title: `Add`},
            {path: `/list`, icon: `home`, title: `List`}
          ]
        },
        {
          path: `/portfolio`, icon: `home`, title: `Portfolios`, state: `Portfolios`, subPaths: [
            {path: `/add`, icon: `home`, title: `Add`},
            {path: `/list`, icon: `home`, title: `List`}
          ]
        },
        {
          path: `/slider`, icon: `home`, title: `Sliders`, state: `Sliders`, subPaths: [
            {path: `/add`, icon: `home`, title: `Add`},
            {path: `/list`, icon: `home`, title: `List`}
          ]
        },
        {
          path: `/references`, icon: `home`, title: `References`, state: `References`, subPaths: [
            {path: `/add`, icon: `home`, title: `Add`},
            {path: `/list`, icon: `home`, title: `List`}
          ]
        },
        {
          path: `/settings`, icon: `home`, title: `Settings`, state: `Settings`, subPaths: [
            {
              path: `/users`, icon: `home`, title: `Users`, state: `Users`, subPaths: [
                {path: `/add`, icon: `home`, title: `Add`},
                {path: `/list`, icon: `home`, title: `List`}
              ]
            }
          ]
        },
      ]
    }
  }

  toggleMenuState(menuState: any) {
    if(Array.isArray(menuState)){
      menuState.forEach(item => {
        this.toggleMenuState(item);
      })
      return;
    }
    try {
      // @ts-ignore
      if (this.state.isMenuOpen[menuState]) {
        this.setState((state: any) => { state.isMenuOpen[menuState] = false; return state;});
      } else {
        Object.keys(this.state.isMenuOpen).forEach(i => {
          this.setState((state: any) => { state.isMenuOpen[i] = false; return state;});
        });
        this.setState((state: any) => { state.isMenuOpen[menuState] = true; return state;});
      }
    }catch (e) {
      console.log(`E`)
    }
    console.log(this.state);
  }

  componentDidUpdate(prevProps: any) {
    if (this.props.router.location !== prevProps.router.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    (document.querySelector('#sidebar') as HTMLDivElement).classList.remove('active');
  }

  sidebarItem(props: SideBarPath) : JSX.Element {
    let self = this;

    function hasChild(_props: SideBarPath): JSX.Element {
      return (
        <Link className={`nav-link ${self.isPathActive(_props.path) ? 'active' : ''}`} to={_props.path}>
          <span className="menu-title"><Trans>{_props.title}</Trans></span>
          <i className={`mdi mdi-${_props.icon} menu-icon`}></i>
        </Link>
      );
    }

    function hasChildren(_props: SideBarPath): JSX.Element {
      // @ts-ignore
      let state = self.state.isMenuOpen[_props.state];
      console.log(`hasChildren`, _props.state, state);
      return (
          <div>
            <div className={ `nav-link ${state ? 'menu-expanded' : ''}` } onClick={ () => self.toggleMenuState(_props.state) } data-toggle="collapse">
              <span className="menu-title"><Trans>{_props.title}</Trans></span>
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
          </div>
      );
    }

    return (
        <li className={`nav-item ${this.isPathActive(props.path) ? 'active' : ''}`}>
          {
            (typeof props.subPaths === "undefined") ? hasChild(props) : hasChildren(props)
          }
        </li>
    )
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

  isPathActive(path: any) {
    return this.props.router.location.pathname.startsWith(path);
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

}

export default withRouter(Sidebar);