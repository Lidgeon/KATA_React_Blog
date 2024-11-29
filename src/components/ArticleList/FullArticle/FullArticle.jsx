import { Spin } from 'antd'
import { useEffect } from 'react'
import { useParams, Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { getSlugArticle, deleteStatusOff } from '../../../redux/slices/articlesSlice'

import classes from './FullArticle.module.scss'
import Article from './../Article/Article'

const FullArticle = () => {
  const dispatch = useDispatch()
  const { currentArticle, loading, successDeleteCurrentArticle } = useSelector((state) => state.articlesReducer)

  const { slug } = useParams()

  useEffect(() => {
    if (slug) {
      dispatch(getSlugArticle(slug))
    }
  }, [slug, dispatch])

  useEffect(() => {
    if (successDeleteCurrentArticle) {
      dispatch(deleteStatusOff())
    }
  }, [successDeleteCurrentArticle, dispatch])

  if (successDeleteCurrentArticle) {
    return <Redirect to="/" />
  }

  const article = currentArticle

  function content() {
    if (loading || !article) {
      return <Spin size="large" className={classes.status} />
    } else {
      return <Article article={article} fullArticle />
    }
  }

  return <div>{content()}</div>
}

export default FullArticle
