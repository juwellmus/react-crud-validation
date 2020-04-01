import React, { Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ContactData from "./containers/ContactData/ContactData";
import User from "./components/User/User";
import Person from "./components/Person/Person";
import UserList from "./components/User/UserList/UserList";
import { v4 as uuidv4 } from 'uuid';

class App extends Component{

    state ={
        users: [],
        persons: [],

        userActive: "active",
        personActive: "",

    };


    handleUsers =(user)=>{
        const users = [...this.state.users];
        users.push({
            id: uuidv4(),
            ...user
        });

        this.setState({users: users});
    };


    handlePersonForm = (person) =>{

        const persons = [...this.state.persons];
        persons.push({
            id: uuidv4(),
            ...person
        });

        this.setState({persons: person}, ()=>alert(JSON.stringify(this.state.persons, null, 2)));
    };

     changeUser = () =>{
        this.setState({
            userActive: "active",
            personActive: ""
        })
    };

     changePerson = () =>{
        this.setState({
            userActive: "",
            personActive: "active"
        })
    };

     renderContent =()=>{
         let content = null;
         if (this.state.userActive){
             content = (
                 <>
                     <User users={this.state.users} handleUser={this.handleUsers}/>
                     <div style={{marginTop: "80px"}}>
                         <UserList users={this.state.users}/>
                     </div>
                 </>
             );
         }else if (this.state.personActive){
             content = <Person users={this.state.users} handlePersonForm={this.handlePersonForm}/>;
         }
         return content;
     };

    render() {

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <ContactData />
                    </div>
                    <div className="col-md-6" style={{marginTop: "20px"}}>
                        <div className="card">
                            <div className="card-body">
                                <div className="btn-group" role="group" aria-label="Basic example">
                                    <button type="button" className={'btn btn-secondary '+this.state.userActive} onClick={this.changeUser}>User</button>
                                    <button type="button" className={'btn btn-secondary '+this.state.personActive} onClick={this.changePerson}>Person</button>
                                </div>
                            </div>
                            <hr/>
                            <div style={{padding: "20px"}}>
                                {this.renderContent()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }


}

export default App;
