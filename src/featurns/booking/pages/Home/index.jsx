import MoviesList from 'featurns/booking/components/MoviesList'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Pagination } from 'antd'
import { fetchMoviesAction } from 'featurns/booking/utils/action'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { useLocation } from 'react-router-dom'
function Home() {
  const dispatch = useDispatch()
  const history =useHistory();
  const location=useLocation()

  // const currentPage=new URLSearchParams(location.search).get("page"); // cach 2
  const [config, setConfig] = useState({
    currentPage: +location.search?.substr(1)?.split("=")[1]||1,
    pageSize: 8,
    totalCount: 0,
  });

  const changeTotalCount=(total)=>{
    setConfig({...config,totalCount:total})
  }

  const fetchMovies = async () => {
    dispatch(fetchMoviesAction(config ,changeTotalCount))
  }

  const handleChangePage = (page) => {
    console.log(location);
    history.push(`/?page=${page}`);
    setConfig({ ...config, currentPage:page })
  }

  useEffect(() => {
    fetchMovies();
  }, [config.currentPage]);
  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Danh Sách Phim</h1>
      <MoviesList />
      <Pagination
      style={{display:"flex",justifyContent:"center",marginTop:50}}
        onChange={handleChangePage}
        current={config.currentPage}
        pageSize={config.pageSize}
        total={config.totalCount}
      />

    </div>
  )
}

export default Home