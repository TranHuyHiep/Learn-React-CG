import {Component} from "react";

export default class Demo extends Component {
    constructor() {
        super();
        this.state = {
            list: [
                {
                    name: 'Anh',
                    age: 23
                },
                {
                    name: 'Bạn',
                    age: 22
                }
            ],
            inpName: '',
            inpAge: '',
            inId: '',
            isEdit: false
        }
    }

    add = ()=> {
        this.setState((state) => {
            return {
                list: [...state.list, {name: state.inpName, age: state.inpAge}],
                inpName: '',
                inpAge: ''
            }
        })
    }

    change = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    show = (e) => {
        this.setState({
            inpName: this.state.list[e.target.id].name,
            inpAge: this.state.list[e.target.id].age,
            inId: e.target.id,
            isEdit: true
        })
    }

    delete = (e) => {
        let choice = window.confirm("Ban co chac muon xoa?")
        let arr = [...this.state.list]
        console.log(e.target.id)
        if(choice) {
            arr.splice(e.target.id, 1)
            this.setState((state) => {
                return {
                    list: arr,
                    inpName: '',
                    inpAge: ''
                }
            })
        }
    }

    edit = () => {
        let choice = window.confirm("Ban co chac muon sua?")
        let arr = [...this.state.list]
        if(choice) {
            {this.state.list.map((item, ind) => {
                if(ind == this.state.inId) {
                    arr[ind].name = this.state.inpName
                    arr[ind].age = this.state.inpAge
                }
            })}
        }
        this.setState({
            list: arr,
            inpName: '',
            inpAge: '',
            isEdit: false
        })
    }

    render() {
        return (
            <>
                <table border={1}>
                    <th>Ten</th>
                    <th>Tuoi</th>
                    <th></th>
                {this.state.list.map((item, ind) => (
                    <>
                            <tr>
                                <td>{item.name}</td>
                                <td>{item.age}</td>
                                <td>
                                    <button id={ind} onClick={this.show}>edit</button>
                                    <button id={ind} onClick={this.delete}>delete</button>
                                </td>
                            </tr>

                    </>
                ))}
                </table>
                <input type="text" name={'inpName'} value={this.state.inpName} onChange={this.change}/>
                <input type="text" name={'inpAge'} value={this.state.inpAge} onChange={this.change}/>
                <input type="hidden" name={'inId'} value={this.state.inId}/>
                {!this.state.isEdit && <button onClick={this.add}>Add</button>}
                {this.state.isEdit && <button onClick={this.edit}>Edit</button>}
            </>
        )
    }
}