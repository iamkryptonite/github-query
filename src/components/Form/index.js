import React from 'react';
import { withRouter} from "react-router-dom";
import './style.css';
class Form extends React.Component{
    render(){
        return(
        <div className="form">
            <form onSubmit={this.props.handleSubmit}>
                <label>Organization :
                    <input type="text" name="org" />
                </label>
                <label> m :
                    <input type="text" name="m" />
                </label>
                <label> n :
                    <input type="text" name="n" />
                </label>
                <input  className="search" type="submit" value="Search" />
            </form>
        </div>
    )
  }
}
export default Form;
