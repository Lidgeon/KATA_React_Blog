import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import BlogApiService from '../../services/blog-api-services'
const blogapi = new BlogApiService()

const initialState = {
  articles: [],
  currentArticle: null,
  currentArticleSlug: '',
  successDeleteCurrentArticle: false,
  articlesCount: 0,
  loading: false,
  error: false,
  notFound: false,
  currentPage: 1,
  totalPages: 0,
  isEditing: false,
}

export const fetchArticles = createAsyncThunk('articles/fetchArticles', async (offSet = 0, { dispatch, getState }) => {
  const currentArticleSlug = getState().articlesReducer.currentArticleSlug
  const response = await blogapi.getRecentArticlesGlobally(offSet).then((res) => {
    return res
  })
  if (currentArticleSlug === null) {
    dispatch(deleteCurrentArticle())
    dispatch(addCurrentArticleSlug(''))
    dispatch(isEditingOff())
  }
  return response
})

export const getSlugArticle = createAsyncThunk('articles/getSlugArticle', async (slug) => {
  const response = await blogapi.getAnArticle(slug).then((res) => {
    return res
  })
  return response
})

export const createArticle = createAsyncThunk('articles/createArticle', async (articleInfo) => {
  const response = await blogapi.createArticle(articleInfo).then((res) => {
    return res
  })
  return response
})

export const addLike = createAsyncThunk('articles/addLike', async (slug, { dispatch, getState }) => {
  const currentPage = getState().articlesReducer.currentPage
  //console.log(getState(), currentPage)
  const response = await blogapi.addLike(slug)
  dispatch(fetchArticles(5 * currentPage - 5))
  if (getState().articlesReducer.currentArticle !== null) {
    dispatch(getSlugArticle(slug))
  }
  return response
})

export const deleteLike = createAsyncThunk('articles/deleteLike', async (slug, { dispatch, getState }) => {
  const currentPage = getState().articlesReducer.currentPage
  const response = await blogapi.deleteLike(slug)
  dispatch(fetchArticles(5 * currentPage - 5))
  //console.log(getState().articlesReducer.currentArticle)
  if (getState().articlesReducer.currentArticle !== null) {
    dispatch(getSlugArticle(slug))
  }
  return response
})

export const deleteArticle = createAsyncThunk('articles/deleteArticle', async (slug, { dispatch }) => {
  const response = await blogapi.deleteArticle(slug)
  dispatch(deleteStatusOn())
  dispatch(fetchArticles())
  return response
})

export const updateArticle = createAsyncThunk('articles/updateArticle', async ([slug, data]) => {
  console.log(slug, data)
  const response = await blogapi.updateArticle(slug, data)
  return response
})

const articlesSlice = createSlice({
  name: 'articles',
  initialState,

  reducers: {
    addArticle: (state, action) => {
      state.articles = action.payload.articles
    },
    addCurrentPage: (state, action) => {
      state.currentPage = action.payload
    },
    addCurrentArticleSlug: (state, action) => {
      state.currentArticleSlug = action.payload
    },
    deleteStatusOff: (state) => {
      state.successDeleteCurrentArticle = false
    },
    deleteStatusOn: (state) => {
      state.successDeleteCurrentArticle = true
    },
    deleteCurrentArticle: (state) => {
      state.currentArticle = null
      state.currentArticleSlug = null
    },
    isEditingOn: (state) => {
      state.isEditing = true
    },
    isEditingOff: (state) => {
      state.isEditing = false
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchArticles.fulfilled, (state, { payload }) => {
        if (payload === undefined) {
          state.loading = false
          state.error = true
        } else if (payload.articlesCount === 0) {
          state.loading = false
          state.notFound = true
        } else {
          state.loading = false
          state.articles = payload.articles
          state.articlesCount = payload.articlesCount
          state.totalPages = Math.ceil(payload.articlesCount / 5)
        }
      })
      .addCase(fetchArticles.rejected, (state) => {
        state.loading = false
        state.error = true
      })

      .addCase(getSlugArticle.pending, (state) => {
        state.loading = true
      })
      .addCase(getSlugArticle.fulfilled, (state, { payload }) => {
        if (payload === undefined) {
          state.loading = false
        } else if (payload.articlesCount === 0) {
          state.loading = false
          state.notFound = true
        } else {
          state.loading = false
          state.currentArticle = payload.article
          state.currentArticleSlug = payload.article.slug
        }
      })
      .addCase(getSlugArticle.rejected, (state) => {
        state.loading = false
        state.error = true
      })

      .addCase(createArticle.pending, (state) => {
        state.loading = true
      })
      .addCase(createArticle.fulfilled, (state, { payload }) => {
        if (payload === undefined) {
          state.loading = false
        } else {
          state.loading = false
        }
      })
      .addCase(createArticle.rejected, (state) => {
        state.loading = false
      })

      .addCase(addLike.pending, (state) => {
        state.loading = true
      })
      .addCase(addLike.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(addLike.rejected, (state) => {
        state.loading = false
      })

      .addCase(deleteLike.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteLike.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(deleteLike.rejected, (state) => {
        state.loading = false
      })

      .addCase(deleteArticle.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteArticle.fulfilled, (state) => {
        state.loading = false
        state.currentArticle = null
        //state.currentArticleSlug = "";
      })
      .addCase(deleteArticle.rejected, (state) => {
        state.loading = false
      })

      .addCase(updateArticle.pending, (state) => {
        state.loading = true
      })
      .addCase(updateArticle.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(updateArticle.rejected, (state) => {
        state.loading = false
      })
  },
})

const { actions, reducer } = articlesSlice

export const {
  addArticle,
  addCurrentPage,
  deleteStatusOn,
  deleteStatusOff,
  deleteCurrentArticle,
  addCurrentArticleSlug,
  isEditingOn,
  isEditingOff,
} = actions

export default reducer
