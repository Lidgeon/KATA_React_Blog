import { useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'

import Article from '../ArticleList/Article/Article'

import classes from './ArticleList.module.scss'

const AtricleList = () => {
  const articles = useSelector((state) => state.articlesReducer.articles)

  return (
    <div className={classes['article-list']}>
      {articles.map((article) => (
        <Article key={article.slug} article={article} fullArticle={false} />
      ))}{' '}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  )
}

export default AtricleList
