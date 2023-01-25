import { Card, Col, Row } from 'antd';
import { CarryOutOutlined, CommentOutlined } from '@ant-design/icons';
import { Badge, Divider, Space } from 'antd';
import { Tag } from 'antd';
import styled from 'styled-components';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';

const Detail = () => {
    const location = useLocation();
    // console.log(location.state.data);
    const [data, setData] = useState([]);
    const { lecture_id } = useParams();
    // console.log(lecture_id);
    const [review, setReview] = useState([]);
    const [number, setNumber] = useState(0);
    const [favor, setFavor] = useState(0);
    const navigate = useNavigate();
    // const LoadBack = () => {
    //     navigate('/' + location.state.back, {
    //         state: {
    //             major: location.state.major,
    //             depart: location.state.depart,
    //         },
    //     });
    // };
    const LoadBack = () => {
        navigate(-1);
    };
    const colors = (data) => {
        return [
            '수업년도 : ' + data.year + '년',
            '수업학기 : ' + data.semester + '학기',
            '수강 학년 : ' + data.grade + '학년',
            '소속 대학 : ' + data.college,
            '학과 : ' + data.major,
            '학점 : ' + data.credit,
            '이론 인정 학점 : ' + data.lecture_credit + '학점',
            '실습 인정 학점 : ' + data.prac_credit + '학점',
            '교수님 성함 : ' + data.professor,
            '학교 시간표 : ' + data.school_time,
            '수업 시간 : ' + data.real_time,
            '강의 건물 : ' + data.building,
            '강의실 : ' + data.room,
            '총원 : ' + data.total + '명',
            '수강 신청 총원 : ' + data.sugang + '명',
            '수강 꾸러미 총원 : ' + data.sugangpack + '명',
        ];
    };

    const fetchData = async () => {
        try {
            const { data } = await axios.get(
                'https://honeyclass.kro.kr/review?',
                {
                    params: {
                        id: lecture_id,
                    },
                }
            );
            setReview(data[0]);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        if (typeof lecture_id !== 'undefined') fetchData();
    }, [lecture_id]);
    useEffect(() => {
        // console.log(review);
        if (typeof review === 'undefined') {
            setFavor(0);
            setNumber(0);
        } else {
            setFavor(review.favor);
            setNumber(review.review_number);
        }
        // console.log(typeof data);
        // setNumber(data.number);
        // setFavor(data.favor);
    }, [review]);
    useEffect(() => {
        setData(location.state.data);
    }, [location.state.data]);

    return (
        <Wrap className="site-card-border-less-wrapper">
            <StyledCard bordered={false}>
                <Header>
                    <h1>{data.name}</h1>
                    <h5>{data.number}</h5>
                    <Button
                        sx={{ p: 0, ml: 63, mt: 1.5, mb: 1.5 }}
                        variant="outlined"
                        onClick={(e) => LoadBack()}
                    >
                        돌아가기
                    </Button>
                </Header>
                <Divider orientation="left">
                    <CarryOutOutlined /> 인기도
                </Divider>
                <Popularity>
                    <div className="site-card-wrapper">
                        <Row gutter={16}>
                            <Col span={8}>
                                <Card
                                    title="수꾸/수강신청인원"
                                    bordered={false}
                                >
                                    {Math.round(
                                        (data.sugangpack / data.sugang) * 100
                                    )}
                                    % ({data.sugangpack}명/
                                    {data.sugang}명)
                                </Card>
                            </Col>

                            <Col span={8}>
                                <Card title="수꾸/총원" bordered={false}>
                                    {Math.round(
                                        (data.sugangpack / data.total) * 100
                                    )}
                                    % ({data.sugangpack}명/
                                    {data.total}명)
                                </Card>
                            </Col>

                            <Col span={8}>
                                <Card title="강의평가" bordered={false}>
                                    상위 {Math.round(100 - favor * 100)}% (
                                    {number}명 평가)
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </Popularity>

                <Divider orientation="left">
                    <CarryOutOutlined /> 기본정보
                </Divider>
                <HashTag>
                    <Tag color="magenta">{data.professor}</Tag>
                    <Tag color="red">{data.major}</Tag>
                    <Tag color="volcano">{data.type}</Tag>
                    <Tag color="orange">{data.information}</Tag>
                </HashTag>

                <Divider orientation="left">
                    <CarryOutOutlined /> 세부 수업 관련 정보
                </Divider>

                <Contents>
                    <Space direction="vertical">
                        {data &&
                            colors(data).map((item) => (
                                <Badge key={item} color={item} text={item} />
                            ))}
                    </Space>
                </Contents>

                {/* <Divider orientation="left">
                    <CommentOutlined /> 리뷰
                </Divider>
                <Space direction="vertical">
                    <div>review</div>
                </Space> */}
            </StyledCard>
        </Wrap>
    );
};

const Wrap = styled.div`
    position: relative;
    margin: 20px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .Card {
        max-width: 100%;
    }
`;

const Header = styled.div`
    display: flex;
`;
const StyledCard = styled(Card)`
    width: 80%;
`;

const Popularity = styled.div`
    margin-top: 30px;
    margin-bottom: 30px;
`;

const HashTag = styled.div`
    margin-top: 25px;
    margin-bottom: 25px;
    margin-left: 25px;
`;

const Contents = styled.div`
    margin-top: 30px;
`;

export default Detail;
