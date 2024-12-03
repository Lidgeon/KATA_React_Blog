import { Button, Checkbox } from 'antd'
import { Link, Redirect } from 'react-router-dom'
import { Controller, useForm } from 'react-hook-form'
import { ajvResolver } from '@hookform/resolvers/ajv'
import { fullFormats } from 'ajv-formats/dist/formats'
import { useSelector, useDispatch } from 'react-redux'
import { ToastContainer } from 'react-toastify'

import { getRegistration } from '../../../redux/slices/authSlice'
import { signUpSchema } from '../../../consts/validate'
import { SIGN_IN_ROUTE } from '../../../consts/routes'

import classes from './SignUp.module.scss'

import 'react-toastify/dist/ReactToastify.css'

const SignUp = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: ajvResolver(signUpSchema, {
      formats: fullFormats,
      $data: true,
    }),
  })

  const regSuccess = useSelector((state) => state.authReducer.regSuccess)
  const dispatch = useDispatch()

  if (regSuccess) {
    return <Redirect to={SIGN_IN_ROUTE} />
  }

  const onSubmit = (data) => {
    const registrationDate = {
      username: data.username,
      email: data.email,
      password: data.password,
    }
    dispatch(getRegistration(registrationDate))
  }

  return (
    <>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <p className={classes.title}>Create new account</p>
        <label className={classes.label} htmlFor="username">
          Username
        </label>
        <input
          {...register('username')}
          type="text"
          id="username"
          className={errors.username ? `${classes.input} + ${classes['input-error']}` : classes.input}
          placeholder="Username"
          aria-invalid={errors.username ? 'true' : 'false'}
        />
        {errors.username && (
          <span role="alert" className={classes.error}>
            {errors.username?.message}
          </span>
        )}

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

        <label className={classes.label} htmlFor="confirmPassword">
          Repeat Password
        </label>
        <input
          {...register('confirmPassword')}
          type="password"
          id="confirmPassword"
          placeholder="Password"
          className={errors.confirmPassword ? `${classes.input} + ${classes['input-error']}` : classes.input}
          aria-invalid={errors.password ? 'true' : 'false'}
        />
        {errors.confirmPassword && (
          <span role="alert" className={classes.error}>
            {errors.confirmPassword?.message}
          </span>
        )}

        <Controller
          name="agreement"
          valuePropName="checked"
          control={control}
          render={({ field }) => (
            <Checkbox
              className={
                errors.agreement ? `${classes['checkbox-text']} + ${classes['input-error']}` : classes['checkbox-text']
              }
              {...field}
              checked={field.value ?? false}
            >
              I agree to the processing of my personal information
            </Checkbox>
          )}
        />
        {errors.agreement && <span className={classes.error}>Примите согласие об обработке данных</span>}

        <Button className={classes.button} type="primary" htmlType="submit" size="large" block>
          Create
        </Button>

        <p className={classes.text}>
          Already have an account?{' '}
          <Link className={classes.link} to={SIGN_IN_ROUTE}>
            Sign In
          </Link>
        </p>
      </form>
      <ToastContainer />
    </>
  )
}

export default SignUp
