import React from 'react'
import Repos from '../Repos';
import './style.css';
class Home extends React.Component{
  state = {...this.props.data};
  componentDidMount(){
    this.setState({org:this.props.data.org,
      m:this.props.data.m,
      n:this.props.data.n,
      data:this.props.data.data
    })
  }
  componentDidUpdate(prevProps){
    if(this.props!==prevProps){
      this.setState({...this.props.data})
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
            n={this.state.n}
            m={this.state.m}
            handleClick={this.props.handleClick}>
          </Repos>
        </div>
      )
    }else if(this.state.status===200){
      return(
        <div className="home">
          <h1>Enter the organization name,number of repositories and number of contributors</h1>
        </div>
      )
    }else if(this.state.status===404){
      return(
        <div className="home">
          <h1>Oops....something went wrong</h1>
          <p>Make sure you enter the correct organisation name or try again after some time</p>
        </div>
      )
    }
  }
}
export default Home;
