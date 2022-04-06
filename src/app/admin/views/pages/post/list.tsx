import React, {Component} from 'react'
import { Dropdown } from 'react-bootstrap';

type PageState = {} & any;

type PageProps = {} & any;

const Status = {
  ACTIVE: 1,
  PENDING: 2,
  DELETED: 3,
  IN_PROGRESS: 4
}

export class PagePostList extends Component<PageProps, PageState> {
  state = {
    postData: [
      {id: 1, selected:false, title: `post title`, image: require('../../../../../uploads/face1.jpg'), category: [`Photoshop`, `UX & UI Design`], views: 50, status: Status.ACTIVE, fixed: true},
      {id: 2, selected:false, title: `post title`, image: require('../../../../../uploads/face2.jpg'), category: [`Programming`, `NodeJS`, `C#`, `C++`, `Python`], views: 150, status: Status.ACTIVE, fixed: true},
      {id: 3, selected:false, title: `post title`, image: require('../../../../../uploads/face3.jpg'), category: [`Database`, `MySQL`, `PostgreSQL`, `MSSQL`], views: 350, status: Status.PENDING, fixed: false},
      {id: 4, selected:false, title: `post title`, image: require('../../../../../uploads/face1.jpg'), category: [`Stylesheet`, `CSS`, `SCSS`], views: 250, status: Status.PENDING, fixed: false},
      {id: 5, selected:false, title: `post title`, image: require('../../../../../uploads/face2.jpg'), category: [`Script`, `JavaScript`, `CoffeScript`, `TypeScript`], views: 35, status: Status.ACTIVE, fixed: false}
    ],
    isSelectedAll: false,
    isShowTableToggleMenu: false
  }

  statusBackground(status: number) {
    let bg = ``;
    switch (status) {
      case Status.ACTIVE: bg = `success`; break;
      case Status.PENDING: bg = `danger`; break;
      case Status.IN_PROGRESS: bg = `warning`; break;
    }
    return bg;
  }

  statusText(status: number) {
    let text = ``;
    switch (status) {
      case Status.ACTIVE: text = `Active`; break;
      case Status.PENDING: text = `Pending`; break;
      case Status.IN_PROGRESS: text = `In progress`; break;
    }
    return text;
  }

  onChangePostStatus = (event:any, status: number) => {
    event.preventDefault();
    let postData = [...this.state.postData];
    postData.map(item => {
      if(item.selected){
        if(item.status !== Status.DELETED) {
          item.status = status;
          item.selected = false;
        }
      }
      return item;
    });
    this.setState({
      postData: postData,
      isSelectedAll: false,
      isShowTableToggleMenu: false
    })
  }

  onChangeItemSelect = (event: any, index: number) => {
    let isShowTableToggleMenu = false;
    let postData = [...this.state.postData];
    postData[index].selected = event.target.checked;
    postData.forEach(item => {
      if(item.selected){
        isShowTableToggleMenu = true;
      }else{
        return;
      }
    })
    this.setState({
      postData: postData,
      isSelectedAll: false,
      isShowTableToggleMenu: isShowTableToggleMenu
    })
  }

  onChangeItemSelectAll = (event: any) => {
    let selected = event.target.checked;
    let postData = [...this.state.postData];
    postData.map(item => (item.selected = selected));
    this.setState({
      postData: postData,
      isSelectedAll: selected,
      isShowTableToggleMenu: selected
    })
  }

  PostItem = (props: any) => {
    return (
        <tr>
          <td scope="checkbox">
            <div className="form-check form-check-info">
              <label className="form-check-label">
                <input type="checkbox" className="form-check-input" checked={props.selected} onChange={props.onChange}/>
                <i className="input-helper"></i>
              </label>
            </div>
          </td>
          <th className="text-center" scope="row">
            <div className="post-image">
              <img src={props.image} alt=""/>
            </div>
          </th>
          <th className="text-start" scope="row">{props.title}</th>
          <th className="text-start category" scope="row">
            {
              props.category.map((item: any) => (<label className="badge badge-gradient-primary">{item}</label>))
            }
          </th>
          <th className="text-end" scope="row"> {props.views}<i className="mdi mdi-eye"></i></th>
          <th className="text-end" scope="row"><label className={`badge badge-gradient-${this.statusBackground(props.status)}`}>{this.statusText(props.status)}</label></th>
        </tr>
    );
  }

  render() {
    return (
      <div className="page-post">
        <div className="gird-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <div className="table-post">
                <div className="table-responsive">
                  <table className="table table-hover table-borderless">
                    <thead>
                    <tr>
                      <th scope="col">
                        <div className="form-check form-check-info">
                          <label className="form-check-label">
                            <input type="checkbox" className="form-check-input" checked={this.state.isSelectedAll} onChange={this.onChangeItemSelectAll}/>
                            <i className="input-helper"></i>
                          </label>
                        </div>
                      </th>
                      <th className="text-center" scope="col">
                        {
                          this.state.isShowTableToggleMenu
                              ? <Dropdown align={"end"}>
                                  <Dropdown.Toggle className="table-toggle-menu">
                                    <i className="mdi mdi-menu"></i>
                                  </Dropdown.Toggle>

                                  <Dropdown.Menu className="bg-gradient-light table-dropdown-menu">
                                    <Dropdown.Item href="!#" onClick={(event: any) => this.onChangePostStatus(event, Status.ACTIVE)}>
                                      <button className="btn btn-gradient-success">
                                        <i className="mdi mdi-check float-start"></i> Active
                                      </button>
                                    </Dropdown.Item>
                                    <Dropdown.Item href="!#" onClick={(event: any) => this.onChangePostStatus(event, Status.IN_PROGRESS)}>
                                      <button className="btn btn-gradient-warning">
                                        <i className="mdi mdi-wrench float-start"></i> In progress
                                      </button>
                                    </Dropdown.Item>
                                    <Dropdown.Item href="!#" onClick={(event: any) => this.onChangePostStatus(event, Status.PENDING)}>
                                      <button className="btn btn-gradient-danger">
                                        <i className="mdi mdi-clock float-start"></i> Pending
                                      </button>
                                    </Dropdown.Item>
                                    <Dropdown.Item href="!#" onClick={(event: any) => this.onChangePostStatus(event, Status.DELETED)}>
                                      <button className="btn btn-gradient-dark">
                                        <i className="mdi mdi-delete float-start"></i> Delete
                                      </button>
                                    </Dropdown.Item>
                                  </Dropdown.Menu>
                              </Dropdown>
                              : null
                        }
                      </th>
                      <th className="text-start" scope="col">Name</th>
                      <th className="text-start" scope="col">Category</th>
                      <th className="text-end" scope="col">Views</th>
                      <th className="text-end" scope="col">Status</th>
                    </tr>
                    </thead>
                    <tbody>
                      {
                        this.state.postData.map((item: any, index: number) => (item.status !== Status.DELETED ? <this.PostItem
                          selected={item.selected}
                          title={item.title}
                          image={item.image}
                          category={item.category}
                          views={item.views}
                          status={item.status}
                          fixed={item.fixed}
                          onChange={(event: any) => this.onChangeItemSelect(event, index)}
                        /> : null))
                      }
                    </tbody>
                  </table>



                  <div className="d-none">
                    <button>
                      <i className="mdi mdi-chevron-left"></i>
                    </button>
                    <button>
                      <i className="mdi mdi-chevron-right"></i>
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default PagePostList;
