import React, { Component } from "react";
import './TableDetailBingo.scss'
import { connect } from "react-redux"
import { getAllBingo, getCheckBingo } from '../action/adminActions'
import { toast } from 'react-toastify'

//thêm tệp âm thanh
import winNotification from '../assets/win1.mp3';
import loseNotification from '../assets/fail.mp3';

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
        let value = event.target.value.trim()
        // if (+id === 3) {
        //     console.log('id', id)
        //     if (typeof value === 'string') {
        //         if (value.toLowerCase() === 'free') {
        //             console.log('id text', id)

        //             let bingoCopy = [...this.state.bingo];
        //             bingoCopy[+id - 1] = value
        //             this.setState({
        //                 bingo: [...bingoCopy]
        //             })
        //             return;
        //         }
        //     }
        //     if (+value > 0 && +value < 76) {
        //         console.log('id number', id)

        //         let bingoCopy = [...this.state.bingo];
        //         bingoCopy[+id - 1] = +value
        //         this.setState({
        //             bingo: [...bingoCopy]
        //         })
        //     }

        // }

        // if (+id !== 3 && value > 0 && value < 76) {
        //     let bingoCopy = [...this.state.bingo];
        //     bingoCopy[+id - 1] = +value
        //     this.setState({
        //         bingo: [...bingoCopy]
        //     })
        // } else {
        //     toast.error('Không được nhập trùng số, và phải nhỏ hơn 76')
        //     let bingoCopy = [...this.state.bingo];
        //     bingoCopy[+id - 1] = ''
        //     this.setState({
        //         bingo: [...bingoCopy]
        //     })
        // }
        let bingoCopy = [...this.state.bingo];

        if (+id === 3) { // Kiểm tra xem đây có phải là ô thứ 3 hay không
            if (value.toLowerCase() === 'free' || value.toLowerCase() === 'f' || value.toLowerCase() === 'fr' || value.toLowerCase() === 'fre') {
                bingoCopy[+id - 1] = value; // Gán giá trị "free"
                this.setState({ bingo: [...bingoCopy] });
            } else if (!isNaN(value) && +value > 0 && +value < 76) {
                // Kiểm tra xem giá trị có phải là số từ 1 đến 75
                bingoCopy[+id - 1] = +value;
                this.setState({ bingo: [...bingoCopy] });
            } else {
                toast.error('Vui lòng nhập số từ 1 đến 75 hoặc "free"');
                bingoCopy[+id - 1] = '';
                this.setState({ bingo: [...bingoCopy] });
            }
        } else if (!isNaN(value) && +value > 0 && +value < 76) {
            // Xử lý các ô khác, chỉ cho phép số từ 1 đến 75
            bingoCopy[+id - 1] = +value;
            this.setState({ bingo: [...bingoCopy] });
        } else {
            toast.error('Vui lòng nhập số từ 1 đến 75');
            bingoCopy[+id - 1] = '';
            this.setState({ bingo: [...bingoCopy] });
        }
    }


    handleCheckBingo = async () => {
        let { bingo } = this.state;
        let bingoNew = new Set(bingo);
        bingoNew = [...bingoNew]
        let arrayDial = this.props.arrayDial;
        if (bingoNew.length === 5) {
            console.log('bingo', bingo)
            console.log('arrayDial', arrayDial)
            let isBingo = false;
            isBingo = bingo.every((item, index) => arrayDial.includes(item));
            if (isBingo) {
                //tạo và phát ấm thanh với hàm Audio
                this.props.checkBingo(bingoNew)
                const audio = new Audio(winNotification);
                audio.play();
                toast.success('BINGO !!!')
                // this.setState({
                //     bingo: Array(5).fill('')
                // })
            } else {
                toast.error('Chưa đạt BINGO!!')
                const audio = new Audio(loseNotification);
                audio.play();
                // this.setState({
                //     bingo: Array(5).fill('')
                // })
            }
        } else {
            toast.error('Bạn cần nhập đủ 5 ô, giá trị trong ô không được trùng!!')
        }
    };

    handleClear = () => {
        this.setState({
            bingo: Array(5).fill('')
        })
    };

    render() {
        let { number, arrayDial, bingo } = this.state;
        if (number.length < 75) return <div>Loading data...</div>;
        // console.log(arrayDial)
        return (
            <>
                <div className="table-bingo-container">
                    <div className="btn-bingo" onClick={() => this.handleCheckBingo()}>BINGO</div>
                    <div className="number-container">
                        <div className="number-bingo">
                            <input type='text'
                                value={bingo[0]}
                                onChange={(event) => { this.handleOnchaneBingo(event, '1') }}
                            // onBlur={(event) => { this.handleOnchaneBingo(event, '1') }}
                            >
                            </input>
                        </div>
                        <div className="number-bingo">
                            <input
                                type='text'
                                value={bingo[1]}
                                onChange={(event) => { this.handleOnchaneBingo(event, '2') }}
                            >
                            </input>
                        </div>
                        <div className="number-bingo">
                            <input
                                type='text'
                                value={bingo[2]}
                                onChange={(event) => { this.handleOnchaneBingo(event, '3') }}
                            >
                            </input>
                        </div>
                        <div className="number-bingo">
                            <input
                                type='text'
                                value={bingo[3]}
                                onChange={(event) => { this.handleOnchaneBingo(event, '4') }}
                            // onBlur={(event) => { this.handleOnchaneBingo(event, '4') }}
                            >
                            </input>
                        </div>
                        <div className="number-bingo">
                            <input
                                type='text'
                                value={bingo[4]}
                                onChange={(event) => { this.handleOnchaneBingo(event, '5') }}
                            // onBlur={(event) => { this.handleOnchaneBingo(event, '5') }}
                            >
                            </input>
                        </div>
                    </div>
                    <div className="clear-bingo" onClick={() => this.handleClear()}>Clear</div>

                    <div className="table-container">
                        {number && number.length > 0 &&
                            number.map((row, index) => {
                                let rowNumber = +row.value
                                const isActive = arrayDial && arrayDial.length > 0 && arrayDial.includes(rowNumber);
                                if (index < 75) {
                                    return (
                                        <div
                                            key={index}
                                            className={`table-row ${isActive ? 'active' : ''}`}
                                        >
                                            {row.value}
                                        </div>
                                    )
                                }
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
        checkBingo: (data) => dispatch(getCheckBingo(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableDetailBingo);