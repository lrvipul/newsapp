import './App.css';


import React, { Component } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar';


import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";

export default class App extends Component {

  pageSize = 15;
  apiKey =  process.env.REACT_APP_NEWS_API_KEY;    // APi Key : 253f697cb69d4e51807f44ae234e6002 / Vips Key :  41363d0d76ab4c08a6ea15df1d8ec718
  
  
  state = {
    progress:10
  }

  setProgress = (progress) => {
    this.setState({progress:progress})
  }
 

  render() {
    
    return (
          <BrowserRouter>
            <LoadingBar
              color="#f11946"
              progress={this.state.progress}
            />

            <NavBar/>
              {/* cant use country and category together */}
              
              <Routes>
                <Route exact path="/" element={<News setProgress={this.setProgress}  apiKey={this.apiKey} key="general" pageSize={this.pageSize} country="" category="general"/>}  />
                <Route exact path="/business" element={<News setProgress={this.setProgress}  apiKey={this.apiKey} key="business" pageSize={this.pageSize} country="" category="business"/>}  />
                <Route exact path="/entertainment" element={<News setProgress={this.setProgress}  apiKey={this.apiKey} key="entertainment" pageSize={this.pageSize} country="" category="entertainment"/>}  />
                <Route exact path="/health" element={<News setProgress={this.setProgress}  apiKey={this.apiKey} key="health" pageSize={this.pageSize} country="" category="health"/>}  />
                <Route exact path="/science" element={<News setProgress={this.setProgress}  apiKey={this.apiKey} key="science" pageSize={this.pageSize} country="" category="science"/>}  />
                <Route exact path="/sports" element={<News setProgress={this.setProgress}  apiKey={this.apiKey} key="sports" pageSize={this.pageSize} country="" category="sports"/>}  />
                <Route exact path="/technology" element={<News setProgress={this.setProgress}  apiKey={this.apiKey} key="technology" pageSize={this.pageSize} country="" category="technology"/>}  />
              </Routes>
          </BrowserRouter>
    )
  }
}


