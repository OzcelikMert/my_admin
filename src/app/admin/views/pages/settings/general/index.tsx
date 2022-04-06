import React, {Component, createRef, RefObject} from 'react'
import {Tab, Tabs} from "react-bootstrap";
import JoditEditor from "jodit-react";
import moment from "moment";
import Select from "react-select";
import $ from "jquery";

type PageState = {} & any;

type PageProps = {} & any;

const Status = {
    ACTIVE: 1,
    PENDING: 2,
    DELETED: 3,
    BANNED: 4,
    DISABLED: 5
}

const Role = {
    ADMIN: 1,
    USER: 2,
    AUTHOR: 3,
    EDITOR: 4
}

export class PageUserAdd extends Component<PageProps, PageState> {
  state = {
      settingsData: [
          {id: 1, title: `Write Content`, group: 1, active: false},
          {id: 2, title: `Delete Content`, group: 1, active: false},
          {id: 3, title: `Edit Content`, group: 1, active: false},
      ],
      settingsGroupData: [
          {id: 1, title: `User`},
          {id: 1, title: `Content`},
          {id: 1, title: `Website`}
      ]
  }

  FormInput = (props: {title: string, type: string, required?: boolean, onChange?: any, value?: any, className?: any}) => {
      let input: JSX.Element;
      switch (props.type) {
          case `textarea`:
              input = <textarea className={`field textarea ${typeof props.className !== "undefined" ? props.className : ``}`} placeholder=" " required={props.required} onChange={props.onChange} >{props.value}</textarea>;
              break;
          default:
              input = <input className={`field ${typeof props.className !== "undefined" ? props.className : ``}`} type={props.type} placeholder=" " required={props.required} onChange={props.onChange} value={props.value}/>;
              break;
      }
      return (
        <label className="input">
            {input}
            <span className="label">{props.title}</span>
        </label>
      );
  }

  Form = (props: any) => {
      let self = this;
      return (
          <form className="theme-form">
              <div className="row">
                  {
                      this.state.settingsGroupData.map(item_group => (
                          <div className="col-md-7 mb-3">
                              <div className="input static">
                                  <span className="label">{item_group.title}</span>
                                  <div className="field row d-flex">
                                      {
                                          this.state.settingsData.map(item => (
                                              item_group.id === item.group ?
                                                  <div className="col-md-4 form-check form-check-primary">
                                                      <label className="form-check-label">
                                                          <input type="checkbox" className="form-check-input"/> {item.title}
                                                          <i className="input-helper"></i>
                                                      </label>
                                                  </div> : null
                                          ))
                                      }
                                  </div>
                              </div>
                          </div>
                      ))
                  }
              </div>
          </form>
      );
  }

  render() {
    return (
        <div className="page-settings">
          <div className="gird-margin stretch-card">
            <div className="card">
              <div className="card-body">
                  <div className="theme-tabs">
                    <this.Form />
                  </div>
                  <button className="btn btn-gradient-success float-end btn-save">Save</button>
              </div>
            </div>
          </div>
        </div>
    )
  }
}

export default PageUserAdd;
