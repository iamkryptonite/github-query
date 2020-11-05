import React from 'react'
import Home from './components/Homepage';
import Form from './components/Form'
import './App.css';
class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {org:"",m:"",n:""};
    // this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  // handleChange(event){
  //   this.setState({[event.target.name]: event.target.value})
  // };
  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      org:event.target.elements.org.value,
      m:event.target.elements.m.value,
      n:event.target.elements.n.value,
    })
    console.log(this.state);
  }
  render(){
    return (
      <div className="App">
        <h1>Github Query</h1>
        <Form
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          org={this.state.org}
          m={this.state.m}
          n={this.state.n}>
        </Form>
        <Home org="google"/>
      </div>
    )
  }
}
export default App;
