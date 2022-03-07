import React, {Component, createRef, RefObject} from 'react'

type PageState = {} & any;

type PageProps = {} & any;

export class PagePostList extends Component<PageProps, PageState> {
  state = {}

  render() {
    return (
      <div className="page-gallery">
        <div className="gird-margin stretch-card">
          <div className="card">
            <div className="card-body">

            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default PagePostList;
