import instance from "aip/instance";

export const SET_PROFILE = "auth/SET-PROFILE";

export const fetchProfileAction = async (dispatch) => {
    try {
        const res = await instance.request({
            url: "/api/QuanLyNguoiDung/ThongTinTaiKhoan",
            method: "POST",
        });
        dispatch({
            type: SET_PROFILE,
            payload: res.data.content,
        })
    } catch (error) {
        console.log(error);
    }
}