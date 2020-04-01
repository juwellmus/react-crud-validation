import React, { Component } from 'react';

import Button from '../../components/UI/Button/Button';
import classes from './ContactData.css';
import Input from '../../components/UI/Input/Input';
import validator from "validator/es";
import ContactList from "../../components/ContactList/ContactList";
import { v4 as uuidv4 } from 'uuid';
import { isValidPhoneNumber, isPossiblePhoneNumber } from 'react-phone-number-input'


class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true,
                    isSpecialCharacter: true
                },
                valid: false,
                touched: false,
                error: {
                    name: "",
                    message: ""
                }
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            phone: {
                elementType: 'phone',
                elementConfig: {
                    placeholder: 'Your Phone Number'
                },
                value: '',
                validation: {
                    isValidNumber: true
                },
                valid: true,
                touched: false
            },
            age: {
                elementType: 'input',
                elementConfig: {
                    type: 'number',
                    placeholder: 'Your Age'
                },
                value: '',
                validation: {
                    required: true,
                    isNumeric: true
                },
                valid: false,
                touched: false
            }

        },

        contacts: [],
        formIsValid: false,
        loading: false,
        isEditing: false,
        contact: {}
    }

    contactHandler = ( event ) => {
        event.preventDefault();

        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
            this.state.orderForm[formElementIdentifier].value = "";
            this.state.orderForm[formElementIdentifier].valid = false;
            this.state.orderForm[formElementIdentifier].touched = false;
            // if (this.state.orderForm[formElementIdentifier].elementType !== 'phone'){
            //     this.state.orderForm[formElementIdentifier].valid = false;
            //     this.state.orderForm[formElementIdentifier].touched = false;
            // }
        }

        if (this.state.isEditing){

            const editContact = {...this.state.contact};
            //console.log(contact.id);
            const contacts = [...this.state.contacts];

            const updatedContact = {
                id: editContact.id,
                ...formData
            }

            const index = contacts.findIndex(contact => contact.id === editContact.id);
            //console.log(index);
            contacts.splice(index, 1, updatedContact);

            this.setState({isEditing: false, contacts: contacts});

        }else {

            const contacts = [...this.state.contacts];
            contacts.push({
                id: uuidv4(),
                ...formData
            });

            this.setState({
                contacts: contacts
            })

        }

        this.setState({formIsValid: false});

    };

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.isSpecialCharacter) {
            const pattern = /[^A-Za-z \d]/;
            isValid = !pattern.test(value) && isValid
        }


        if (rules.isValidNumber){
            isValid = isPossiblePhoneNumber(value);
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {

        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };

        if (inputIdentifier === 'phone'){
            updatedFormElement.value = event;
            updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
            updatedFormElement.touched = true;
            updatedOrderForm[inputIdentifier] = updatedFormElement;
        }else {

            let result = null;
            if (inputIdentifier === 'name'){
                const name = event.target.value;
                const contacts = [...this.state.contacts];
                result = contacts.find( (contact) => contact.name === name );
            }

            if (result){
                updatedFormElement.error = {
                    name: inputIdentifier,
                    message: "Name already Added"
                }
            }else {
                updatedFormElement.error = {
                    name: "",
                    message: ""
                }
            }

            updatedFormElement.value = event.target.value;
            updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
            updatedFormElement.touched = true;
            updatedOrderForm[inputIdentifier] = updatedFormElement;
        }


        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
    };

    deleteContact = (contactId) => {
        const alertdelet = window.confirm("Do you want to delete this Contact ?");
        if (alertdelet) {
            const contacts = [...this.state.contacts];
            const contact = contacts.filter(contact => contact.id !== contactId);
            //console.log(post);
            this.setState({contacts: contact});
        }
    };

    editContact = (contactId) =>{
        const contacts = [...this.state.contacts];
        const contact = contacts.find(contact => contact.id === contactId);
        //console.log(post);
        this.setState({contact: contact, isEditing: true});

        for (let formElementIdentifier in this.state.orderForm) {
            this.state.orderForm[formElementIdentifier].value = contact[formElementIdentifier];
        }
        //console.log(this.state.contact);

    };

    render () {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        let buttonName = <Button btnType="Success" disabled={!this.state.formIsValid}>SAVE</Button>;

        if (this.state.isEditing){
            buttonName = <Button btnType="Success">UPDATE</Button>;
        }
        let form = (
            <form onSubmit={this.contactHandler}>
                {formElementsArray.map(formElement => (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        error={formElement.config.error}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                ))}

                {
                    buttonName
                }

            </form>
        );


        return (
            <div className="ContactData">
                <h4>Enter your Contact Data</h4>
                {form}

                <hr/>
                <div className="card">
                    <div className="card-header">
                        <span className="card-title">CONTACT LIST</span>
                    </div>
                    <div className="card-body">
                        {<ContactList  contacts={this.state.contacts} deleteContact={this.deleteContact} editContact={this.editContact}/>}
                    </div>
                </div>

            </div>
        );
    }
}

export default ContactData;