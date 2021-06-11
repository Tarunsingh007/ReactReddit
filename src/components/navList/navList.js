import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import Context from '../../service/store';
import NavListItem from '../navListItem/navListItem';


const NavList = ()=>{
    const ctx = useContext(Context.context);
    const [loading, setLoading] = useState(false);
    const randomNo = `fn${Date.now()}`;

    const navItemsHandler = async ()=>{
        var NavigationItemObjectType = {};
        var navigationItems= [];
        const res = await axios.get(`https://www.reddit.com/reddits.json?jsonp=${randomNo}`);
        let data = await res.data;
        data=data.slice(5+randomNo.length,data.length-1);
        data=JSON.parse(data)
        let arr = data.data.children
        arr.forEach(e => {
            const url = e.data.url;
            const name = e.data.display_name;
            const id = e.data.id;
            NavigationItemObjectType = {
                url,
                name,
                id,
                fnId:randomNo
            }
            navigationItems.push(NavigationItemObjectType);
        });
        ctx.setNavigationItems(navigationItems)
        setLoading(true);
    }
    useEffect(()=>{
        navItemsHandler();
        setLoading(false);
    },[]);

    return (
        <>
            <ul>
                <NavListItem name="Reddit Links" id={1}/>
                {!loading?<p>Loading...</p>:ctx.navigationItems.map((e)=>{
                    return <NavListItem setSelectedSubReddit={()=>{ctx.setSelectedSubReddit(e)}} selectedItem={e} name={e.name} url={e.url} id={e.id}/>
                })}
            </ul>
        </>
    );
}

export default NavList;