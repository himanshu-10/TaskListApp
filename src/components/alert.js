import React from 'react';

const style = {
    color: '#e7604b',
    fontWeight: 500,
    textAlign:'center',
    marginBottom: '10px'
}

function Alert({error}) {

    return (
        <h3 style={style}>{ error }</h3>
    )
}

export default Alert;