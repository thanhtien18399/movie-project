import { Col, Row, Spin, Space, Card, Button } from 'antd';
import { StarFilled } from "@ant-design/icons"
import { fetchCinemasAction, fetchDetailAction, fetchMovieScheduleAction } from 'featurns/booking/utils/action';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom'
import { formatdate } from 'common/utils/date';
function Detail() {
  const match = useRouteMatch();

  const dispatch = useDispatch();
  const selectInfo = useSelector((state) => state.booking.selectedMovies);
  const cinemas = useSelector((state) => state.booking.cinemas);
  const schedule = useSelector((state) => state.booking.schedule);
  const movieId = match.params.id;
  const fetchDetail = async () => {
    //1. lên url=>mã phim
    //2. viết async action fetchMovieDetail
    //3. dispatch async action 
    //4. lên strore, tạo thêm 1 dữ liệu mới ,xử lý action 
    //5. show ra màn hình 

    dispatch(fetchDetailAction(movieId));
  }

  const fetchCinemas = async () => {
    const data = await dispatch(fetchCinemasAction);
    fetchMovieShedule(data[0].maHeThongRap);
  }

  const fetchMovieShedule = (id) => {
    dispatch(fetchMovieScheduleAction(id))
  }
  useEffect(() => {
    fetchDetail();
    fetchCinemas();
  }, []);

  if (!selectInfo) {
    return (
      <div style={{ textAlign: "center" }}>
        <Spin size="large" />
      </div>
    )
  }
  const { tenPhim, hinhAnh, moTa, danhGia, trailer } = selectInfo;
  return (
    <div style={{ marginTop: 50 }} className="container">
      <Row >
        <Col span={10} style={{ textAlign: "center" }} >
          <img style={{ width: "300px", height: "300px", objectFit: 'cover', objectPosition: "center top" }} src={hinhAnh} alt="" />
        </Col>
        <Col span={12}>
          <h1 style={{ fontSize: "40px" }}>{tenPhim}</h1>
          <Space style={{ fontSize: "30px" }}><StarFilled style={{ color: "#FAC917" }} />{danhGia}</Space>
          <p style={{ fontSize: "25px" }}>{moTa}</p>
        </Col>
      </Row>
      <div>
        {cinemas?.map((item) => {
          return (
            <img style={{ width: "100px", marginRight: 20, }} src={item.logo} alt="" />
          )
        })}

        {
          schedule?.lstCumRap.map((item) => {
            const currentMovie = item.danhSachPhim.find((movie) => movie.maPhim.toString() === movieId)
            if (!currentMovie) return null;
            return (
              <Card style={{ margin: 20, background: "black", color: "#fff" }}>
                <img src={item.hinhAnh} alt="" />
                <p style={{ fontSize: 30 }}>{item.tenCumRap}</p>
                {/* list các suất chiếu */}
                {currentMovie.lstLichChieuTheoPhim.map((show) => {
                  return (
                    <Button type='default' style={{marginRight:10}}>{formatdate(show.ngayChieuGioChieu)}</Button>
                  )
                })}
              </Card>
            )
          })

        }
      </div>
      {trailer.startsWith("http") && (
        <div style={{ marginTop: 50, textAlign: "center" }}>
          <iframe
            width="853px"
            height="480px"
            src={trailer}
            title={tenPhim}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen>
          </iframe>
        </div>

      )}


    </div>
  )
}

export default Detail