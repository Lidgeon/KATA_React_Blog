import { Button } from 'antd'
import { Link, Redirect } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { ajvResolver } from '@hookform/resolvers/ajv'
import { fullFormats } from 'ajv-formats/dist/formats'
import { useSelector, useDispatch } from 'react-redux'
import { ToastContainer } from 'react-toastify'

import { getLogin } from '../../../redux/slices/authSlice'
import { signInSchema } from '../../../consts/validate'
import { SIGN_UP_ROUTE, HOME_ROUTE } from '../../../consts/routes'

import 'react-toastify/dist/ReactToastify.css'

import classes from './SignIn.module.scss'

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: ajvResolver(signInSchema, {
      formats: fullFormats,
      $data: true,
    }),
  })

  const auth = useSelector((state) => state.authReducer.isAuth)

  const dispatch = useDispatch()

  if (auth) {
    return <Redirect to={HOME_ROUTE} />
  }

  const onSubmit = (data) => {
    const loginDate = {
      email: data.email,
      password: data.password,
    }
    dispatch(getLogin(loginDate))
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
        <p className={classes.title}>Sign In</p>
        <label className={classes.label} htmlFor="email">
          Email address
        </label>
        <input
          {...register('email')}
          type="email"
          id="email"
          className={errors.email ? `${classes.input} + ${classes['input-error']}` : classes.input}
          placeholder="Email address"
          aria-invalid={errors.email ? 'true' : 'false'}
        />
        {errors.email && (
          <span role="alert" className={classes.error}>
            {errors.email?.message}
          </span>
        )}

        <label className={classes.label} htmlFor="password">
          Password
        </label>
        <input
          {...register('password')}
          type="password"
          id="password"
          placeholder="Password"
          className={errors.password ? `${classes.input} + ${classes['input-error']}` : classes.input}
          aria-invalid={errors.password ? 'true' : 'false'}
        />
        {errors.password && (
          <span role="alert" className={classes.error}>
            {errors.password?.message}
          </span>
        )}

        <Button className={classes.button} type="primary" htmlType="submit" size="large" block>
          Login
        </Button>

        <p className={classes.text}>
          Don’t have an account?{' '}
          <Link className={classes.link} to={SIGN_UP_ROUTE}>
            Sign Up
          </Link>
        </p>
      </form>
      <ToastContainer />
    </>
  )
}

export default SignIn
