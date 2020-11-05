import React from 'react'
import './style.css';
class Form extends React.Component{
    render(){
        return(
        <>
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
                <input type="submit" value="Search" />
            </form>
        </>
    )
  }
}
export default Form;
