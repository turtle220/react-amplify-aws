import React from "react";
import { Link } from 'react-router-dom';
import { Connect } from "aws-amplify-react";
import { graphqlOperation } from '@aws-amplify/api';

import { listBlogs } from "../graphql/queries";
import { createBlog } from "../graphql/mutations";
import { onCreateBlog } from '../graphql/subscriptions';
import Form from "./FormComponent";
import { Auth } from "aws-amplify";

class TD extends React.Component{

    state = {
        name: "",
        flag:"block",
        flag1:"none"
    };
    handleChange = (e) => {
        
        this.setState({ name: e.target.value});
    };
    
    render(){
        return(
            <tr>
                <td style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <Link to={`/content/${this.props.blog.id}`} style={{display:this.state.flag}} >{this.props.blog.name}</Link>
                </td>
            </tr>
        );
    }
}


class Blogs extends React.Component {
    
    state = {
        name:""
    }

    componentDidMount = async () => {
        await Auth.currentUserInfo()
        .then(user => {
            console.log("user-----", user.username);
        })
    }
    render() {
        
        return( 
            <div className="App">
                <Connect mutation={graphqlOperation(createBlog)}>
                    {({mutation}) => (
                    
                    <Form onSubmit={async input => {
                        const response = await mutation({input});
                        console.log(response);
                    }} />  
                    
                    )}
                </Connect>

                <Connect query={graphqlOperation(listBlogs)} 
                subscription={graphqlOperation(onCreateBlog)}
                onSubscriptionMsg={(prev, { onCreateBlog }) => {
                    if (onCreateBlog) {
                        const items = prev ? prev.listBlogs.items.splice(0) : [];
                        items.push(onCreateBlog);

                        return { listBlogs: { items } }; 
                    }
                   
                    return prev;
                }} >
                    {({data: { listBlogs: blogs }}) => {
                        if (!blogs){
                            return null;
                        }

                        let listItems = blogs.items.map((b, index) => 
                            <TD key={index} blog={b} ></TD> 
                        )
                        return (
                            <table className = "table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                       
                                    </tr>
                                </thead>
                                <tbody>
                                    {listItems}
                                </tbody>
                            </table>   
                        );
                    }}
                    
                </Connect>

            </div>
        );
    }
}


export default Blogs;