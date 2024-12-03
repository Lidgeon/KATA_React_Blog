import { useSelector, useDispatch } from 'react-redux'
import { Spin, Alert } from 'antd'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Fragment, useEffect } from 'react'

import Header from '../components/Header/Header'
import ArticleList from '../components/ArticleList/ArticleList'
import Footer from '../components/Footer/Footer'
import FullArticle from '../components/ArticleList/FullArticle/FullArticle'
import SignIn from '../components/Header/SignIn/SignIn'
import SignUp from '../components/Header/SignUp/SignUp'
import Profile from '../components/Header/Profile/Profile'
import NewArticle from '../components/NewArticle/NewArticle'
import { getUser } from '../redux/slices/authSlice'
import { fetchArticles } from '../redux/slices/articlesSlice'
import {
  HOME_ROUTE,
  ARTICLES_ROUTE,
  ARTICLES_SLUG_ROUTE,
  ARTICLES_EDIT_ROUTE,
  SIGN_IN_ROUTE,
  SIGN_UP_ROUTE,
  PROFILE_ROUTE,
  NEW_ARTICLE_ROUTE,
} from '../consts/routes'

import classes from './App.module.scss'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(getUser())
    }
    if (!localStorage.getItem('token')) {
      dispatch(fetchArticles())
    }
  }, [dispatch])

  const loading = useSelector((state) => state.articlesReducer.loading)
  const error = useSelector((state) => state.articlesReducer.error)
  const notFound = useSelector((state) => state.articlesReducer.notFound)

  const loadingStatus = loading ? <Spin size="large" className={classes.status} /> : null
  const notFoundStatus = notFound ? (
    <Alert message="Ничего не найдено :(" type="warning" className={classes.status} />
  ) : null
  const errorStatus = error ? (
    <Alert message="У нас тут ошибка, но мы работаем над этим" type="error" className={classes.status} />
  ) : null

  const content =
    !loadingStatus && !notFoundStatus && !errorStatus ? (
      <Fragment>
        <ArticleList />
        <Footer />
      </Fragment>
    ) : null

  return (
    <Router>
      <section className={classes.app}>
        <Header />
        {loadingStatus}
        {notFoundStatus}
        {errorStatus}
        <Switch>
          <Route path={HOME_ROUTE} exact render={() => content} />
          <Route path={ARTICLES_ROUTE} render={() => content} exact />
          <Route path={ARTICLES_SLUG_ROUTE} component={FullArticle} exact />
          <Route path={ARTICLES_EDIT_ROUTE} component={NewArticle} exact />
          <Route path={SIGN_IN_ROUTE} component={SignIn} exact />
          <Route path={SIGN_UP_ROUTE} component={SignUp} exact />
          <Route path={PROFILE_ROUTE} component={Profile} exact />
          <Route path={NEW_ARTICLE_ROUTE} component={NewArticle} exact />
        </Switch>
      </section>
    </Router>
  )
}

export default App
