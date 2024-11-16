import React, { Component } from "react";
import { connect } from "react-redux"
import './ResultBingo.scss'


class ResultBingo extends Component {
    state = {
        result: [],
    }

    getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.result !== this.props.result) {
            this.setState({ result: this.props.result });
        }
    }
    render() {
        let { result } = this.state;
        // console.log(result);
        return (
            <>
                <h1>Bảng kết quả</h1>
                <div className="result-container">
                    {result && result.length > 0 && result.map((item, index) => {
                        // console.log(item);
                        return (
                            <div
                                className="result-bingo-container"
                                key={index}
                                style={{ backgroundColor: this.getRandomColor() }}
                            >
                                {item && item.map((result, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className="result-bingo"
                                        >
                                            {result}
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    })}
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        bingoAll: state.admin.bingoAll,
        arrayDial: state.admin.arrayDial,
        result: state.admin.result,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        // arrayDialPost: (data) => dispatch(arrayDialPost(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultBingo);