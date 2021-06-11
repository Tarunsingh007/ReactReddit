import React, { useContext, useEffect, useState } from 'react';
import Context from '../../service/store';
import style from './navListItem.module.css';

const NavListItem = (props)=>{
    const ctx = useContext(Context.context);
    const item = ctx.selectedSubReddit;
    const run = ()=>{
        if(props.id!=1)
        props.setSelectedSubReddit();
    }
    
    return (
        <div onClick={run} className={item.name!=props.name?style.navItemBox:style.navItemBoxActive}>
            <li key={props.id}>
                {props.name}
            </li>
        </div>
    );
}


export default NavListItem;