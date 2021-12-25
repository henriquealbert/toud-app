import axios from 'axios'

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    let err
    if (error.response) {
      err = {
        ...error.response.data,
        status: error.response.status
      }
    } else if (error.request) {
      err = {
        status: 424,
        message: 'Dependency failed. Please, try again.'
      }
    } else {
      console.log('An unexpected error happened ', error)
      err = {
        status: 500,
        message: 'Um erro inesperado aconteceu. Por favor, tente novamente.'
      }
    }
    return Promise.resolve(err)
  }
)
