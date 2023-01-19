import Todos from './components/todos';
import Login from './components/login';
import SignIn from './components/register';
import Note from './components/note';
import NoteAdd from './components/note/note-item/note-add';
import NoteItem from './components/note/note-item'
import BlogList from './components/blog';
import Post from './components/blog/post';


import {Link, Route, Routes, NavLink, Navigate} from 'react-router-dom'
import { CheckAuth } from './components/checkAuth';
import { useDispatch, useSelector } from 'react-redux';
import { checkMe, logout } from './redux/userSlice';

import './App.css'
import { useEffect } from 'react';
import AddPost from './components/blog/add-post/add-post';
import ChangePost from './components/blog/change-post/change-post';




const nav = [
  {herf: '/posts', text: "Blog"},
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
    if(window.localStorage.getItem('token')){
      dispatch(checkMe())
    }
  }, [])

  return (
    <div className="App">
      <div className='head'>
        <div className='contain-nav'>
          <div>
            {nav.map((res) =><NavLink className={({isActive}) => (!isActive ? 'nav-item' : 'nav-item-selected')} to={res.herf}>{res.text}</NavLink>)}
          </div>
          <div>
            {user
            ?<>
              <Link to='/add-post' className='add-post'>Add post</Link>
              <Link ><a onClick={() => logoutUser()}>Logout</a></Link> 
            </>
            :<Link to={"/login"}>Login</Link>
            }
          </div>
        </div>
       
        
      </div>
      

    <Routes>
      <Route path='/login' element={<Login/>} />
      <Route path='/register' element={<SignIn/>} />
      <Route path='/' element={<Navigate to='/posts' />}/>
      <Route path='/posts' element={<BlogList/>} />
      
    
      <Route path='/posts/:id' element={
        <CheckAuth>
            <Post/>
        </CheckAuth>
      }/>
      <Route path='/posts/:id/edit' element={
        <CheckAuth>
            <ChangePost/>
        </CheckAuth>
      }/>
      <Route path='/add-post' element={
        <CheckAuth>
            <AddPost/>
        </CheckAuth>
      }/>
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
    </Routes>
    </div>
  );
}

export default App;
