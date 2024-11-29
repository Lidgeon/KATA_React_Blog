import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import BlogApiService from '../../services/blog-api-services'
const blogapi = new BlogApiService()

const initialState = {
  isAuth: false,
  userInfo: null,
  regSuccess: false,
  loading: false,
  error: false,
}

export const getRegistration = createAsyncThunk('articles/getRegistration', async (registerInfo) => {
  const response = await blogapi.getRegistration(registerInfo).then((res) => {
    return res
  })
  return response
})

export const getLogin = createAsyncThunk('articles/getLogin', async (loginInfo) => {
  const response = await blogapi.getLogin(loginInfo).then((res) => {
    return res
  })
  return response
})

export const getUser = createAsyncThunk('articles/getUser', async () => {
  const response = await blogapi.getUser().then((res) => {
    return res
  })
  return response
})

export const getUserUpdate = createAsyncThunk('articles/getUserUpdate', async (updateInfo) => {
  const response = await blogapi.getUserUpdate(updateInfo).then((res) => {
    return res
  })
  return response
})

const articlesSlice = createSlice({
  name: 'articles',
  initialState,

  reducers: {
    isAuth: (state) => {
      state.isAuth = true
    },
    logOut: (state) => {
      state.isAuth = false
      state.userInfo = null
      localStorage.removeItem('token')
    },
    regSuccessOff: (state) => {
      state.regSuccess = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRegistration.pending, (state) => {
        state.loading = true
      })
      .addCase(getRegistration.fulfilled, (state, { payload }) => {
        if (payload === undefined) {
          state.loading = false
          state.error = true
        } else {
          state.loading = false
          state.regSuccess = true
        }
      })
      .addCase(getRegistration.rejected, (state) => {
        state.loading = false
        state.error = true
      })

      .addCase(getLogin.pending, (state) => {
        state.loading = true
      })
      .addCase(getLogin.fulfilled, (state, { payload }) => {
        localStorage.removeItem('token')
        if (payload === undefined) {
          state.loading = false
          state.error = true
        } else {
          state.loading = false
          state.isAuth = true
          state.userInfo = payload.user
          localStorage.setItem('token', payload.user.token)
        }
      })
      .addCase(getLogin.rejected, (state) => {
        state.loading = false
        state.error = true
      })

      .addCase(getUser.pending, (state) => {
        state.loading = true
      })
      .addCase(getUser.fulfilled, (state, { payload }) => {
        if (!payload?.user.token) {
          state.isAuth = false
          return
        }
        state.loading = false
        state.userInfo = payload.user
        state.isAuth = true
      })
      .addCase(getUser.rejected, (state) => {
        state.loading = false
        state.error = true
      })

      .addCase(getUserUpdate.pending, (state) => {
        state.loading = true
      })
      .addCase(getUserUpdate.fulfilled, (state, { payload }) => {
        state.loading = false

        state.userInfo = { ...payload.user }
      })
      .addCase(getUserUpdate.rejected, (state) => {
        state.loading = false
        state.error = true
      })
  },
})

const { actions, reducer } = articlesSlice

export const { isAuth, logOut, regSuccessOff } = actions

export default reducer
