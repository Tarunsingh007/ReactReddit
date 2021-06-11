import React from 'react';
import style from './error.module.css';

const Error = (props)=>{
    return (
        <div className={style.error}>
            <h1>{props.msg}</h1>
        </div>
    );
}

export default Error;