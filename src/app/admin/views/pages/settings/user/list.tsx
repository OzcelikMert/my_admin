import React, {Component} from 'react'
import { Dropdown } from 'react-bootstrap';

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

export class PageUserList extends Component<PageProps, PageState> {
  state = {
    userData: [
      {id: 1, title: `post title`, image: require('../../../../../../uploads/face1.jpg'), create_date: `2020-05-09`, role: Role.ADMIN, status: Status.ACTIVE},
      {id: 2, title: `post title`, image: require('../../../../../../uploads/face2.jpg'), create_date: `2021-05-09`, role: Role.USER, status: Status.BANNED},
      {id: 3, title: `post title`, image: require('../../../../../../uploads/face3.jpg'), create_date: `2022-05-09`, role: Role.USER, status: Status.PENDING},
    ]
  }

  statusBackground(status: number) {
    let bg = ``;
    switch (status) {
      case Status.ACTIVE: bg = `success`; break;
      case Status.PENDING: bg = `warning`; break;
      case Status.BANNED: bg = `danger`; break;
      case Status.DISABLED: bg = `dark`; break;
    }
    return bg;
  }

  statusText(status: number) {
    let text = ``;
    switch (status) {
      case Status.ACTIVE: text = `Active`; break;
      case Status.PENDING: text = `Pending`; break;
      case Status.BANNED: text = `Banned`; break;
      case Status.DISABLED: text = `Disabled`; break;
    }
    return text;
  }

  roleBackground(status: number) {
    let bg = ``;
    switch (status) {
      case Role.ADMIN: bg = `primary`; break;
      case Role.USER: bg = `info`; break;
    }
    return bg;
  }

  roleText(status: number) {
    let text = ``;
    switch (status) {
      case Role.ADMIN: text = `Admin`; break;
      case Role.USER: text = `User`; break;
    }
    return text;
  }

  onDeleteUser = (index: number) => {
    let userData = [...this.state.userData];
    userData.splice(index, 1);
    this.setState({
      userData: userData
    })
  }

  UserItem = (props: any) => {
    return (
        <tr>
          <th className="text-center" scope="row">
            <div className="post-image">
              <img src={props.data.image} alt=""/>
            </div>
          </th>
          <th className="text-start" scope="row">{props.data.title}</th>
          <th className="text-center" scope="row">{props.data.create_date}</th>
          <th className="text-center" scope="row"><label className={`badge badge-gradient-${this.roleBackground(props.data.role)}`}>{this.roleText(props.data.role)}</label></th>
          <th className="text-end" scope="row"><label className={`badge badge-gradient-${this.statusBackground(props.data.status)}`}>{this.statusText(props.data.status)}</label></th>
          <th className="text-end" scope="row">
            <button type="button" className="btn btn-outline-secondary btn-rounded btn-icon">
              <i className="mdi mdi-cog text-secondary"></i>
            </button>
          </th>
          <th className="text-end" scope="row">
            <button type="button" className="btn btn-outline-danger btn-rounded btn-icon" onClick={props.onDelete}>
              <i className="mdi mdi-delete text-danger"></i>
            </button>
          </th>
        </tr>
    );
  }

  render() {
    return (
      <div className="page-user">
        <div className="gird-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <div className="table-user">
                <div className="table-responsive">
                  <table className="table table-hover table-borderless">
                    <thead>
                    <tr>
                      <th className="text-center" scope="col"></th>
                      <th className="text-start" scope="col">Name</th>
                      <th className="text-center" scope="col">Created Date</th>
                      <th className="text-center" scope="col">Role</th>
                      <th className="text-end" scope="col">Status</th>
                      <th className="text-end" scope="col">Edit</th>
                      <th className="text-end" scope="col">Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                      {
                        this.state.userData.map((item: any, index: number) => (item.status !== Status.DELETED ? <this.UserItem
                            data={item}
                            onDelete={() => this.onDeleteUser(index)}
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

export default PageUserList;
