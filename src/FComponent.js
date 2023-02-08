import {useEffect, useState} from "react";

export default function FComponent() {
    // hooK: dùng được state và life cycle trong Function component
    let [list, setList] = useState([
        {
            name: 'Anh',
            age: 23
        },
        {
            name: 'Bạn',
            age: 22
        }
    ])
    let [name, setName] = useState('')
    let [age, setAge] = useState('')
    let [id, setId] = useState('')
    let [isAdd, setIsAdd] = useState(false)
    // useEffect(() => {
    //     console.log(1) // chay lien tuc sau re-render
    //     return () => {
    //         console.log(5) // chay 1 lan truoc khi unmount
    //     }
    // }, []) // chay 1 lan sau render lan dau

    function show(ind) {
        console.log(ind)
        setName(list[ind].name)
        setAge(list[ind].age)
        setId(ind)
        setIsAdd(true)
    }

    function Delete(ind) {
        let choice = window.confirm("Ban chac chan muon xoa?")
        if(choice) {
            let arr = [...list]
            arr.splice(ind, 1)
            setList(arr)
            setName('')
            setAge('')
        }
    }

    function Edit() {
        let choice = window.confirm("Ban co chac muon sua?")
        if(choice) {
            let arr = [...list]
            console.log(id)

            {list.map((item, ind) => {
                if(ind == id) {
                    arr[ind].name = name
                    arr[ind].age = age
                }
            })}

            console.log(arr)
            setList(arr)
            setName('')
            setAge('')
            setId('')
            setIsAdd(false)
        }


    }

    return (
        <>
            <table border={1}>
                <th>Ten</th>
                <th>Tuoi</th>
                <th></th>
                {list.map((item, ind) => (
                    <>
                        <tr>
                            <td>{item.name}</td>
                            <td>{item.age}</td>
                            <td>
                                <button onClick = {() => {show(ind)}}>edit</button>
                                <button onClick = {() => {Delete(ind)}}>delete</button>
                            </td>
                        </tr>

                    </>
                ))}
            </table>

            <input type="text" value={name} onChange={(e) => {
                setName(e.target.value)
            }}/>
            <input type="text" value={age} onChange={(e) => {
                setAge(e.target.value)
            }}/>
            <input type="hidden" value={id} onChange={(e) => {
                setId(e.target.value)
            }}/>
            {!isAdd && <button onClick={() => {
                setList([...list, {
                    name: name,
                    age: age
                }])
                setName('')
                setAge('')
            }}>Add</button>}

            {isAdd && <button onClick={() => {Edit()}}>Edit</button>}
        </>
    )
}