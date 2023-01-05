import TodoItem from "./todo-item"
import styles from './todos.module.css'
import {BsPlusLg} from 'react-icons/bs'
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { createTodos, getTodos } from "../../redux/todoSlice"


const Todos = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.userSlice.user)
    const todos = useSelector(state => state.todoSlice.todos)
    const [text, setText] = useState('')

    useEffect(() => {
        dispatch(getTodos(user))
    }, [todos])

    const create = () => {
        dispatch(createTodos(text, user))
    }

    return(<>
    <div className={styles.todo}>Todo List</div>
    
    <div className={styles.block}>
        <input className={styles.input} type='text' value={text} onChange={(e) => setText(e.target.value)}/>
        <BsPlusLg className={styles.plus} onClick={() => create()}/>
    </div> 
    {todos && todos.slice().reverse().map(item => <TodoItem key={item._id} text={item.text} id={item._id}/>)}
    </>)
}

export default Todos