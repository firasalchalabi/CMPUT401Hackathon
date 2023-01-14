import React from "react";

function Activity(props) {

    return ( 
        <div>
            <input type="checkbox" id={props.id} name={props.name}></input>
            <label for={props.name}>{props.name}</label>
        </div>
    )
}

export default Activity