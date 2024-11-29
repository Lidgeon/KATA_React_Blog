import { useSelector, useDispatch } from 'react-redux'
import { Pagination } from 'antd'

import { fetchArticles, addCurrentPage } from '../../redux/slices/articlesSlice'

//import classes from './Footer.module.scss'

const Footer = () => {
  const { totalPages, currentPage } = useSelector((state) => state.articlesReducer)
  const dispatch = useDispatch()

  const changePage = (page) => {
    dispatch(fetchArticles(5 * page - 5))
    dispatch(addCurrentPage(page))
  }

  const pagination = (
    <Pagination
      align="center"
      defaultCurrent={1}
      current={currentPage}
      total={totalPages * 10}
      onChange={changePage}
      showSizeChanger={false}
    />
  )
  return <div className="pagination">{pagination}</div>
}

export default Footer
