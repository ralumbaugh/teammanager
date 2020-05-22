import React from 'react';

export default props => {
    const { successCallback } = props;

    return(
        <button onClick={successCallback} style={{backgroundColor:"red"}}>
            Delete
        </button>
    )
}