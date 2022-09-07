import { Button, Input } from 'antd'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import Styles from "./style.module.css"
import * as yup from "yup";
import instance from 'aip/instance';
import { useHistory } from 'react-router-dom';

const schema = yup.object({
  taiKhoan: yup.string().required("Trường này bắt buộc nhập"),
  matKhau: yup.string().required("Trường này bắt buộc nhập").min(8, "Mật khẩu từ 8 tới 16 kí tự"),
  email: yup.string().required("Trường này bắt buộc nhập").email("Nhập đúng định dạng"),
  hoTen: yup.string().required("Trường này bắt buộc nhập").matches(/^[A-Za-z ]+$/, "Họ tên không đúng định dạng"),
  soDt: yup.number().required("Trường này bắt buộc nhập"),
})

function Signup() {
  const history= useHistory();
  const [isLoading,setIsLoading]=useState(false);
  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      hoTen: "",
      soDt: "",
    },
    onSubmit: (values) => {
      const newUser={...values,maNhom:"GP02"}
      Signup(newUser);
    },
    validationSchema: schema,
  })

  const Signup=async(user)=>{
    try{
      setIsLoading(true);
      const res = await instance.request({
        url:"/api/QuanLyNguoiDung/DangKy",
        method:"POST",
        data:user,
      });
      
      console.log(res.data);
      history.push("/Signin")
    }catch(err){
      console.log(err);
    }finally{
      setIsLoading(false);
    }

  }
  return (
    <div>
      <h2 className={Styles.title}>Sign Up</h2>
      <form onSubmit={formik.handleSubmit} className={Styles.form}>
        <Input name='taiKhoan'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={Styles.input} type="text" placeholder='Username' />
        {
          formik.touched.taiKhoan && formik.errors.taiKhoan && <p className={Styles.errText}>{formik.errors.taiKhoan}</p>
        }
        <Input name='hoTen'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={Styles.input} type="text" placeholder='Fullname' />
        {
          formik.touched.hoTen && formik.errors.hoTen && <p className={Styles.errText}>{formik.errors.hoTen}</p>
        }
        <Input name='matKhau'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={Styles.input} type="text" placeholder='Password' />
        {
          formik.touched.matKhau && formik.errors.matKhau && <p className={Styles.errText}>{formik.errors.matKhau}</p>
        }
        <Input name='email'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={Styles.input} type="text" placeholder='Email' />
        {
          formik.touched.email && formik.errors.email && <p className={Styles.errText}>{formik.errors.email}</p>
        }
        <Input name='soDt'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={Styles.input} type="text" placeholder='Phone Number' />
        {
          formik.touched.soDt && formik.errors.soDt && <p className={Styles.errText}>{formik.errors.soDt}</p>
        }
        <Button htmlType='submit' loading={isLoading}>Submit</Button>
      </form>
    </div>
  )
}

export default Signup