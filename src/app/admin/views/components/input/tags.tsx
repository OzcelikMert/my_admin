import React, {Component} from 'react'
import Select from "react-select";

type PageState = {} & any;

type PageProps = {} & any;

class ThemeInputTags extends Component<PageProps, PageState> {
    state = {
        newTag: ''
    }

    handleChange = (e: any) => {
        this.setState({ newTag: e.target.value })
    }

    handleKeyDown = (e: any) => {
        if (e.keyCode === 13 && e.target.value !== '')  {
            let newTag = this.state.newTag.trim()

            if (this.props.value.indexOf(newTag) === -1) {
                this.props.value.push(newTag)
                this.setState({ newTag: '' })
                this.props.onChange(this.props.value);
                e.target.value = ''
            }

        }
    }

    handleRemoveTag = (e: any) => {
        let tag = e.target.parentNode.textContent.trim()
        let index = this.props.value.indexOf(tag)
        this.props.value.splice(index, 1)
        this.setState({ newTag: '' })
        this.props.onChange(this.props.value);
    }

    render () {
        return (
            <div className="theme-input static">
                <span className="label">{this.props.title}</span>
                <div className="tags field">
                    {this.props.value.map((tag: any, index: any) => (
                        <span className="tag">
                            {tag}
                            <button type="button" className="delete" onClick={this.handleRemoveTag}></button>
                        </span>
                    ))}
                    <input
                        type="text"
                        onChange={this.handleChange}
                        onKeyDown={this.handleKeyDown}
                        placeholder={this.props.placeholder}
                    />
                </div>
            </div>
        )
    }
}

export default ThemeInputTags;
