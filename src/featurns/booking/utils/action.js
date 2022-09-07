import instance from 'aip/instance'

export const actionTypes = {
  SET_MOVIES: "booking/SET_MOVIES",
  SET_SELECTMOVIE: "booking/SET_SELECTMOVIE",
  SET_CINEMAS:"booking/SET_CINEMAS",
  SET_SCHEDULE:"booking/SET_SET_SCHEDULE"
}
export const fetchMoviesAction = (params, cb) => {
  return async (dispatch) => {
    try {
      const res = await instance.request({
        url: "/api/QuanLyPhim/LayDanhSachPhimPhanTrang",
        method: "GET",
        params: {
          maNhom: "GP02",
          soTrang: params.currentPage,
          soPhanTuTrenTrang: params.pageSize,
        },
      });

      cb(res.data.content.totalCount);

      dispatch({
        type: actionTypes.SET_MOVIES,
        payload: res.data.content
      });
    }
    catch (err) {

    }
  }
}
export const fetchDetailAction = (id) => {
  return async (dispatch) => {
    try {
      const res = await instance.request({
        url: "/api/QuanLyPhim/LayThongTinPhim",
        method: "GET",
        params: {
          maPhim: id,
        },
      });
      dispatch({
        type: actionTypes.SET_SELECTMOVIE,
        payload: res.data.content
      });
    }
    catch (err) {
    }
  }
}
export const fetchCinemasAction = async (dispatch) => {
    try {
      const res = await instance.request({
        url: "/api/QuanLyRap/LayThongTinHeThongRap",
        method: "GET",
      });
      dispatch({
        type: actionTypes.SET_CINEMAS,
        payload: res.data.content
      });
      return res.data.content;
    }
    catch (err) {
    }
}
export const fetchMovieScheduleAction = (id) => {
  return async (dispatch) => {
    try {
      const res = await instance.request({
        url: "/api/QuanLyRap/LayThongTinLichChieuHeThongRap",
        method: "GET",
        params: {
          maHeThongRap:id,
          maNhom:"GP02",
        },
      });
      dispatch({
        type: actionTypes.SET_SCHEDULE,
        payload: res.data.content
      });
    }
    catch (err) {
    }
  }
}
