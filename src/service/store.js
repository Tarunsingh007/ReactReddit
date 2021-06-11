import React, { createContext, useReducer } from 'react';
import reducer from './Reducer';

const initialState = {
    setNavigationItems: ()=>{},
    setStoryItems: ()=>{},
    setSelectedSubReddit: ()=>{},
    navigationItems:[],
    storyItems: [],
    selectedSubReddit: {},
    setSortStory: null,
    sortBy : null,
    setError: null
}
const context = React.createContext(initialState); // creating the context and giving the initial state

const ContextProvider = (props)=>{
    
    const navigationItemHandler = (payload)=>{
        dispatch({type: 'set-nav-items', payload:payload});
    }
    const selectedSubRedditHandler = (payload)=>{
        dispatch({type: 'set-selected-items', payload:payload});
    }
    const storyItemHandler = (payload)=>{
        dispatch({type: 'set-story-items', payload:payload});
    }
    const setSortStoryHandler = (payload)=>{
        dispatch({type: 'set-sort-story', payload:payload});
    }
    const errorHandler = (payload)=>{
        dispatch({type: 'set-error', payload:payload});
    }
    
    const State = {  
        setNavigationItems: navigationItemHandler,
        setStoryItems: storyItemHandler,
        setSelectedSubReddit: selectedSubRedditHandler,
        navigationItems:[],
        storyItems: [],
        selectedSubReddit: {
            fnId:'fn1623341964660', 
            url:'/r/Home/'
        },
        setSortStory:setSortStoryHandler,
        sortBy : null,
        error: {error:false, msg:null, setError:errorHandler}
    }   
    

    const [state, dispatch] = useReducer(reducer, State);


    return (
        <context.Provider value={state}>
            {props.children}
        </context.Provider>
    );
}

const Context={
    context:context,
    ContextProvider:ContextProvider
}

export default Context;