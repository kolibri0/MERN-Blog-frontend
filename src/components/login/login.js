import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { AiOutlineExclamation} from 'react-icons/ai'
import { Tooltip } from 'react-tooltip'
import { useDispatch } from 'react-redux'

import styles from '../auth.module.css'
import 'react-tooltip/dist/react-tooltip.css'
import { loginUser } from "../../redux/userSlice";

const Login = () => {
    const dispatch = useDispatch()
    const {
        register,
        formState: {errors},
        handleSubmit,
    } = useForm()

    const userLogin = (data) => {
        dispatch(loginUser(data))
    }

    return(
    <div className={styles.auth}>
        <div className={styles.containText}>Login</div>
        <form className={styles.form} onSubmit={handleSubmit(userLogin)}>
            <label className={styles.label}>
                <input className={styles.input} {...register("email", {
                required: 'Field required',
                pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                }
                })} placeholder='email...'/>
                {errors.email ? <div className={styles.icon} id='email'><AiOutlineExclamation /></div> : null}
                {errors.email ?<Tooltip 
                anchorId="email" 
                content={errors?.email.message || 'Something wrong'} 
                style={{backgroundColor: 'red'}} 
                />:null}
            </label>
            
            <label className={styles.label}>
                <input className={styles.input} {...register("password", {
                    required: 'Field required',
                    minLength:{
                        value: 6,
                        message: "Min 6 characters"
                    }
                })} placeholder='password...'/>

                {errors.password ? <div className={styles.icon} id='password'><AiOutlineExclamation /></div> : null}
                {errors.password ? 
                <Tooltip 
                anchorId="password" 
                content={errors?.password.message} 
                style={{backgroundColor: 'red'}} 
                />: null}
            </label>

            <input className={styles.submit} type='submit' value="Login"/>
            <Link className={styles.account} to='/register'>Register?</Link>    
            
        </form>
    </div>
    )
}

export default Login