import React, {Component, createRef, RefObject} from 'react'
import ThemeInputType from "../../components/input/type";
import API from "../../../../lib/api";

type PageState = {} & any;

type PageProps = {} & any;

export class PageLogin extends Component<PageProps, PageState> {
    refUsername: RefObject<HTMLInputElement> = createRef();
    refPassword: RefObject<HTMLInputElement> = createRef();
    refKeepMe: RefObject<HTMLInputElement> = createRef();

    state = {}

    onSubmit = (event: any) => {
        event.preventDefault();
        console.log(
            this.refUsername.current!.value,
            this.refPassword.current!.value,
            this.refKeepMe.current!.checked
        )
        API.get(`user/25`)
            .then(res => {
                console.log(res)
            });
    }

    render() {
      return (
          <div className="page-login">
              <div className="d-flex align-items-stretch auth auth-img-bg h-100">
                  <div className="row flex-grow">
                      <div className="col-lg-6 d-flex align-items-center justify-content-center bg-white login-half-form">
                          <div className="auth-form-transparent text-left p-3">
                              <div className="brand-logo">
                                  {
                                   //<img src="/demo/purple/react/template/demo_1/preview/static/media/logo.a79624ec.svg" alt="logo" />
                                  }
                              </div>
                              <h4 className="text-center">Panel Login</h4>
                              <form className="pt-3" onSubmit={(event:any) => this.onSubmit(event)}>
                                  <div className="row">
                                      <div className="col-md-12 mb-3">
                                          <ThemeInputType title="Username" type="text" required={true} ref={this.refUsername}/>
                                      </div>
                                      <div className="col-md-12 mb-3">
                                          <ThemeInputType title="Password" type="password" required={true} ref={this.refPassword}/>
                                      </div>
                                      <div className="col-md-12 mb-3">
                                          <div className="form-check">
                                              <label className="form-check-label text-muted">
                                                  <input type="checkbox" className="form-check-input" ref={this.refKeepMe} />
                                                  <i className="input-helper"></i>Keep me signed in
                                              </label>
                                          </div>
                                      </div>
                                      <div className="col-md-12">
                                          <button type="submit" className="btn btn-block btn-gradient-primary btn-lg font-weight-medium auth-form-btn w-100">Login</button>
                                      </div>
                                  </div>
                              </form>
                          </div>
                      </div>
                      <div className="col-lg-6 login-half-bg d-flex flex-row"></div>
                  </div>
              </div>
          </div>
      )
    }
}

export default PageLogin;
