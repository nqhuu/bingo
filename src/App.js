// import logo from './logo.svg';
import './App.scss';

import React, { Component } from 'react';
import QuaySo from './component/QuaySo';
import TableDetailBingo from './component/TableDetailBingo';
import ResultBingo from './component/ResultBingo';

import { connect } from "react-redux"

import {
  increaseCounter,
  decreaseCounter,
} from "./action/actions"


class App extends Component {
  render() {
    return (
      <div className="App">
        <h1 className='header'>Chào mừng đến với HPGLass Bingo!</h1>
        <div className='table-container'>
          <div className='dial'>
            <QuaySo />
          </div>
          <div className='table-detail'>
            <TableDetailBingo />
          </div>
        </div>
        <div className='result-bingo'>
          <ResultBingo />
        </div>
        {/* 
        <div>Count: {this.props.count}</div>

        <button onClick={() => this.props.increaseCounter()}>Increase Count</button>

        <button onClick={() => this.props.decreaseCounter()}>Decrease Count</button> */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    count: state.counter.count,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    increaseCounter: () => dispatch(increaseCounter()),
    decreaseCounter: () => dispatch(decreaseCounter()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
// export default App;

