import { useContext, useEffect } from 'react';
import './App.css';
import Error from './components/error/error';
import Header from './components/header/header';
import Loading from './components/loading/loading';
import NavList from './components/navList/navList';
import RedditList from './components/redditList/redditList';
import Context from './service/store';

function App() {
  const ctx = useContext(Context.context);
  useEffect(()=>{
    console.log(ctx.error)
  }, [ ctx.error])
    return (
      <div class="App">
       <Header/>
       {!ctx.error.error?
        <div class='section'>
          <div class="sectionLeft">
            <RedditList/>
          </div>
          <div class="sectionRight">
            <NavList/>
          </div>
        </div>:<Error msg={ctx.error.msg}/>}
      </div>
  );
}

export default App;
