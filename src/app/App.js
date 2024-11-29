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
          <Route path="/" exact render={() => content} />
          <Route path="/articles" render={() => content} exact />
          <Route path="/articles/:slug" component={FullArticle} exact />
          <Route path="/articles/:slug/edit" component={NewArticle} exact />
          <Route path="/sign-in" component={SignIn} exact />
          <Route path="/sign-up" component={SignUp} exact />
          <Route path="/profile" component={Profile} exact />
          <Route path="/new-article" component={NewArticle} exact />
        </Switch>
      </section>
    </Router>
  )
}

export default App
