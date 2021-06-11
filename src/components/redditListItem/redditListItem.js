import React, { useEffect, useState, useContext } from 'react';
import style from './redditListItem.module.css';
import Context from '../../service/store';

const RedditListitem = (props)=>{
    const [readMore,setMore] = useState(true);

    const ctx = useContext(Context.context);

    const toggle=()=>{
        if(props.info.length>100 && !readMore){
            setMore(true);
        }
        if(props.info.length>100 && readMore){
            setMore(false);
        }
    }

    return (
        <div className={style.redditListBox}>
            <div className={style.redditNum}>
                <span>
                    {props.subscribers}
                </span>
            </div>
            <div className={style.subReddit}>
                <div className={style.info}>
                    <span>
                       {readMore && props.info.length>100?props.info.slice(0,100).toString().trim()+"...":props.info}
                    </span>
                    {readMore && props.info.length>100?<span onClick = {toggle} className={style.readMore}>Read More...</span>:null}
                    {!readMore && props.info.length>100?<span onClick = {toggle} className={style.readMore}>Read Less...</span>:null}
                </div>
                <div className={style.authorDetails}>
                    <span>
                        <p>
                            Posted by: 
                        </p>
                    </span>
                    <span>
                        <p>
                            {props.author}
                        </p>
                    </span>
                </div>
            </div>
        </div>
    );
}



export default RedditListitem;