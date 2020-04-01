import React from "react";
import './UserItem.css';

const userItem = (props) =>{
    const {id, name, email} =props.user;
    return(
        <div className="UserItem">
            <span>User ID : {id}</span><br/>
            <label>{name}</label><br/>
            <label>{email}</label><br/>
        </div>
    )
};

export default userItem;