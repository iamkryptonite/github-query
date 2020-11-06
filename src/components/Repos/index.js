import axios from 'axios';
import React from 'react';
import './style.css';
class Repos extends React.Component{
    state={}
    componentDidMount(){
        this.setState({data:this.props.data});
        // console.log(this.state.data);
    }
    componentDidUpdate(){
        if(this.state.data!==this.props.data){
            this.setState({data:this.props.data});
        }
    }
    getContributors=(e)=>{
        return(
        axios.get(e).then((res)=>{
            res.map((contributor)=>{
                return(
                    <li key={contributor.id}>{contributor.login}</li>
            )})
        })
    )}
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
                                    <a href={e.contributors_url}>{e.contributors_url}</a>
                                    {/* <ul>{this.getContributors(e.contributors_url)}</ul> */}
                                </div>
                            )
                        })
                    }
                </>
            )

        }return(
            <>
                <h1>Oops....</h1>
            </>
        )
    }
}
export default Repos