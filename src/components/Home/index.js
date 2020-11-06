import React from 'react'
import Repos from '../Repos';
import './style.css';
class Home extends React.Component{
  state = {org:"",m:"",n:"",data:[]};
  componentDidMount(){
    this.setState({org:this.props.data.org,
      m:this.props.data.m,
      n:this.props.data.n,
      data:this.props.data.data
    })
    // console.log(this.props);
  }
  componentDidUpdate(prevProps){
    if(this.props!==prevProps){
      this.setState({org:prevProps.data.org,
        m:prevProps.data.m,
        n:prevProps.data.n,
        data:prevProps.data.data
      })
    }
  }
  render(){
    if(this.state.data.length!==0){
      return (
        <div className="home">
          <Repos
            data={this.state.data}
            org={this.state.org}
            key={this.state.org}
            handleClick={this.props.handleClick}>
          </Repos>
        </div>
      )
    }else{
      return(
        <div className="home">
          <h1>Oops.........something went wrong</h1>
        </div>
      )
    }
  }
}
export default Home;
