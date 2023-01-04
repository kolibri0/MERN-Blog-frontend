import Todos from './components/todos';
import Login from './components/login';
import SignIn from './components/register';
import {Link, Route, Routes} from 'react-router-dom'
import { CheckAuth } from './components/checkAuth';
import { useDispatch } from 'react-redux';
import { logout } from './redux/userSlice';

function App() {
const dispatch = useDispatch()
  const logoutUser = () => {
    dispatch(logout(null))
  }

  return (
    <div className="App">
      <div>
        <Link to='/login'>Login</Link>
        <Link to='/todos'>Todos</Link>
        <a onClick={() => logoutUser()}>Logout</a>
      </div>
    <Routes>
      <Route path='/todos' element={
        <CheckAuth>
            <Todos/>
        </CheckAuth>
      }/>
      <Route path='/login' element={<Login/>} />
      <Route path='/register' element={<SignIn/>} />
    </Routes>
    </div>
  );
}

export default App;
