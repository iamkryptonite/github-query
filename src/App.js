import React from 'react'
import Home from './components/Homepage';
import Form from './components/Form'
import axios from 'axios';
import './App.css';
class App extends React.Component{
  state = {org:"",m:"",n:"",data:[]};
  componentDidUpdate(prevState){
    if(this.state.org!==prevState.org){
      var tmp=[];
      if(this.state.org){
        axios.get('https://api.github.com/orgs/'+this.state.org+'/repos')
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
            // console.log(this.state.data)
        })
        .catch((error)=>{
          this.setState({status:404})
            console.log(error);
        })
      }
    }
  }
  handleSubmit=(event)=> {
    event.preventDefault();
    this.setState({
      org:event.target.elements.org.value,
      m:event.target.elements.m.value,
      n:event.target.elements.n.value,
    })
    console.log(this.state);
  }
  render(){
    if(this.state.data.length!==0){
      return (
        <div className="App">
          <h1>Github Query</h1>
          <Form
            handleSubmit={this.handleSubmit}
            org={this.state.org}
            m={this.state.m}
            n={this.state.n}>
          </Form>
          <Home data={this.state.data} key={this.state.org}/>
        </div>
      )
    }else{
      return(
        <div className="App">
          <h1>Github Query</h1>
          <Form
            handleSubmit={this.handleSubmit}
            org={this.state.org}
            m={this.state.m}
            n={this.state.n}>
          </Form>
        </div>
      )
    }
  }
}
export default App;
