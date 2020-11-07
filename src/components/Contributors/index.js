import React from 'react';
import axios from 'axios';
import './style.css';
import { Redirect } from 'react-router-dom';
// import { BrowserRouter as Router, Route ,Link, Redirect} from "react-router-dom";
class Contributors extends React.Component{
    state={...this.props.repo,org:this.props.org,m:this.props.m};
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
    componentDidUpdate(prevProps){
        if(prevProps.org!==this.props.org){
            console.log("changed!");
            this.setState({changed:true});
        }else if(prevProps.m!==this.props.m){
            this.setState({m:this.props.m});
        }
    }
    showContributors=()=>{
        var m = this.state.m;
        var data = this.state.data;
        console.log(m);
        if(m!=="" && m>=0){
            while(data.length>m){
                data.pop();
            }
        }
        return(
            <>
                <h3>Top Contributors</h3>
                <h1>Repository : {this.state.name}</h1>
                {
                    data.map((e)=>{
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
    }
    render(){
        if(this.state.data && !this.state.changed){
            return(
                <>  {   this.showContributors() }   </>
            )
        }else if(this.state.changed){
            return(
                <Redirect to="/"></Redirect>
            )
        }
        else{
            return(
                <>
                    <a href="/">Homepage</a>
                </>
            )
        }
    }
}
export default Contributors