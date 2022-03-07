import React, {Component, createRef, RefObject} from 'react'
import { ProgressBar } from 'react-bootstrap';

type PageState = {} & any;

type PageProps = {} & any;

interface SelectedItems {
  src: string,
  uploaded: boolean
}

export class PageGalleryUpload extends Component<PageProps, PageState> {
  refFileUpload: RefObject<HTMLInputElement> = createRef();

  state = {
    isDragging: false,
    selectedItems: []
  }

  onChangeFile = (event: any) => {
    let files = event.target.files;
    if(files.length > 0) {
      let selectedItems: Array<SelectedItems> = [...this.state.selectedItems];
      selectedItems = [];
      for (var i = 0; i < files.length; i++) {
        selectedItems.push({
          src: URL.createObjectURL(files[i]),
          uploaded: false
        });
      }
      this.setState({
        selectedItems: selectedItems,
        isDragging: false
      })
    }

  }

  onClickUpload = () => {
    this.refFileUpload.current!.click()
  }

  onDragOver = (event: any) => {
    event.preventDefault();
    this.setState({isDragging: true});
  }

  onDragEnd = (event: any) => {
    event.preventDefault();
    this.setState({isDragging: false});
  }

  onDrop = (event: any) => {
    event.preventDefault();
    let files = event.dataTransfer.files;
    if(files.length > 0){
      let selectedItems: Array<SelectedItems> = [...this.state.selectedItems];
      selectedItems = [];
      for (var i = 0; i < files.length; i++) {
        selectedItems.push({
          src: URL.createObjectURL(files[i]),
          uploaded: false
        });
      }
      console.log(selectedItems)
      this.setState({
        selectedItems: selectedItems,
        isDragging: false
      })
    }
  }

  UploadingItem = (props: any) => {
    return (
        <div className="col-md-2 uploading-item bg-gradient-secondary">
          <img className="shadow-lg mb-1" src={props.src} alt="uploading item"/>
          <ProgressBar variant="gradient-info" now={25}/>
        </div>
    );
  }

  render() {
    return (
      <div className="page-gallery">
        <div className="gird-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <div className="upload-container" onDragOver={this.onDragOver} onDragLeave={this.onDragEnd} onDrop={this.onDrop}>
                <div className={`border-container text-center ${this.state.isDragging ? `bg-gradient-dark` : ``}`}>
                  <form encType="multipart/form-data">
                    <input
                        type="file"
                        hidden={true}
                        ref={this.refFileUpload}
                        onChange={this.onChangeFile}
                        multiple={true}
                        name="image[]"
                        accept=".jpg,.png,.gif,.webp"
                    />
                  </form>
                  {
                    this.state.selectedItems.length > 0
                        ? <div className="row">{this.state.selectedItems.map((item: SelectedItems) => (<this.UploadingItem src={item.src} uploaded={item.uploaded} key={1 + Math.random() * (1000 - 1)}/>))}</div>
                        : <span>
                            <div className="icons">
                              <i className="mdi mdi-image"></i>
                              <i className="mdi mdi-file"></i>
                              <i className="mdi mdi-file-cloud"></i>
                            </div>
                        </span>
                  }
                  <p>Drag and drop files here, or <a className="text-decoration-none" href="#" onClick={this.onClickUpload}> browse</a> your computer.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default PageGalleryUpload;
