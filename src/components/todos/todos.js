import TodoItem from "./todo-item"
import styles from './todos.module.css'
import {BsPlusLg} from 'react-icons/bs'
import { useEffect, useState } from "react"


const Todos = ({user}) => {
    const [todos, setTodos] = useState(null)
    const [text, setText] = useState('')

    return(<>
    <div className={styles.todo}>Todo List</div>
    
    <div className={styles.block}>
        <input className={styles.input} type='text' value={text} onChange={(e) => setText(e.target.value)}/>
        <BsPlusLg className={styles.plus} />
    </div> 
    <TodoItem text={'one'}/>
    <TodoItem text={'two'}/>
    <TodoItem text={'three'}/>
    
    </>)
}

export default Todos