import React from 'react';
import Cache from 'cache';
import axios from 'axios';
import        './App.css';
import Form from './components/Form';
import Home from './components/Home';
import Contributors from './components/Contributors';
import { BrowserRouter as Router,Route} from "react-router-dom";

const cache = new Cache(3600 * 1000);
class App extends React.Component{
  state = {org:"",m:null,n:null,data:[],status:200};
  getData=(org)=>{
    var tmp=[];
    axios.get('https://api.github.com/orgs/'+org+'/repos')
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
        cache.put(org,tmp);
    })
    .catch((error)=>{
      this.setState({status:404})
    })
  }
  handleSubmit=(event)=> {
    event.preventDefault();
    cache.put("org",event.target.elements.org.value);
    this.setState({
      org:event.target.elements.org.value,
      m:parseInt(event.target.elements.m.value),
      n:parseInt(event.target.elements.n.value),
    })
    if(!cache.get(cache.get("org"))){
      this.getData(cache.get("org"));
    }else{
      this.setState({ data:cache.get(cache.get("org")) })
    }
  }
  handleClick=(e)=>{
    this.setState({repo:e})
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
        <div className="content">
          <Router>
            <Route exact path="/"><Home data={this.state} handleClick={this.handleClick}/></Route>
            <Route path="/contributors"><Contributors repo={this.state.repo} org={this.state.org} m={this.state.m}/></Route>
          </Router>
        </div>
      </div>
    )
  }
}
export default App;
