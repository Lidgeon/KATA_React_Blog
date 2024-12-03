import { useState } from 'react'
import { Button, Popconfirm } from 'antd'
import { HeartOutlined, HeartTwoTone } from '@ant-design/icons'
import { format, parseISO } from 'date-fns'
import { Link, Redirect } from 'react-router-dom'
import Markdown from 'markdown-to-jsx'
import { useSelector, useDispatch } from 'react-redux'

import { addLike, deleteLike, deleteArticle, isEditingOn } from '../../../redux/slices/articlesSlice'
import { SIGN_IN_ROUTE } from '../../../consts/routes'

import logo from './../../../assets/icon.png'
import classes from './Article.module.scss'

const Article = ({ article, fullArticle }) => {
  const dispatch = useDispatch()

  const { isAuth, userInfo } = useSelector((state) => state.authReducer)

  const slug = article?.slug

  const shrink = (overview, maxSymbol) => {
    if (overview.length <= maxSymbol) {
      return overview
    }
    const subStr = overview.substring(0, maxSymbol - 1)
    return `${subStr.substring(0, subStr.lastIndexOf(' '))}...`
  }
  const shortDescription = shrink(article?.description, 150)
  const shortTitle = shrink(article?.title, 50)
  const date = format(parseISO(article?.createdAt), 'MMMM d, y')

  const onClickLike = () => {
    if (!isAuth) {
      return <Redirect to={SIGN_IN_ROUTE} />
    } else {
      if (article?.favorited) dispatch(deleteLike(slug))
      if (!article?.favorited) dispatch(addLike(slug))
    }
  }

  const onClickEdit = () => {
    dispatch(isEditingOn())
  }

  const confirm = () => {
    dispatch(deleteArticle(slug))
  }

  const [image, setImage] = useState(article?.author?.image)

  const handleError = () => {
    setImage(logo)
  }

  return (
    <>
      <article className={`${classes['article-card']} ${fullArticle ? classes['article-card__full'] : ''}`}>
        <div className={classes.header}>
          <div className={classes.main}>
            <div className={classes.title}>
              {!fullArticle ? (
                <Link to={`/articles/${article?.slug}`} className={classes['title-text']}>
                  {shortTitle}
                </Link>
              ) : (
                <h2 className={classes['title-text']}>{shortTitle}</h2>
              )}
              <button className={classes.likes} onClick={onClickLike}>
                {article?.favorited ? <HeartTwoTone twoToneColor="#FF0707" /> : <HeartOutlined />}{' '}
                {article?.favoritesCount}
              </button>
            </div>
            <ul className={classes['tag-list']}>
              {article?.tagList?.map((item) => {
                const shortTag = shrink(item, 20)
                return (
                  <li className={classes.tag} key={`${Math.round(Math.random() * 1000)} + ${item}`}>
                    {shortTag}
                  </li>
                )
              })}
            </ul>
          </div>
          <div className={classes.info}>
            <div className={classes['text-info']}>
              <span className={classes['author-name']}>{article?.author.username}</span>
              <span className={classes.date}>{date}</span>
            </div>
            <img className={classes.icon} src={image} alt="Иконка аватарки" onError={handleError} />
          </div>
        </div>
        <div className={`${classes.description} ${fullArticle ? classes['description__full'] : ''}`}>
          <span className={classes.text}>{fullArticle ? shortDescription : article?.description} </span>
          {fullArticle && isAuth && userInfo?.username === article.author.username && (
            <div className={classes.buttons}>
              {' '}
              <Popconfirm
                title="Delete the task"
                placement="rightTop"
                description="Are you sure to delete this task?"
                onConfirm={confirm}
                onCancel={() => {}}
                okText="Yes"
                cancelText="No"
              >
                <Button
                  type="button"
                  variant="outlined"
                  //onClick={onDeletearticle}
                  className={classes['delete-button']}
                >
                  Delete
                </Button>
              </Popconfirm>
              <Button type="button" onClick={onClickEdit} variant="outlined" className={classes['edit-button']}>
                <Link to={`/articles/${article?.slug}/edit`}>Edit</Link>
              </Button>
            </div>
          )}
        </div>
        {fullArticle && (
          <div className={classes.body}>
            <Markdown>{article?.body}</Markdown>
          </div>
        )}
      </article>
    </>
  )
}

export default Article
