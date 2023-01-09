import Todos from './components/todos';
import Login from './components/login';
import SignIn from './components/register';
import Note from './components/note';
import NoteAdd from './components/note/note-item/note-add';
import NoteItem from './components/note/note-item'

import {Link, Route, Routes} from 'react-router-dom'
import { CheckAuth } from './components/checkAuth';
import { useDispatch, useSelector } from 'react-redux';
import { checkMe, logout } from './redux/userSlice';

import './App.css'
import { useEffect } from 'react';


const nav = [
  {herf: '/todos', text: "Todos"},
  {herf: '/note', text: "Note"},
]

function App() {
  const {user} = useSelector(state => state.userSlice)
  const dispatch = useDispatch()
  const logoutUser = () => {
    dispatch(logout(null))
  }

  useEffect(() => {
    dispatch(checkMe())
  }, [])

  return (
    <div className="App">
      <div className='head'>
        <div className='contain-nav'>
          <div>
            {nav.map((res) =><Link to={res.herf}>{res.text}</Link>)}
          </div>
          <div>
            {user
            ?<Link><a onClick={() => logoutUser()}>Logout</a></Link> 
            :<Link to={"/login"}>Login</Link>
            }
          </div>
        </div>
       
        
      </div>
      

    <Routes>
      <Route path='/todos' element={
        <CheckAuth>
            <Todos/>
        </CheckAuth>
      }/>
      <Route path='/note' element={
        <CheckAuth>
            <Note/>
        </CheckAuth>
      }/>
       <Route path='/note/:id' element={
        <CheckAuth>
            <NoteItem/>
        </CheckAuth>
      }/>
      <Route path='/note/:id/edit' element={
        <CheckAuth>
            <NoteAdd/>
        </CheckAuth>
      }/>
      <Route path='/add-note' element={
        <CheckAuth>
            <NoteAdd/>
        </CheckAuth>
      }/>
      <Route path='/login' element={<Login/>} />
      <Route path='/register' element={<SignIn/>} />
    </Routes>
    </div>
  );
}

export default App;
