import React from "react";
import { Link } from 'react-router-dom';

class TR extends React.Component{

    state = {
        name: "",
        flag:"block",
        flag1:"none"
    };
    handleChange = (e) => {
        this.setState({ name: e.target.value});
    };
    handleButton = () =>{
        this.setState({ flag:"none" });
        this.setState({ flag1:"block" });
    }
    
    render(){
        return(
            <tr>
                <td style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <Link to={{pathname: `/content/${this.props.blog.id}`}} style={{display:this.state.flag}} onClick={this.blogcontent}>{this.props.blog.name}</Link>
                    <input name="name" style={{ display:this.state.flag1 }} defaultValue={this.props.blog.name} onChange={ this.handleChange } /> 
                </td>
                
                <td><button className="btn btn-danger" onClick={this.props.onDelete} >Delete</button></td>
                <td style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <button className="btn btn-success" style={{display:this.state.flag}} onClick={this.handleButton} >Edit</button>
                    <button className="btn btn-success" style={{ display:this.state.flag1 }} onClick={() => this.props.onEdit(this.props.blog.id, this.state.name)} >Update</button>
                </td>        
            </tr>
        );
    }
}

export default TR;