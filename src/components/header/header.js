import React, { useContext } from 'react';
import Context from '../../service/store';
import style from './header.module.css';

const Header = ()=>{
    const ctx = useContext(Context.context);
    const func=(e)=>{
        console.log(e.target.value);
        ctx.setSortStory(e.target.value)
    }

    return(
        <header className={style.header}>
            <div className={style.heading}>
                <div>
                    <span>
                        <p>
                            {ctx.selectedSubReddit.url.slice(3,ctx.selectedSubReddit.url.length-1)}
                        </p>
                    </span>
                </div>
            </div>
            <div className={style.sortBy}>
                &emsp;
                <span>
                    Sort by: 
                    <span>
                        <select name="sort" id="sort" onChange={func}>
                            <option disabled selected value> Sort by </option>
                            <option value="asc">asc</option>
                            <option value="desc" >desc</option>
                        </select>
                    </span>
                </span>
            </div>
        </header>
    );
}


export default Header;