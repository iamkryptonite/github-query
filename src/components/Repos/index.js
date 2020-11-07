import React from 'react';
import './style.css';
import {Link} from "react-router-dom";
class Repos extends React.Component{
    state={...this.props};
    componentDidUpdate(prevProps){
        if(this.state.data!==this.props.data){
            this.setState({data:this.props.data});
        }
    }
    showRepos=()=>{
        var n = this.props.n;
        var data = [...this.state.data];
        if(n!==""){
            while(data.length>n){
                data.pop();
            }
        }
        return(
            data.map((e)=>{
                return(
                    <div  className="repo" key={e.id}>
                        <h4 key={e.id} >{e.name} </h4>
                        <h4>Forks : {e.forks}</h4>
                        <p>{e.desc}</p>
                        <Link onClick={()=>this.props.handleClick(e)} to="/contributors">Top Contributors</Link>
                    </div>
                )
            })
        )
    }
    render(){
        if(this.state.data){
            return(
                <>
                    {this.showRepos()}
                </>
            )

        }return(
            <></>
        )
    }
}
export default Repos