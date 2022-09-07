import { Button, Input } from 'antd'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import Styles from "./style.module.css"
import * as yup from "yup";
import instance from 'aip/instance';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const schema = yup.object({
  taiKhoan: yup.string().required("Trường này bắt buộc nhập"),
  matKhau: yup.string().required("Trường này bắt buộc nhập").min(8, "Mật khẩu từ 8 tới 16 kí tự"),
})

function Signin() {
  const dispatch=useDispatch();
  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
    },
    onSubmit: (values) => {
      const newUser = { ...values }
      Signin(newUser);
    },
    validationSchema: schema,
  })
  const Signin = async (user) => {
    try {
      const res = await instance.request({
        url: "/api/QuanLyNguoiDung/DangNhap",
        method: "POST",
        data: user,
      });
      const profile={...res.data.content};
      delete profile.accessToken;
      localStorage.setItem("token",res.data.content.accessToken);
      dispatch({
        type:"auth/SET-PROFILE",
        payload:profile,
      })
      history.push("/");
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div>
      <h2 className={Styles.title}>Sign In</h2>
      <form onSubmit={formik.handleSubmit} className={Styles.form}>
        <Input name='taiKhoan'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={Styles.input} type="text" placeholder='Username' />
        {
          formik.touched.taiKhoan && formik.errors.taiKhoan && <p className={Styles.errText}>{formik.errors.taiKhoan}</p>
        }
        <Input name='matKhau'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={Styles.input} type="password" placeholder='Password' />
        {
          formik.touched.matKhau && formik.errors.matKhau && <p className={Styles.errText}>{formik.errors.matKhau}</p>
        }
        <Button htmlType='submit' >Submit</Button>
      </form>
    </div>
  )
}
export default Signin