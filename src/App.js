import React from 'react';
import Cache from 'cache';
import axios from 'axios';
import        './App.css';
import Form from './components/Form';
import Home from './components/Home';
import Contributors from './components/Contributors';
import { BrowserRouter as Router, Route } from "react-router-dom";

const cache = new Cache(3600 * 1000);    // Create a cache with 1 hr TTL
class App extends React.Component{
  state = {org:"",m:"",n:"",data:[]};
  componentDidUpdate(prevState){
    if(this.state.org!==prevState.org){
      var tmp=[];
      if(this.state.org && !cache.get(this.state.org)){
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
            cache.put(this.state.org,this.state);
        })
        .catch((error)=>{
          this.setState({status:404})
            console.log(error);
        })
      }
    }else if(cache.get(this.state.org)){
      var store = cache.get(this.state.org);
      this.setState({
        org:store.org,
        m:store.m,
        n:store.n,
        data:store.data
      })
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
    return(
      <div className="App">
        <h1>Github Query</h1>
        <Form handleSubmit={this.handleSubmit}
            org={this.state.org}
            m={this.state.m}
            n={this.state.n}>
        </Form>
        <Router>
          <Route exact path="/"><Home data={this.state}/></Route>
          <Route path="/contributors"><Contributors/></Route>
        </Router>
      </div>
    )
    }
}
export default App;
