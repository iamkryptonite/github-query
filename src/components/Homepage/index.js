import React from 'react';
import axios from 'axios';
import PriorityQueue from 'js-priority-queue';
class Homepage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {data:[]};
    }
    componentDidMount(){
        var tmp=[];
        axios.get('https://api.github.com/orgs/google/repos')
        .then((response)=>{
            response.data.forEach(e=>{
                tmp.push({
                    id:e.id,
                    name:e.name,
                    forks:e.forks_count,
                    contributors_url:e.contributors_url,
                })
            })
        })
        .then(()=>{
            tmp.sort(function(a,b){
                return b.forks-a.forks
            })
            this.setState({data:tmp})
        })
    }
    render(){
        return(
            <>
                <h1>Github Query</h1>
                <h3>Name - Forks</h3>
                {
                    this.state.data.map((e)=>{
                        return(
                            <h4 key={e.id} >{e.name} - {e.forks}</h4>
                        )
                    })
                }
            </>
        )
    }
}
export default Homepage