import React, { Component } from "react";
import './QuaySo.scss';
import { connect } from "react-redux"
import { arrayDialPost } from "../action/adminActions"




class QuaySo extends Component {
    state = {
        dial: '',
        arrayNumberData: '',
        arrayDial: ['free'],
        numbers: '',
        reset: false,
    }

    componentDidMount() {
        // const arrayNumber = 'http://localhost:4000/number'
        // fetch(arrayNumber)
        //     .then(response => response.json())
        //     // .then(data => console.log(data))
        //     .then(data => this.setState({
        //         arrayNumberData: data,
        //     }))
        let numbers = Array.from({ length: 75 }, (_, i) => i + 1);
        this.setState({
            numbers: numbers
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.arrayDial !== this.state.arrayDial) {
            this.props.arrayDialPost(this.state.arrayDial)
        }
    }

    handleDial = () => {
        const { arrayDial, numbers, reset } = this.state;
        const randomIndexNumber = Math.floor(Math.random() * numbers.length);
        const selectNumber = numbers[randomIndexNumber];

        if (!reset && !arrayDial.includes(numbers[randomIndexNumber]) && numbers.length > 0) {
            numbers.splice(randomIndexNumber, 1);
            // console.log('randomIndexNumber', randomIndexNumber)
            this.setState({
                dial: selectNumber,
                arrayDial: [...arrayDial, selectNumber],
                numbers: [...numbers],
            });
        }

        if (numbers.length === 0 && !reset) {
            this.setState({
                reset: true,
            }, () => console.log(this.state.reset));
            alert('Con số cuối cùng rồi nhé ^-^')
        }
        if (reset) {
            this.setState({
                dial: '',
                arrayDial: ['free'],
                numbers: Array.from({ length: 75 }, (_, i) => i + 1),
                reset: false,
            });
        }
    }

    getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    render() {
        const { dial, reset } = this.state;
        return (
            <>
                <div className="dial-container">
                    <h1>DIAL</h1>
                    <div className="dial-bingo" style={{ color: this.getRandomColor() }}>{dial}</div>
                    <div className="start-dial" onClick={() => this.handleDial()}>
                        {!reset ? <span>START</span> : <span style={{ color: 'blue', fontWeight: '650' }}>Chơi Lại</span>}
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        bingoAll: state.admin.bingoAll,
        arrayDial: state.admin.arrayDial,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        arrayDialPost: (data) => dispatch(arrayDialPost(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuaySo);