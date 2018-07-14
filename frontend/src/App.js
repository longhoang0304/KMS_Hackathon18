import React, { Component } from 'react';
import './App.css';
import AddNew from './component/AddNew';
import NavBar from './component/List';
class App extends Component {
   constructor(props){
     super(props);
     this.state = {
        components:'Welcome to My PROJECT',
        works:[]
     };
   }
   onHandle(event) {
    event.preventDefault();
    const  title = this.refs.txtTitle.value;
    const note= this.refs.txtNode.value;
    const start_time = this.refs.txtStart.value;
    const end_time = this.refs.txtEnd.value;
    var work = {
        title,
        note,
        start_time,
        end_time
    };
   
    let temp = this.state.works;
    temp.push(work);
    this.setState({ works: temp });
    console.log(this.state.works);
    
}
  handleNew = (event)=>{
    event.preventDefault();
    let component = this.state.components;
    component = <AddNew onHandle={this.onHandle(event)}/>;
    this.setState({components: component});
  }
  handleList = (event)=>{
    event.preventDefault();
    let component = this.state.components;
    component = <NavBar item={this.state.works} />;
    this.setState({components: component});
  }
  render() {
      return(
      <div>
          <nav className="topnav">
          <a className="active">TO DO LIST </a>
          <a href="" onClick={(e)=>this.handleNew(e)}>Add New</a>
          <a href="" onClick={(e)=>this.handleList(e)}>List</a>
          </nav>
            {this.state.components}
      </div>);
  }
}

export default App;