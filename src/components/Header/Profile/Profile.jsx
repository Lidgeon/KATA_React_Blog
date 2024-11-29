import { Button } from 'antd'
import { useForm } from 'react-hook-form'
import { ajvResolver } from '@hookform/resolvers/ajv'
import { fullFormats } from 'ajv-formats/dist/formats'
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import { getUserUpdate } from '../../../redux/slices/authSlice'
import 'react-toastify/dist/ReactToastify.css'

import classes from './Profile.module.scss'

const schema = {
  type: 'object',
  properties: {
    username: {
      type: 'string',
      minLength: 3,
      maxLength: 20,
      errorMessage: {
        minLength: 'Имя пользователя должно быть длиннее',
        maxLength: 'Имя пользователя слишком длинное',
      },
    },

    email: {
      type: 'string',
      format: 'email',
      minLength: 6,
      errorMessage: {
        minLength: 'Некорректный е-мэйл',
        format: 'Некорректный е-мэйл',
      },
    },

    password: {
      type: 'string',
      format: 'password',
      minLength: 6,
      maxLength: 40,
      errorMessage: {
        minLength: 'Некорректный пароль',
        maxLength: 'Пароль слишком длинный',
      },
    },

    image: {
      type: 'string',
      format: 'url',
      errorMessage: {
        format: 'Некорректный url',
      },
    },
  },
  required: ['username', 'email'],
  additionalProperties: false,
}

const Profile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: ajvResolver(schema, {
      formats: fullFormats,
      $data: true,
    }),
  })

  const userInfo = useSelector((state) => state.authReducer.userInfo)
  const auth = useSelector((state) => state.authReducer.isAuth)
  const dispatch = useDispatch()

  if (!auth) {
    return <Redirect to="/" />
  }

  const onSubmit = (data) => {
    dispatch(getUserUpdate(data))
  }

  const username = userInfo?.username
  const email = userInfo?.email

  return (
    <>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <p className={classes.title}>Edit Profile</p>
        <label className={classes.label} htmlFor="username">
          Username
        </label>
        <input
          {...register('username')}
          type="text"
          id="username"
          defaultValue={username}
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
          defaultValue={email}
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
          New password
        </label>
        <input
          {...register('password')}
          type="password"
          id="password"
          placeholder="New password"
          className={errors.password ? `${classes.input} + ${classes['input-error']}` : classes.input}
          aria-invalid={errors.password ? 'true' : 'false'}
        />
        {errors.password && (
          <span role="alert" className={classes.error}>
            {errors.password?.message}
          </span>
        )}

        <label className={classes.label} htmlFor="image">
          Avatar image (url)
        </label>
        <input
          {...register('image')}
          type="url"
          id="image"
          className={errors.image ? `${classes.input} + ${classes['input-error']}` : classes.input}
          placeholder="Avatar image"
          aria-invalid={errors.image ? 'true' : 'false'}
        />
        {errors.image && (
          <span role="alert" className={classes.error}>
            {errors.image?.message}
          </span>
        )}

        <Button className={classes.button} type="primary" htmlType="submit" size="large" block>
          Save
        </Button>
      </form>
      <ToastContainer />
    </>
  )
}

export default Profile
