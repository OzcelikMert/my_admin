import React, {Component, createRef, RefObject} from 'react'
import {Tab, Tabs} from "react-bootstrap";
import JoditEditor from "jodit-react";
import moment from "moment";
import Select from "react-select";
import $ from "jquery";

type PageState = {} & any;

type PageProps = {} & any;

export class PagePostAdd extends Component<PageProps, PageState> {
  refContent: RefObject<any> = createRef();

  state = {
      formActiveKey: `general`,
      formData: {
          content: ``,
          title: ``,
          startDate: new Date()
      },
      selectedCategory: null,
      categoryData: [
          {value: 1, label: "Cat - 1"},
          {value: 2, label: "Cat - 2"},
          {value: 3, label: "Cat - 3"},
          {value: 4, label: "Cat - 4"}
      ],
      selectedTag: null,
      tagData: [
          {value: 1, label: "Tag - 1"},
          {value: 2, label: "Tag - 2"},
          {value: 3, label: "Tag - 3"},
          {value: 4, label: "Tag - 4"}
      ],
      selectedStatus: {value: 1, label: "Active"},
      statusData: [
          {value: 1, label: "Active"},
          {value: 2, label: "In Progress"},
          {value: 3, label: "Pending"}
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

  onChangeContent = (newContent: any) => {
      let formData = {...this.state.formData};
      formData.content = newContent;
      this.setState({formData: formData});
  }

  onChangeCategory = (selectedOption: any) => {
      this.setState({
          selectedCategory: selectedOption
      });
  }

  onChangeTag = (selectedOption: any) => {
      this.setState({
          selectedTag: selectedOption
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
                    <this.FormInput title="Title*" type="text" required={true}/>
                 </div>
                 <div className="col-md-7 mb-3">
                     <JoditEditor
                         ref={this.refContent}
                         value={this.state.formData.content}
                         config={{
                             uploader: { insertImageAsBase64URI: true },
                             showXPathInStatusbar: false,
                             showCharsCounter: false,
                             showWordsCounter: false,
                             toolbarAdaptive: true,
                             askBeforePasteFromWord: false,
                             askBeforePasteHTML: false,
                             defaultActionOnPaste: "insert_clear_html",
                             placeholder: 'Content...'
                         }}
                         onBlur={newContent => this.onChangeContent(newContent)}
                     />
                 </div>
                 <div className="col-md-7 mb-3">
                    <this.FormInput title="Start Date*" type="date" value={moment(this.state.formData.startDate).format("YYYY-MM-DD")} onChange={(event: any) => this.onChangeStartDate(event)} />
                 </div>
                 <div className="col-md-7 mb-3">
                     <this.FormSelect
                         closeMenuOnSelect={false}
                         title="Category"
                         defaultValue={this.state.selectedCategory}
                         value={this.state.selectedCategory}
                         onChange={(selectedOption: any) => this.onChangeCategory(selectedOption)}
                         options={this.state.categoryData}
                         placeholder="Write and search"
                         isMulti
                     />
                 </div>
                 <div className="col-md-7 mb-3">
                     <this.FormSelect
                         closeMenuOnSelect={false}
                         title="Tag"
                         defaultValue={this.state.selectedTag}
                         value={this.state.selectedTag}
                         onChange={(selectedOption: any) => this.onChangeTag(selectedOption)}
                         options={this.state.tagData}
                         placeholder="Write and search"
                         isMulti
                     />
                 </div>
             </div>
         </form>
     );
  }

    TabContent = (props: any) => {
        let self = this;
        return (
            <form className="theme-form">
                <div className="row">
                    <div className="col-md-7 mb-3">
                        <this.FormInput title="Short Content" type="textarea"/>
                    </div>
                    <div className="col-md-7 mb-3">
                        <JoditEditor
                            ref={this.refContent}
                            value={this.state.formData.content}
                            config={{
                                uploader: { insertImageAsBase64URI: true },
                                showXPathInStatusbar: false,
                                showCharsCounter: false,
                                showWordsCounter: false,
                                toolbarAdaptive: true,
                                askBeforePasteFromWord: false,
                                askBeforePasteHTML: false,
                                defaultActionOnPaste: "insert_clear_html",
                                placeholder: 'Content...'
                            }}
                            onBlur={newContent => this.onChangeContent(newContent)}
                        />
                    </div>
                </div>
            </form>
        );
    }

    TabOptions = (props: any) => {
        let self = this;
        return (
            <form className="theme-form">
                <div className="row">
                    <div className="col-md-7 mb-3">
                        <this.FormInput title="Order" type="number"/>
                    </div>
                    <div className="col-md-7 mb-3">
                        <this.FormSelect
                            title="Status"
                            defaultValue={this.state.selectedStatus}
                            value={this.state.selectedStatus}
                            onChange={(selectedOption: any) => this.onChangeStatus(selectedOption)}
                            options={this.state.statusData}
                            placeholder="Select status"
                            isMulti={false}
                        />
                    </div>
                    <div className="col-md-7 mb-3">
                        <div className="form-check form-check-primary d-inline-block">
                            <label className="form-check-label">
                                <input type="checkbox" className="form-check-input"/> Fixed
                                <i className="input-helper"></i>
                            </label>
                        </div>
                    </div>
                </div>
            </form>
        );
    }

    TabSEO = (props: any) => {
        let self = this;
        return (
            <form className="theme-form">
                <div className="row">
                    <div className="col-md-7 mb-3">
                        <this.FormInput title="URL" type="text"/>
                    </div>
                    <div className="col-md-7 mb-3">
                        <this.FormInput title="Title" type="text"/>
                    </div>
                    <div className="col-md-7 mb-3">
                        <this.FormInput title="Content" type="textarea"/>
                    </div>
                </div>
            </form>
        );
    }

  render() {
    return (
        <div className="page-post">
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
                        <Tab eventKey="content" title="Content">
                            <this.TabContent/>
                        </Tab>
                        <Tab eventKey="options" title="Options">
                            <this.TabOptions/>
                        </Tab>
                        <Tab eventKey="seo" title="SEO">
                            <this.TabSEO/>
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

export default PagePostAdd;
