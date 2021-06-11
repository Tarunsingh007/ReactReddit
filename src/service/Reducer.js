import {useEffect} from 'react'; 
import axios from 'axios'; 
//    https://www.reddit.com${item.data.url}.json?sort=top&t=month&jsonp=${cbname}

// const randomNo = `fn${Date.now()}`;


// const navItemsHandler = async ()=>{
//     var NavigationItemObjectType = {};
//     var navigationItems= [];
//     const res = await axios.get(`https://www.reddit.com/reddits.json?jsonp=${randomNo}`);
//     let data = await res.data;
//     data=data.slice(5+randomNo.length,data.length-1);
//     data=JSON.parse(data)
//     let arr = data.data.children
//     arr.forEach(e => {
//         const url = e.data.url;
//         const name = e.data.display_name;
//         const id = e.data.id;
//         NavigationItemObjectType = {
//             url,
//             name,
//             id
//         }
//         navigationItems.push(NavigationItemObjectType);
//     });
//     return navigationItems;
// }

// const storyItemHandler=(data)=>{
//     var arr=[1,2,3];
//     console.log(data.url.substr(22,));
//     return arr;
// }

const reducer = (state, action)=>{
    switch(action.type){
        case 'set-nav-items':{
            return {...state, navigationItems:action.payload}
        }
        break;
        case 'set-selected-items':{
            return {...state, selectedSubReddit:action.payload}
        }
        break;
        case 'set-sort-story':{
            return {...state, sortBy:action.payload}
        }
        break;
        case 'set-story-items':{    
            return {...state, storyItems:action.payload}
        }
        break;
        case 'set-error':{    
            return {...state, error:{...state.error,error:action.payload.error, msg:action.payload.msg}}
        }
        break;
        default:
            throw new Error("invalid input");
    }
};
    
export default reducer;


