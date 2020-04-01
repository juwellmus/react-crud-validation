import React from 'react';
import './Input.css';
import 'react-phone-number-input/style.css'
import PhoneInput, { isValidPhoneNumber, isPossiblePhoneNumber } from 'react-phone-number-input'



const input = ( props ) => {
    let inputElement = null;
     const inputClasses = ["InputElement"];
    //
    let errorClass = null;
    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push("Invalid");
        errorClass = "Invalid";
    }

    const error = {...props.error};
    //console.log(error.name);

    switch ( props.elementType ) {
        case ( 'input' ):
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        case ( 'textarea' ):
            inputElement = <textarea
                className="InputElement"
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        case ( 'select' ):
            inputElement = (
                <select
                    className="InputElement"
                    value={props.value}
                    onChange={props.changed}>
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            );
            break;
        case ( 'phone' ):
            inputElement = (
                <PhoneInput
                    className={errorClass}
                    defaultCountry="BD"
                    placeholder="Enter phone number"
                    value={props.value}
                    onChange={props.changed}
                    />
            );
            break;
        default:
            inputElement = <input
                className="InputElement"
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
    }

    let errorMessage = null;
    if (error.name === 'name'){
        errorMessage = <div style={{color: "red"}}>{error.message}</div>;
    }

    return (
        <div className="Input">
            <label className="Label">{props.label}</label>
            {inputElement}
            {errorMessage}
        </div>
    );

};

export default input;