export const signUpSchema = {
  type: 'object',
  properties: {
    username: {
      type: 'string',
      minLength: 3,
      maxLength: 20,
      errorMessage: {
        minLength: 'Имя пользователя должно быть длиннее',
        maxLength: 'Имя пользователя слишком длинное',
      },
    },

    email: {
      type: 'string',
      format: 'email',
      minLength: 6,
      errorMessage: {
        minLength: 'Некорректный е-мэйл',
        format: 'Некорректный е-мэйл',
      },
    },

    password: {
      type: 'string',
      format: 'password',
      minLength: 6,
      maxLength: 40,
      errorMessage: {
        minLength: 'Некорректный пароль',
        maxLength: 'Пароль слишком длинный',
      },
    },

    confirmPassword: {
      type: 'string',
      const: {
        $data: '1/password',
      },
      errorMessage: {
        const: 'Пароли должны совпадать',
      },
    },

    agreement: {
      type: 'boolean',
      const: true,
      errorMessage: 'Примите согласие об обработке данных',
    },
  },
  required: ['username', 'email', 'password', 'confirmPassword', 'agreement'],
  additionalProperties: false,
}

export const signInSchema = {
  type: 'object',
  properties: {
    email: {
      type: 'string',
      format: 'email',
      minLength: 6,
      errorMessage: {
        minLength: 'Некорректный е-мэйл',
        format: 'Некорректный е-мэйл',
      },
    },

    password: {
      type: 'string',
      format: 'password',
      minLength: 6,
      maxLength: 40,
      errorMessage: {
        minLength: 'Некорректный пароль',
        maxLength: 'Пароль слишком длинный',
      },
    },
  },
  required: ['email', 'password'],
  additionalProperties: false,
}

export const profileSchema = {
  type: 'object',
  properties: {
    username: {
      type: 'string',
      minLength: 3,
      maxLength: 20,
      errorMessage: {
        minLength: 'Имя пользователя должно быть длиннее',
        maxLength: 'Имя пользователя слишком длинное',
      },
    },

    email: {
      type: 'string',
      format: 'email',
      minLength: 6,
      errorMessage: {
        minLength: 'Некорректный е-мэйл',
        format: 'Некорректный е-мэйл',
      },
    },

    password: {
      type: 'string',
      format: 'password',
      minLength: 6,
      maxLength: 40,
      errorMessage: {
        minLength: 'Некорректный пароль',
        maxLength: 'Пароль слишком длинный',
      },
    },

    image: {
      type: 'string',
      format: 'url',
      errorMessage: {
        format: 'Некорректный url',
      },
    },
  },
  required: ['username', 'email'],
  additionalProperties: false,
}
