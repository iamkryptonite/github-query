import React from 'react';
import './style.css';
class Homepage extends React.Component{
    state={}
    componentDidMount(){
        this.setState({data:this.props.data});
        console.log(this.state.data);
    }
    componentDidUpdate(prevProps){
        if(this.props!==prevProps){
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
                                    <a href={e.contributors_url}>{e.contributors_url}</a>
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
export default Homepage