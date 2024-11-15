import React, { Component } from "react";
import './TableDetailBingo.scss'
import { connect } from "react-redux"
import { getAllBingo } from '../action/adminActions'


class TableDetailBingo extends Component {
    state = {
        number: [],
        arrayDial: [],
        bingo: Array(5).fill('')
    };

    async componentDidMount() {
        this.props.fetAllBingo();
        // const arrayNumber = 'http://localhost:4000/number'
        // fetch(arrayNumber)
        //     .then(response => response.json())
        //     // .then(data => console.log(data))
        //     .then(data => this.setState({
        //         number: data,
        //     }))

    }

    async componentDidUpdate(prevProps) {
        if (prevProps.bingoAll !== this.props.bingoAll) {
            this.setState({
                number: this.props.bingoAll,
            })
        }

        if (prevProps.arrayDial !== this.props.arrayDial) {
            let copyArrayDial = [...this.props.arrayDial]
            this.setState({
                ...this.state,
                arrayDial: copyArrayDial,
            });
        }
    }

    handleOnchaneBingo = (event, id) => {
        let { bingo } = this.state
        console.log(typeof Object.keys(bingo));

        let value = +event.target.value
        // let isvalue = Object.keys(bingo).includes(value)
        // console.log(isvalue);
        if (value && !this.state.bingo.includes(value)) {
            let bingoCopy = [...this.state.bingo];
            bingoCopy[+id - 1] = value
            this.setState({
                bingo: [...bingoCopy]
            }, () => console.log(this.state.bingo))
        } else if (this.state.bingo.includes(value)) {
            alert('Không được nhập trùng số')
            let bingoCopy = [...this.state.bingo];
            bingoCopy[+id - 1] = ''
            this.setState({
                bingo: [...bingoCopy]
            }, () => console.log(this.state.bingo))
        }
    }

    render() {
        let { number, arrayDial, bingo } = this.state;
        if (number.length < 75) return <div>Loading data...</div>;

        return (
            <>
                <div className="table-bingo-container">
                    <div className="btn-bingo" >Bingo</div>
                    <div className="number-container">

                        <div className="number-bingo"><input type='text' value={bingo[0]} onChange={(event) => { this.handleOnchaneBingo(event, '1') }}></input></div>
                        <div className="number-bingo"><input type='text' value={bingo[1]} onChange={(event) => { this.handleOnchaneBingo(event, '2') }}></input></div>
                        <div className="number-bingo"><input type='text' value={bingo[2]} onChange={(event) => { this.handleOnchaneBingo(event, '3') }}></input></div>
                        <div className="number-bingo"><input type='text' value={bingo[3]} onChange={(event) => { this.handleOnchaneBingo(event, '4') }}></input></div>
                        <div className="number-bingo"><input type='text' value={bingo[4]} onChange={(event) => { this.handleOnchaneBingo(event, '5') }}></input></div>
                    </div>

                    <div className="table-container">
                        {number && number.length > 0 &&
                            number.map((row, index) => {
                                let rowNumber = +row.value
                                const isActive = arrayDial && arrayDial.length > 0 && arrayDial.includes(rowNumber);
                                return (
                                    <div
                                        key={index}
                                        className={`table-row ${isActive ? 'active' : ''}`}
                                    >
                                        {row.value}
                                    </div>

                                )
                            })
                        }
                    </div>
                </div >
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
        fetAllBingo: () => dispatch(getAllBingo()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableDetailBingo);