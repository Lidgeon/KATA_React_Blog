import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import App from './app/App'
import store from './redux/store'
//import { fetchArticles } from './redux/slices/articlesSlice'
//store.dispatch(fetchArticles())

const root = document.getElementById('root')
ReactDOM.createRoot(root).render(
  <Provider store={store}>
    <App />
  </Provider>
)
