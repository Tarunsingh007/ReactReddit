import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import Context from '../../service/store';
import Loading from '../loading/loading';
import RedditListitem from '../redditListItem/redditListItem';


const RedditList = ()=>{
    const ctx = useContext(Context.context);
    const [loading, setLoading] = useState(false);
    var sortedArr = [];

    const storyItemsHandler = async (payload)=>{
        try{
            console.log(payload)
            const fnId=payload.fnId;
            payload=payload.url;
            var storyObj = {};
            var storyArr = [];
            var RedditUrl= `https://www.reddit.com${payload}.json?sort=top&t=month&jsonp=${fnId}`;
            console.log("URL: "+RedditUrl)
            var data = await axios.get(RedditUrl);
            data=data.data.slice(5+fnId.length,data.data.length-1);
            data=JSON.parse(data).data.children;
            console.log(data);
            data.forEach(e => {
                const author = e.data.author;
                const id = e.data.id;
                const info = e.data.title;
                const subscribers = e.data.score;
                storyObj = {
                    id,
                    subscribers,
                    info,
                    author
                }
                storyArr.push(storyObj);
            });
            if(ctx.sortBy!=null){
                storyArr.forEach((e)=>{
                    sortedArr.push(e);
                });
                if(ctx.sortBy=="asc"){
                    sortedArr.sort((a,b) => (a.subscribers > b.subscribers) ? 1 : ((b.subscribers > a.subscribers) ? -1 : 0));
                    ctx.setStoryItems(sortedArr);
                }
                if(ctx.sortBy=="desc"){
                    sortedArr.sort((a,b) => (a.subscribers > b.subscribers) ? -1 : ((b.subscribers > a.subscribers) ? 1 : 0));
                    ctx.setStoryItems(sortedArr)
                }
            }
            else
                ctx.setStoryItems(storyArr);
            setLoading(true);
        }
        catch(err){
            ctx.error.setError({error:true, msg:"Network Issue..."});
        }
    }

    useEffect(()=>{
            ctx.storyItems.forEach((e)=>{
                sortedArr.push(e);
            });
            if(ctx.sortBy=="asc"){
                sortedArr.sort((a,b) => (a.subscribers > b.subscribers) ? 1 : ((b.subscribers > a.subscribers) ? -1 : 0));
                ctx.setStoryItems(sortedArr);
            }
            if(ctx.sortBy=="desc"){
                sortedArr.sort((a,b) => (a.subscribers > b.subscribers) ? -1 : ((b.subscribers > a.subscribers) ? 1 : 0));
                ctx.setStoryItems(sortedArr)
            }
    }, [ ctx.sortBy ])

    useEffect(()=>{
        storyItemsHandler(ctx.selectedSubReddit);
        setLoading(false);
    },[ctx.selectedSubReddit])

    return (
        <>
            <ul>
                {!ctx.error.error && !loading?<Loading/>:ctx.storyItems.map((e)=>{
                        return <RedditListitem info={e.info} subscribers={e.subscribers} author={e.author} id={e.id} />
                })}
            </ul>
        </>
    );
}

export default RedditList;