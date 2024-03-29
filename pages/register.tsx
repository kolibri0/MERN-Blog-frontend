import { useForm } from "react-hook-form";
import { Tooltip } from 'react-tooltip'
import { AiOutlineExclamation } from 'react-icons/ai'
import { registerUser, userAuthSelector } from "../redux/auth";
import '../types'
import styles from '../styles/auth.module.css'
import 'react-tooltip/dist/react-tooltip.css'
import { useAppDispatch, useAppSelector } from '../redux/hook'
import * as React from 'react';
import { useRouter } from "next/router";
import Layout from "../components/Layout";

const SignIn: React.FC = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm()

  const user = useAppSelector(userAuthSelector)

  const userRegister = (data: any) => dispatch(registerUser(data))

  if (user && localStorage.getItem('token')) {
    router.push('/')
  }

  return (
    <Layout title="Register">
      <div className={styles.auth}>
        <div className={styles.containText}>Create account</div>
        <form className={styles.form} onSubmit={handleSubmit(userRegister)}>
          <label className={styles.label}>
            <input className={styles.input} {...register("email", {
              required: 'Поле обязательно',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address"
              }
            })} placeholder='email...' />
            {errors.email ? <div className={styles.icon} id='email'><AiOutlineExclamation /></div> : null}
            {errors.email ? <Tooltip
              anchorId="email"
              content={errors?.email.message || 'Something wrong'}
              style={{ backgroundColor: 'red' }}
            /> : null}
          </label>

          <label className={styles.label}>
            <input className={styles.input} {...register("password", {
              required: 'Field required',
              minLength: {
                value: 6,
                message: "Min 6 characters"
              }
            })} placeholder='password...' />

            {errors.password ? <div className={styles.icon} id='password'><AiOutlineExclamation /></div> : null}
            {errors.password ?
              <Tooltip
                anchorId="password"
                content={errors?.password.message}
                style={{ backgroundColor: 'red' }}
              /> : null}
          </label>

          <label className={styles.label}>
            <input className={styles.input} {...register("name", {
              required: 'Field required',
              minLength: {
                value: 3,
                message: "Min 3 characters"
              }
            })} placeholder='name...' />
            {errors.name ? <div className={styles.icon} id='name'><AiOutlineExclamation /></div> : null}

            {errors.name ?
              <Tooltip
                anchorId="name"
                content={errors?.name.message}
                style={{ backgroundColor: 'red' }}
              /> : null}
          </label>

          <input className={styles.submit} type='submit' value="Submit" />
        </form>
      </div>
    </Layout>
  )
}

export default SignIn