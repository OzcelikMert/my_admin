import React, {Component, createRef, RefObject} from 'react'
import {Tab, Tabs} from "react-bootstrap";
import Select from "react-select";
import $ from "jquery";
import ThemeInputTags from "../../../components/input/tags";

type PageState = {} & any;

type PageProps = {} & any;

export class PageSettingsSEO extends Component<PageProps, PageState> {
  refContent: RefObject<any> = createRef();

  state = {
      formActiveKey: `general`,
      formData: {
          content: ``,
          title: ``,
          startDate: new Date()
      },
      selectedSeparator: {value: 1, label: "|"},
      separatorData: [
          {value: 1, label: "|"},
          {value: 2, label: ">"},
          {value: 3, label: "-"}
      ],
      selectedTag: [ {id: ``, text: ``} ],
      selectedTag2: [],
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

  FormInput = (props: {title: string, type: string, required?: boolean, onChange?: any, value?: any, className?: any, maxLength?: number}) => {
      let input: JSX.Element;
      switch (props.type) {
          case `textarea`:
              input = <textarea className={`field textarea ${typeof props.className !== "undefined" ? props.className : ``}`} placeholder=" " required={props.required} onChange={props.onChange} maxLength={props.maxLength} >{props.value}</textarea>;
              break;
          default:
              input = <input className={`field ${typeof props.className !== "undefined" ? props.className : ``}`} type={props.type} placeholder=" " required={props.required} onChange={props.onChange} value={props.value} maxLength={props.maxLength}/>;
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
                      onKeyDown={props.onKeyDown}
                      isSearchable={props.isSearchable}
                  />
              </div>
          </label>
      );
  }

  onChangeSeparator = (selectedOption: any) => {
      this.setState({
          selectedSeparator: selectedOption
      });
  }

    onChangeTag2 = (selectedOption: any) => {
        console.log(selectedOption);
        this.setState({
            selectedTag2: selectedOption
        });
    }


    Form = (props: any) => {
      let self = this;
     return (
         <form className="theme-form">
             <div className="row">
                 <div className="col-md-7 mb-3">
                    <this.FormInput title="Website Name*" type="text" required={true} maxLength={250}/>
                 </div>
                 <div className="col-md-7 mb-3">
                     <this.FormInput title="Description*" type="textarea" required={true} maxLength={120}/>
                 </div>
                 <div className="col-md-7 mb-3">
                     <ThemeInputTags
                         title="Website Tags"
                         value={this.state.selectedTag2}
                         onChange={(selectedOption: any) => this.onChangeTag2(selectedOption)}
                         placeholder="Write and press enter."
                     />
                 </div>
                 <div className="col-md-7 mb-3">
                     <this.FormSelect
                         title="Website Title Separator"
                         value={this.state.selectedSeparator}
                         onChange={(selectedOption: any) => this.onChangeSeparator(selectedOption)}
                         options={this.state.separatorData}
                         placeholder="Select Role"
                         isMulti={false}
                         isSearchable={false}
                     />
                 </div>
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
                  <this.Form />
                  <button className="btn btn-gradient-success float-end btn-save">Save</button>
              </div>
            </div>
          </div>
        </div>
    )
  }
}

export default PageSettingsSEO;
