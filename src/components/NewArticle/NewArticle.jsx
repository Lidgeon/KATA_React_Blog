import { Button } from 'antd'
import { useForm, useFieldArray } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { string, object, array } from 'yup'
import { Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { ToastContainer } from 'react-toastify'

import { createArticle, updateArticle } from '../../redux/slices/articlesSlice'
import { HOME_ROUTE } from '../../consts/routes'
import 'react-toastify/dist/ReactToastify.css'

import classes from './NewArticle.module.scss'

const NewArticle = () => {
  const schema = object().shape({
    title: string().trim().required('Заголовок не может быть пустым'),
    description: string().trim().required('Добавьте короткое описание'),
    body: string().trim().required('Мир слишком пуст без этой статьи...'),
    tagList: array().of(string().required('Название для тега обязательно')),
  })

  const { currentArticle, isEditing } = useSelector((state) => state.articlesReducer)

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: currentArticle?.title || '',
      description: currentArticle?.description || '',
      body: currentArticle?.body || '',
      tagList: currentArticle?.tagList || [],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tagList',
  })

  const dispatch = useDispatch()

  if (!localStorage.getItem('token')) {
    return <Redirect to={HOME_ROUTE} />
  }

  const onSubmit = (data) => {
    if (!isEditing) {
      dispatch(createArticle(data))
    } else {
      dispatch(updateArticle([currentArticle?.slug, data]))
    }
  }

  return (
    <>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <p className={classes.title}>{isEditing ? 'Edit article' : 'Create new article'}</p>

        <label className={classes.label} htmlFor="title">
          Title
        </label>
        <input
          {...register('title')}
          type="text"
          id="title"
          className={errors.title ? `${classes.input} + ${classes['input-error']}` : classes.input}
          placeholder="Title"
          aria-invalid={errors.title ? 'true' : 'false'}
        />
        {errors.title && (
          <span role="alert" className={classes.error}>
            {errors.title?.message}
          </span>
        )}

        <label className={classes.label} htmlFor="description">
          Short description
        </label>
        <input
          {...register('description')}
          type="text"
          id="description"
          className={errors.description ? `${classes.input} + ${classes['input-error']}` : classes.input}
          placeholder="Short description"
          aria-invalid={errors.description ? 'true' : 'false'}
        />
        {errors.description && (
          <span role="alert" className={classes.error}>
            {errors.description?.message}
          </span>
        )}

        <label className={classes.label} htmlFor="text">
          Text
        </label>
        <textarea
          {...register('body')}
          type="text"
          rows="10"
          id="text"
          placeholder="Text"
          className={
            errors.text ? `${classes['input-textarea']} + ${classes['input-error']}` : classes['input-textarea']
          }
          aria-invalid={errors.text ? 'true' : 'false'}
        />
        {errors.text && (
          <span role="alert" className={classes.error}>
            {errors.text?.message}
          </span>
        )}

        <label className={classes.label} htmlFor="tag">
          Tags
        </label>
        <ul className={classes['tag-list']}>
          {fields.map((item, index) => (
            <li key={item.id} className={classes.tag}>
              <div className={classes['input-error']}>
                <input
                  {...register(`tagList.${index}`)}
                  type="text"
                  className={
                    errors.tagList?.[index]
                      ? `${classes['input-tag']} + ${classes['input-error']}`
                      : classes['input-tag']
                  }
                  aria-invalid={errors.tickets ? 'true' : 'false'}
                />
              </div>

              <Button
                type="button"
                variant="outlined"
                className={classes['delete-button']}
                onClick={() => remove(index)}
              >
                Delete
              </Button>
            </li>
          ))}
        </ul>

        <Button
          color="primary"
          variant="outlined"
          className={fields.length ? `${classes['add-button']} + ${classes.position}` : classes['add-button']}
          onClick={() => append('')}
        >
          Add tag
        </Button>

        <Button
          className={
            fields.length ? `${classes['send-button']} + ${classes['button-position']}` : classes['send-button']
          }
          type="primary"
          htmlType="submit"
          size="large"
        >
          Send
        </Button>
      </form>
      <ToastContainer />
    </>
  )
}

export default NewArticle
