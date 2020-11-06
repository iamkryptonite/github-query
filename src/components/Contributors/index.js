import React from 'react';
import axios from 'axios';
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
                    <h1>{this.state.name}</h1>
                    {
                        this.state.data.map((e)=>{
                            return(
                                <div key={e.id}>
                                    <h4>{e.name} - {e.contributions}</h4>
                                </div>
                            )
                        })
                    }
                </>
            )
        }else{
            return(
                <></>
            )
        }
    }
}
export default Contributors