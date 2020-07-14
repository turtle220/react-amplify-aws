import React from "react";
import { Connect } from "aws-amplify-react";
import API, { graphqlOperation } from '@aws-amplify/api';
import { withRouter } from "react-router";

import { getBlog } from "../graphql/queries";
import { updateBlog, deleteBlog } from "../graphql/mutations";
import { onDeleteBlog, onUpdateBlog } from '../graphql/subscriptions';

class BlogPost extends React.Component {
    
    state = {
        name:"",
        flag:"inline-flex",
        flag1:"none"
    }

    handleChange = (e) => {
        this.setState({ name: e.target.value});
    };
    onEdit = (e) => {

        this.setState({ flag:"none" });
        this.setState({ flag1:"inline-flex" });

    }
    async handleUpdate(id, name) {
        await API.graphql(graphqlOperation(updateBlog, { input: { id, name } }));
    };

    async handleDelete(id) {
        const { data } = await API.graphql(graphqlOperation(deleteBlog, { input: { id } }));
        if (data && data.deleteBlog) {
          alert(`${data.deleteBlog.name} has been removed successfully.`)
          this.props.history.push('/');
        } else {
            alert(`Something went wrong!`)
        }
    };
    render() {
        const blogId = this.props.match.params.name;

        return( 
            <div className="App">
                <Connect query={graphqlOperation(getBlog, { id: blogId })} 
                subscription={graphqlOperation(onUpdateBlog)}
                onSubscriptionMsg={(prev, { onUpdateBlog }) => {
                    if (onUpdateBlog) {
                        alert('Blog post title has been updated successfully.');
                        return { getBlog: {...onUpdateBlog }};
                    }
                  return prev;
                }} >
                    {({data: { getBlog: blog }}) => {
                        if (!blog){
                            return null;
                        }

                        return (
                            <>
                                <p style={{ marginTop: 30 }}>
                                    <b>Blog Post title: </b>
                                    <input
                                        style={{ display:this.state.flag1 }}
                                        defaultValue={blog.name}
                                        onChange={ this.handleChange }
                                    >
                                    </input>
                                    <span style={{ display:this.state.flag,  }}>{blog.name}</span>
                                </p>
                                <div className="content" >
                                    <button className="btn btn-danger" onClick={() => this.handleDelete(blog.id)}>Delete</button>
                                    <button style={{display:this.state.flag}} className="btn btn-success" onClick={this.onEdit}>Edit</button>
                                    <button style={{display:this.state.flag1}} className="btn btn-success" style={{ display:this.state.flag1 }} onClick={() => this.handleUpdate(blog.id, this.state.name)} >Update</button>
                                </div>
                            </>
                        );
                    }}
                    
                </Connect>

            </div>
        );
    }
}

export default withRouter(BlogPost);