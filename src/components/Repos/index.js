import React from 'react';
import './style.css';
import {Link} from "react-router-dom";
class Repos extends React.Component{
    state={...this.props}
    componentDidMount(){
        this.setState({data:this.props.data,n:this.props.n});
    }
    componentDidUpdate(prevProps){
        if(this.state.data!==this.props.data || this.state.n!==this.props.n || this.props!==prevProps){
            this.setState({data:this.props.data,n:this.props.n});
            // console.log(this.props)
        }
    }
    showRepos=()=>{
        let n = this.state.n;
        var tmp = new Array();
        tmp = this.state.data;
        console.log(n);
        if(n!==""){
            while(tmp.length>n){
                tmp.pop();
            }
        }
        return(
            tmp.map((e)=>{
                return(
                    <div  className="repo" key={e.id}>
                        <h4 key={e.id} >{e.name} - {e.forks}</h4>
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