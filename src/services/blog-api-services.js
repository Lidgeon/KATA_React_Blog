import { Component } from 'react'
import { toast } from 'react-toastify'

export default class BlogApiService extends Component {
  _baseURL = 'https://blog-platform.kata.academy/api/'

  async getRecentArticlesGlobally(offSet) {
    const url = 'articles'
    const limit = '?limit=5'

    try {
      const headers = new Headers()
      const token = localStorage.getItem('token')
      if (token) {
        headers.append('Authorization', `Token ${token}`)
      }
      const response = await fetch(`${this._baseURL}${url}${limit}&offset=${offSet}`, {
        method: 'GET',
        headers,
      })

      if (!response.ok) {
        toast.error(`Ошибка ${response.status}: ${response.statusText}`)
      }

      const res = await response.json()
      return res
    } catch (error) {
      toast.error(`Ошибка при получении списка: ${error.message}`)
    }
  }

  async getAnArticle(slug) {
    const url = 'articles'
    try {
      const response = await fetch(`${this._baseURL}${url}/${slug}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
      })

      if (!response.ok) {
        toast.error(`Ошибка ${response.status}: ${response.statusText}`)
      }

      const res = await response.json()
      return res
    } catch (error) {
      toast.error(`Ошибка при получении статьи: ${error.message}`)
    }
  }

  async getRegistration(registerInfo) {
    const url = 'users'
    try {
      const response = await fetch(`${this._baseURL}${url}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: { ...registerInfo },
        }),
      })

      //console.log(response);

      if (!response.ok) {
        if (response.status === 422) {
          toast.error('Ошибка регистрации: такой username или email уже существуют')
        } else {
          toast.error('Ошибка ', response.statusText)
        }
        return
      }

      const res = await response.json()
      toast.success('Вы успешно зарегистрировались!')
      //console.log("Успешная регистрация:", res);
      return res
    } catch (error) {
      toast.error('Неизвестная ошибка ', error)
    }
  }

  async getLogin(loginInfo) {
    const url = 'users/login'
    try {
      const response = await fetch(`${this._baseURL}${url}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: { ...loginInfo },
        }),
      })

      if (!response.ok) {
        if (response.status === 422) {
          toast.error('Ошибка входа: проверьте email и пароль')
        } else {
          toast.error('Ошибка ', response.statusText)
        }
        return
      }

      const res = await response.json()
      toast.success('Вы успешно авторизовались!')
      //console.log(res);
      return res
    } catch (error) {
      toast.error('Неизвестная ошибка ', error)
    }
  }

  async getUser() {
    const url = 'user'
    try {
      const response = await fetch(`${this._baseURL}${url}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
      })

      if (!response.ok) {
        toast.error('Ошибка входа ', response.statusText)
        return
      }

      const res = await response.json()
      //console.log(res);
      return res
    } catch (error) {
      toast.error('Неизвестная ошибка ', error)
    }
  }

  async getUserUpdate(updateInfo) {
    const url = 'user'
    try {
      const response = await fetch(`${this._baseURL}${url}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          user: { ...updateInfo },
        }),
      })

      //console.log({ ...updateInfo });

      if (!response.ok) {
        toast.error('Ошибка ', response.statusText)
        return
      }

      const res = await response.json()
      toast.success('Вы успешно обновили профиль!')
      //console.log(res);
      return res
    } catch (error) {
      toast.error('Неизвестная ошибка ', error)
    }
  }

  async createArticle(articleInfo) {
    const url = 'articles'
    try {
      const response = await fetch(`${this._baseURL}${url}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          article: { ...articleInfo },
        }),
      })

      //console.log(response);

      if (!response.ok) {
        if (response.status === 422) {
          toast.error('Неожиданная ошибка')
        } else {
          toast.error('Ошибка создания статьи', response.statusText)
        }
        return
      }

      const res = await response.json()
      toast.success('Статья создана!')
      //console.log("Успешная регистрация:", res);
      return res
    } catch (error) {
      toast.error('Неизвестная ошибка ', error)
    }
  }

  async updateArticle(slug, updateInfo) {
    console.log(slug, updateInfo)
    const url = 'articles'
    try {
      const response = await fetch(`${this._baseURL}${url}/${slug}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          article: { ...updateInfo },
        }),
      })

      if (!response.ok) {
        toast.error('Ошибка обновления', response.statusText)
        return
      }

      const res = await response.json()
      toast.success('Вы успешно обновили статью!')

      return res
    } catch (error) {
      toast.error('Неизвестная ошибка ', error)
      console.log(error)
    }
  }

  async addLike(slug) {
    const url = 'articles'
    try {
      const response = await fetch(`${this._baseURL}${url}/${slug}/favorite`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
      })
      if (!response.ok) {
        toast.error('Ошибка выражения любви', response.statusText)
        return
      }
      const res = await response.json()
      toast.success('<з')
      return res
    } catch (error) {
      toast.error('Неизвестная ошибка ', error)
    }
  }

  async deleteLike(slug) {
    const url = 'articles'
    try {
      const response = await fetch(`${this._baseURL}${url}/${slug}/favorite`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
      })
      if (!response.ok) {
        toast.error('Ошибка', response.statusText)
        return
      }
      const res = await response.json()
      toast.success(':с')
      return res
    } catch (error) {
      toast.error('Неизвестная ошибка ', error)
    }
  }

  async deleteArticle(slug) {
    const url = 'articles'
    try {
      const response = await fetch(`${this._baseURL}${url}/${slug}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
      })
      if (!response.ok) {
        toast.error('Ошибка', response.statusText)
        return
      }
      if (response.status === 204) {
        toast.success('Статья удалена!')
        return
      }
      const res = await response.json()
      return res
    } catch (error) {
      toast.error('Неизвестная ошибка', error)
    }
  }
}
