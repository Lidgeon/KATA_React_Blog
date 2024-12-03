import { useSelector, useDispatch } from 'react-redux'
import { Button } from 'antd'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

import { logOut } from '../../redux/slices/authSlice'
import {
  fetchArticles,
  addCurrentPage,
  addCurrentArticleSlug,
  isEditingOff,
  deleteCurrentArticle,
} from '../../redux/slices/articlesSlice'

import classes from './Header.module.scss'
import logo from './../../assets/icon.png'

const Header = () => {
  const { isAuth, userInfo } = useSelector((state) => state.authReducer)

  const dispatch = useDispatch()

  useEffect(() => {
    if (isAuth) {
      dispatch(fetchArticles())
    }
  }, [dispatch, isAuth])

  const onLogOut = () => {
    dispatch(logOut())
    dispatch(fetchArticles())
  }

  const onLogoClick = () => {
    dispatch(fetchArticles())
    dispatch(addCurrentPage(1))
    dispatch(addCurrentArticleSlug(null))
  }

  const onClickCreateArticle = () => {
    dispatch(isEditingOff())
    dispatch(deleteCurrentArticle())
  }

  const [image, setImage] = useState(userInfo?.image)

  useEffect(() => {
    const img = new Image()
    img.src = userInfo?.image
    img.onload = () => setImage(userInfo?.image)
    img.onerror = () => setImage(logo)
  }, [userInfo?.image])

  const headerView = isAuth ? (
    <>
      <Button
        onClick={onClickCreateArticle}
        aria-label="Create an article"
        className={classes['create-button']}
        variant="outlined"
      >
        <Link to="/new-article">Create article</Link>
      </Button>

      <Link className={classes.link} to="/profile">
        <div className={classes.profile}>
          <p className={classes['author-name']}>{userInfo?.username}</p>
          <img className={classes.img} src={image} alt="logo" />
        </div>
      </Link>

      <Button className={classes['log-out-button']} variant="outlined" onClick={onLogOut}>
        Log Out
      </Button>
    </>
  ) : (
    <>
      <Button className={classes['sign-ip-button']} color="default" variant="text">
        <Link to="/sign-in">Sign In</Link>
      </Button>
      <Button className={classes['sign-up-button']} variant="outlined">
        <Link to="/sign-up">Sign Up</Link>
      </Button>
    </>
  )

  return (
    <header className={classes['header']}>
      <Link to="/" className={classes.title} onClick={onLogoClick}>
        Realworld Blog
      </Link>
      <div className={classes.info}>{headerView}</div>
    </header>
  )
}

export default Header
