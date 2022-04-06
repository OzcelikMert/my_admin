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
  refContent: RefObject<any> = createRef();

  state = {
      formActiveKey: `general`,
      formData: {
          content: ``,
          title: ``,
          startDate: new Date()
      },
      selectedRole: {value: Role.USER, label: "User"},
      roleData: [
          {value: Role.USER, label: "User"},
          {value: Role.AUTHOR, label: "Author"},
          {value: Role.EDITOR, label: "Editor"}
      ],
      selectedStatus: {value: Status.ACTIVE, label: "Active"},
      statusData: [
          {value: Status.ACTIVE, label: "Active"},
          {value: Status.PENDING, label: "Pending"},
          {value: Status.DISABLED, label: "Disabled"},
          {value: Status.BANNED, label: "Banned"},
      ],
      permissionsData: [
          {id: 1, title: `Write Content`, group: 1, active: false},
          {id: 2, title: `Delete Content`, group: 1, active: false},
          {id: 3, title: `Edit Content`, group: 1, active: false},
      ],
      permissionsGroupData: [
          {id: 1, title: `Content`},
          {id: 1, title: `Content`},
          {id: 1, title: `Content`},
          {id: 1, title: `Content`}
      ]
  }

  componentDidMount() {
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

  FormSelect = (props: any) => {
      return (
          <label className="input static">
              <span className="label">{props.title}</span>
              <div className="field">
                  <Select
                      closeMenuOnSelect={props.closeMenuOnSelect}
                      defaultValue={props.defaultValue}
                      value={props.value}
                      onChange={props.onChange}
                      options={props.options}
                      placeholder={props.placeholder}
                      isMulti={props.isMulti}
                  />
              </div>
          </label>
      );
  }

  onChangeStartDate = (event: any) => {
      let formData = {...this.state.formData};
      formData.startDate = event.target.value;
      this.setState({formData: formData});
  }


  onChangeRole = (selectedOption: any) => {
      this.setState({
          selectedRole: selectedOption
      });
  }

  onChangeStatus = (selectedOption: any) => {
      this.setState({
          selectedStatus: selectedOption
      });
  }

  TabGeneral = (props: any) => {
      let self = this;
     return (
         <form className="theme-form">
             <div className="row">
                 <div className="col-md-7 mb-3">
                    <this.FormInput title="Name*" type="text" required={true}/>
                 </div>
                 <div className="col-md-7 mb-3">
                     <this.FormInput title="E-mail*" type="email" required={true}/>
                 </div>
                 <div className="col-md-7 mb-3">
                     <this.FormInput title="Username*" type="text" required={true}/>
                 </div>
                 <div className="col-md-7 mb-3">
                     <this.FormInput title="Password*" type="text" required={true}/>
                 </div>
                 <div className="col-md-7 mb-3">
                     <this.FormSelect
                         title="Role*"
                         defaultValue={this.state.selectedRole}
                         value={this.state.selectedRole}
                         onChange={(selectedOption: any) => this.onChangeRole(selectedOption)}
                         options={this.state.roleData}
                         placeholder="Select Role"
                         isMulti={false}
                     />
                 </div>
                 <div className="col-md-7 mb-3">
                     <this.FormSelect
                         title="Status*"
                         defaultValue={this.state.selectedStatus}
                         value={this.state.selectedStatus}
                         onChange={(selectedOption: any) => this.onChangeStatus(selectedOption)}
                         options={this.state.statusData}
                         placeholder="Select status"
                         isMulti={false}
                     />
                 </div>
                 {
                     this.state.selectedStatus.value === Status.BANNED ?
                         <div className="col-md-7 mb-3">
                             <div className="mb-3">
                                 <this.FormInput title="End Date*" type="date" value={moment(this.state.formData.startDate).format("YYYY-MM-DD")} onChange={(event: any) => this.onChangeStartDate(event)} />
                             </div>
                             <div className="mb-3">
                                 <this.FormInput title="Comment" type="textarea"/>
                             </div>
                         </div> : null
                 }
             </div>
         </form>
     );
  }

    TabPermissions = (props: any) => {
        let self = this;
        return (
            <form className="theme-form">
                <div className="row">
                    {
                        this.state.permissionsGroupData.map(item_group => (
                            <div className="col-md-7 mb-3">
                                <div className="input static">
                                    <span className="label">{item_group.title}</span>
                                    <div className="field row d-flex">
                                        {
                                            this.state.permissionsData.map(item_perm => (
                                                item_group.id === item_perm.group ?
                                                    <div className="col-md-4 form-check form-check-primary">
                                                        <label className="form-check-label">
                                                            <input type="checkbox" className="form-check-input"/> {item_perm.title}
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
        <div className="page-user">
          <div className="gird-margin stretch-card">
            <div className="card">
              <div className="card-body">
                  <div className="theme-tabs">
                    <Tabs
                        onSelect={(key: any) => this.setState({formActiveKey: key})}
                        activeKey={this.state.formActiveKey}
                        className="mb-5"
                        transition={false}>
                        <Tab eventKey="general" title="General">
                            <this.TabGeneral/>
                        </Tab>
                        <Tab eventKey="permissions" title="Permissions">
                            <this.TabPermissions/>
                        </Tab>
                    </Tabs>
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
