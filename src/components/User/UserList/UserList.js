import React from "react";
import UserItem from "./UserItem/UserItem";

const userList = (props) =>{
    const users = [...props.users];
    const userItem = users.map(user => <UserItem key={user.id} user={user} /> );
    return(userItem)
};

export default userList;