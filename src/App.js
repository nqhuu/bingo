// import logo from './logo.svg';
import './App.scss';

import React, { Component } from 'react';
import QuaySo from './component/QuaySo';
import TableDetailBingo from './component/TableDetailBingo';
import ResultBingo from './component/ResultBingo';

import { connect } from "react-redux"
import { ToastContainer } from 'react-toastify';

// import {
//   increaseCounter,
//   decreaseCounter,
// } from "./action/actions"


class App extends Component {
  componentDidMount() {
    window.addEventListener('beforeunload', this.handleBeforeUnload);
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.handleBeforeUnload);
  }

  handleBeforeUnload = (event) => {
    event.preventDefault();
    event.returnValue = ''; // Một số trình duyệt yêu cầu `returnValue` được gán một chuỗi trống
  }
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
        <ToastContainer
          // position="top-center"
          position="top-left"
          autoClose={5000}
          // limit={1}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
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
    // increaseCounter: () => dispatch(increaseCounter()),
    // decreaseCounter: () => dispatch(decreaseCounter()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
// export default App;

