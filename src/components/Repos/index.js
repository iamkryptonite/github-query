import React from 'react';
import './style.css';
import { BrowserRouter as Router, Route ,Link} from "react-router-dom";
class Repos extends React.Component{
    state={}
    componentDidMount(){
        this.setState({data:this.props.data});
    }
    componentDidUpdate(){
        if(this.state.data!==this.props.data){
            this.setState({data:this.props.data});
        }
    }
    render(){
        if(this.state.data){
            return(
                <>
                    {
                        this.state.data.map((e)=>{
                            return(
                                <div  className="repo" key={e.id}>
                                    <h4 key={e.id} >{e.name} - {e.forks}</h4>
                                    <p>{e.desc}</p>
                                    {/* <a onClick={()=>this.props.handleClick(e)}>Contributors</a> */}
                                    <Link onClick={()=>this.props.handleClick(e)} to="/contributors">Contributors</Link>
                                </div>
                            )
                        })
                    }
                </>
            )

        }return(
            <></>
        )
    }
}
export default Repos