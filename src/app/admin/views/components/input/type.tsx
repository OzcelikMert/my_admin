import React, {Component, RefObject} from 'react'

type PageState = {} & any;

type PageProps = {
    title: string,
    type: `text` | `password` | `textarea` | `phone` | `email`,
    className?: string,
    required?: boolean,
    onChange?: any,
    value?: any,
    maxLength?: number
};

const ThemeInputType = React.forwardRef((props: any, ref: any ) => {
    let input: JSX.Element;
    switch (props.type) {
        case `textarea`:
            input = <textarea
                className={`field textarea ${typeof props.className !== "undefined" ? props.className : ``}`}
                placeholder=" "
                required={props.required}
                onChange={props.onChange}
                maxLength={props.maxLength}
                ref={ref}
            >{props.value}</textarea>;
            break;
        default:
            input = <input
                className={`field ${typeof props.className !== "undefined" ? props.className : ``}`}
                type={props.type}
                placeholder=" "
                required={props.required}
                onChange={props.onChange}
                value={props.value}
                maxLength={props.maxLength}
                ref={ref}
            />;
            break;
    }
    return (
        <label className="theme-input">
            {input}
            <span className="label">{props.title}</span>
        </label>
    );
});

export default ThemeInputType;
