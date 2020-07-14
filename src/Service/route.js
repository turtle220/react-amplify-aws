import React from 'react';
import { 
    Link, 
    Switch, 
    Route } from 'react-router-dom';


import Blogs from '../Components/BlogComponent';
import BlogDetail from '../Components/BlogPostComponent';
class Routeurl extends React.Component{
    render(){
      return (
    
            <div>
                <ul className="nav justify-content-center" >
                    <li className="nav-item">
                        <Link to="/">  Home </Link> 
                    </li>               
                </ul>
            
                <Switch>
                    <Route exact path='/' component={Blogs}/> 
                    <Route exact path='/content/:name' component={BlogDetail}/> 
                </Switch>

            </div>

      );
    }
};

export default Routeurl;