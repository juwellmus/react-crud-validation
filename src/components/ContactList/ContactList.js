import React from "react";
import './ContactList.css';
import ContactItem from "./ContactItem/ContactItem";

const contactList = (props) =>{
    const contacts = [...props.contacts];
    const contactItem = contacts.map(contact => <ContactItem key={contact.id} deleteContact={props.deleteContact} editContact={props.editContact} contact={contact} /> );
    return(contactItem)
};

export default contactList;