import React from 'react';
import { withRouter} from "react-router-dom";
import './style.css';
class Form extends React.Component{
    render(){
        return(
        <div className="form">
            <form onSubmit={this.props.handleSubmit}>
                <input type="text" name="org" placeholder="organisation name"/>
                <input type="text" name="n" placeholder="number of repositories"/>
                <input type="text" name="m" placeholder="number of contributors"/>
                <input  className="search" type="submit" value="Search" />
            </form>
        </div>
    )
  }
}
export default Form;
