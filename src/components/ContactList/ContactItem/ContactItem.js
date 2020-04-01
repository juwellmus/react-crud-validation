import React from "react";
import './ContactItem.css';

const contactItem = (props) =>(
    <div className="ContactList">
        <button type='button' onClick={ () => {props.deleteContact(props.contact.id)} } className="btn">Delete</button>
        <button type='button' onClick={() => {props.editContact(props.contact.id)}} className="btn">Edit</button>
        <span>{props.contact.name}</span><br/>
        <label>{props.contact.email}</label><br/>
        <label>{props.contact.phone}</label><br/>
        <label>Age : {props.contact.age}</label>
    </div>
);

export default contactItem;