import React from 'react';
import axios from 'axios';
import './style.css';
class Homepage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {data:[]};
    }
    componentDidMount(){
        var tmp=[];
        console.log(this.props.org);
        axios.get('https://api.github.com/orgs/'+this.props.org+'/repos')
        .then((response)=>{
            response.data.forEach(e=>{
                tmp.push({
                    id:e.id,
                    name:e.name,
                    forks:e.forks_count,
                    contributors_url:e.contributors_url,
                    desc:e.description
                })
            })
        })
        .then(()=>{
            tmp.sort(function(a,b){
                return b.forks-a.forks
            })
            this.setState({data:tmp})
        })
        .catch((error)=>{
            console.log(error);
        })
    }
    render(){
        return(
            <>
                {
                    this.state.data.map((e)=>{
                        return(
                            <div  className="repo" key={e.id}>
                                <h4 key={e.id} >{e.name} - {e.forks}</h4>
                                <p>{e.desc}</p>
                            </div>
                        )
                    })
                }
            </>
        )
    }
}
export default Homepage