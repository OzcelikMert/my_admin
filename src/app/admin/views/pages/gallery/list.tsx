import React, { Component } from 'react'

type PageState = {} & any;

type PageProps = {} & any;

export class PageGalleryList extends Component<PageProps, PageState> {
  state = {
    isCheckedSelectAll: false,
    galleryItems: [
      {id: 1, src: require("../../../../../uploads/face1.jpg"), selected: false},
      {id: 2, src: require("../../../../../uploads/face2.jpg"), selected: false},
      {id: 3, src: require("../../../../../uploads/face3.jpg"), selected: false},
      {id: 4, src: require("../../../../../uploads/face1.jpg"), selected: false},
      {id: 5, src: require("../../../../../uploads/face2.jpg"), selected: false},
      {id: 6, src: require("../../../../../uploads/face3.jpg"), selected: false},
      {id: 7, src: require("../../../../../uploads/face1.jpg"), selected: false},
      {id: 8, src: require("../../../../../uploads/face2.jpg"), selected: false},
      {id: 9, src: require("../../../../../uploads/face3.jpg"), selected: false}
    ]
  }

  onClickItem = (type: string, index: number = 0) => {
    switch (type) {
      case `select`:
      case `unselect`:
        const galleryItems = [...this.state.galleryItems];
        galleryItems[index].selected = (type === `select`);
        this.setState({
          galleryItems: galleryItems,
          isCheckedSelectAll: false
        })
        break;
      case `show`: break;
    }
  }

  onClickSelectAll = (event: any) => {
    let selected = event.target.checked;
    const galleryItems = [...this.state.galleryItems];
    galleryItems.map(item => (item.selected = selected));
    this.setState({
      galleryItems: galleryItems,
      isCheckedSelectAll: selected
    })
  }

  onClickDeleteItems = () => {
    const galleryItems = [...this.state.galleryItems];
    this.setState({galleryItems: galleryItems.filter(item => (!item.selected))})
  }

  ImageItem = (props: any) => {
    return (
        <div className="col-md-2 gallery-item">
          {
            props.selected ?
                <div className="bg-gradient-success item-selected">
                  <i className="mdi mdi-check"></i>
                </div> : null
          }
          <img src={props.src} alt="image"/>
          <div className="item-info">
            <p className="title">{props.children}</p>
            <div className="overlay"></div>
            <div className="buttons">
              {
                !props.selected ?
                    <button type="button" className="btn btn-gradient-success btn-icon-text me-3" onClick={props.onSelect} datatype="select">
                      <i className="mdi mdi-check btn-icon-append"></i> Select
                    </button> : null
              }
              {
                props.selected ?
                    <button type="button" className="btn btn-gradient-danger btn-icon-text me-3" onClick={props.onUnselect} datatype="unselect">
                      <i className="mdi mdi-close btn-icon-append"></i> Unselect
                    </button> : null
              }
              <button type="button" className="btn btn-gradient-info btn-icon-text" onClick={props.onShow} datatype="show">
                <i className="mdi mdi-eye btn-icon-append"></i> Show
              </button>
            </div>
          </div>
        </div>
    )
  };

  render() {
    return (
      <div className="page-gallery">
        <div className="gird-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <div className="mb-4">
                <div className="form-check form-check-primary d-inline-block">
                  <label className="form-check-label">
                    <input type="checkbox" className="form-check-input" onChange={this.onClickSelectAll} checked={this.state.isCheckedSelectAll}/> Select All
                    <i className="input-helper"></i>
                  </label>
                </div>
                <button type="button" className="btn btn-gradient-danger btn-icon-text ms-5" onClick={this.onClickDeleteItems}>
                  <i className="mdi mdi-trash-can btn-icon-prepend"></i>Delete
                </button>
              </div>
              <div className="row">
                {
                  this.state.galleryItems.map((item, index) => {return <this.ImageItem
                      src={item.src}
                      key={item.id}
                      selected={item.selected}
                      onSelect={() => this.onClickItem(`select`, index)}
                      onUnselect={() => this.onClickItem(`unselect`, index)}
                      onShow={() => this.onClickItem( `show`, index)}
                  >card title</this.ImageItem>})
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default PageGalleryList;
