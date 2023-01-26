import Login from './components/login';
import SignIn from './components/register';
import Note from './components/note';
import NoteAdd from './components/note/note-item/note-add';
import NoteItem from './components/note/note-item'
import BlogList from './components/blog';
import Post from './components/blog/post';

import { CgProfile } from 'react-icons/cg'
import {Link, Route, Routes, NavLink, Navigate} from 'react-router-dom'
import { CheckAuth } from './components/checkAuth';
import { checkMe, logout } from './redux/userSlice';

import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './App.module.css'
import Alert from 'react-bootstrap/Alert';
import { useEffect } from 'react';
import AddPost from './components/blog/add-post/add-post';
import ChangePost from './components/blog/change-post/change-post';
import Profile from './components/blog/profile/profile';

import { useAppDispatch, useAppSelector } from './redux/hook';


interface INav{
  href: string,
  text: string
}

const nav: INav[] = [
  {href: '/posts', text: "Blog"},
  {href: '/note', text: "Note"},
]

function App() {
  const {user, error} = useAppSelector(state => state.userSlice)
  const dispatch = useAppDispatch()
  const logoutUser = () => {
    dispatch(logout(null))
  }

  useEffect(() => {
    if(window.localStorage.getItem('token')){
      dispatch(checkMe())
    }
  }, [])

  if (error) {
    return (
      <Alert variant="danger" style={{width: '500px', margin: '10px auto'}}>
        <Alert.Heading>Oh snap! Somthing wrong!</Alert.Heading>
        <p>
        Please reload the page 
        
        </p>
      </Alert>
    );
}

  return (
    <div className="App">
      <div className={styles.head}>
        <div className={styles.containNav}>
          <div>
            {nav.map((res: INav) =><NavLink className={({isActive}) => (!isActive ? styles.navItem : styles.navItemSelected)} to={res.href}>{res.text}</NavLink>)}
          </div>
          <div>
            {user
            ?<>
              <Link to='/add-post' className={styles.addPost}>Add post</Link>
              <Link to={`/user/${user._id}`} className={styles.myProfile}>
                  <CgProfile className={styles.profileIcon} style={{color: `${user.color}`}}/>
              </Link>
              <a onClick={() => logoutUser()} className={styles.logout}>Logout</a> 
            </>
            :<Link className={styles.logout} to={"/login"}>Login</Link>
            }
          </div>
        </div>
       
        
      </div>
      

    <Routes>
      <Route path='/login' element={<Login/>} />
      <Route path='/register' element={<SignIn/>} />
      <Route path='/' element={<Navigate to='/posts' />}/>
      <Route path='/posts' element={<BlogList/>} />
      <Route path='/posts/tag/:tag' element={<BlogList/>} />
    
      <Route path='/user/:id' element={
        <CheckAuth>
            <Profile/>
        </CheckAuth>
      }/>
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
