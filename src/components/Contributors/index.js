import React from 'react';
import axios from 'axios';
import './style.css';
// import { BrowserRouter as Router, Route ,Link, Redirect} from "react-router-dom";
class Contributors extends React.Component{
    state={...this.props.repo};
    componentDidMount(){
        var tmp=[];
        if(this.state.contributors_url){
            axios.get(this.state.contributors_url)
            .then((response)=>{
                response.data.forEach((e)=>{
                    tmp.push({
                        id:e.id,
                        name:e.login,
                        contributions:e.contributions
                    })
                })
            })
            .then(()=>{
                tmp.sort(function(a,b){
                    return b.contributions-a.contributions
                })
                this.setState({data:tmp})
                console.log(this.state);
            })
        }
    }
    render(){
        if(this.state.data){
            return(
                <>
                    <h3>Top Contributors</h3>
                    <h1>Repository : {this.state.name}</h1>
                    {
                        this.state.data.map((e)=>{
                            return(
                                <div className="contributor" key={e.id}>
                                    <h4>Name : {e.name}</h4>
                                    <h4>Commits : {e.contributions}</h4>
                                </div>
                            )
                        })
                    }
                </>
            )
        }else{
            return(
                <>
                    {/* <Redirect to="/"></Redirect> */}
                </>
            )
        }
    }
}
export default Contributors