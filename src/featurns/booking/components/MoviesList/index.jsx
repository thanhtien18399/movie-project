import React, {memo} from 'react'
import { Row, Col, Spin, Pagination } from "antd"
import MovieItem from '../MovieItem'
import { useSelector } from 'react-redux'
function MoviesList() {
    const movieInfo = useSelector((state) => state.booking.movies);
    if (!movieInfo) {
        return (
            <div style={{ textAlign: "center" }}>
                <Spin size="large" />
            </div>
        )
    }
    return (
        <div className='container'>
            <Row gutter={20}>
                {movieInfo.items.map((item) => {
                    return (
                        <Col key={item.maPhim} xs={24} sm={12} md={8} lg={6}>
                            <MovieItem item={item}/>
                        </Col>
                    )
                })};
            </Row>
        </div>
    )
}

export default  memo(MoviesList);

//export default  memo(MoviesList,(prevProps,nextProps)=>{
//     if(prevProps!===nextProps){
//         return false;
//     }
//     return true;
// });

//memo =pureComponent
//virtual DOM