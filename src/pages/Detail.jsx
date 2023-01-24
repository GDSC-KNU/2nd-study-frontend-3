import { Card, Col, Row } from 'antd';
import { CarryOutOutlined, CommentOutlined } from '@ant-design/icons';
import { Badge, Divider, Space } from 'antd';
import { Tag } from 'antd';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';

const Detail = () => {
    const location = useLocation();
    const colors = [
        '수업년도 : ' + location.state.year + '년',
        '수업학기 : ' + location.state.semester + '학기',
        '수강 학년 : ' + location.state.grade + '학년',
        '소속 대학 : ' + location.state.college,
        '학과 : ' + location.state.major,
        '학점 : ' + location.state.credit,
        '이론 인정 학점 : ' + location.state.lecture_credit + '학점',
        '실습 인정 학점 : ' + location.state.prac_credit + '학점',
        '교수님 성함 : ' + location.state.professor + '교수님',
        '학교 시간표 : ' + location.state.school_time,
        '수업 시간 : ' + location.state.real_time,
        '강의 건물 : ' + location.state.building,
        '강의실 : ' + location.state.room,
        '총원 : ' + location.state.total + '명',
        '수강 신청 총원 : ' + location.state.sugang + '명',
        '수강 꾸러미 총원 : ' + location.state.sugangpack + '명',
    ];
    const [review, setReview] = useState([]);
    const [number, setNumber] = useState(0);
    const [favor, setFavor] = useState(0);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const fetchData = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(
                'https://honeyclass.kro.kr/review?',
                {
                    params: {
                        id: location.state.lecture_id,
                    },
                }
            );
            setLoading(false);
            setReview(data[0]);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        fetchData();
        console.log(review);
        console.log(typeof review);
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

    return (
        <Wrap className="site-card-border-less-wrapper">
            <StyledCard bordered={false}>
                <Header>
                    <h1>{location.state.name}</h1>
                    <h5>{location.state.number}</h5>
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
                                        (location.state.sugangpack /
                                            location.state.sugang) *
                                            100
                                    )}
                                    % ({location.state.sugangpack}명/
                                    {location.state.sugang}명)
                                </Card>
                            </Col>

                            <Col span={8}>
                                <Card title="수꾸/총원" bordered={false}>
                                    {Math.round(
                                        (location.state.sugangpack /
                                            location.state.total) *
                                            100
                                    )}
                                    % ({location.state.sugangpack}명/
                                    {location.state.total}명)
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
                    <Tag color="magenta">{location.state.professor}</Tag>
                    <Tag color="red">{location.state.major}</Tag>
                    <Tag color="volcano">{location.state.type}</Tag>
                    <Tag color="orange">{location.state.information}</Tag>
                </HashTag>

                <Divider orientation="left">
                    <CarryOutOutlined /> 세부 수업 관련 정보
                </Divider>

                <Contents>
                    <Space direction="vertical">
                        {colors.map((colors) => (
                            <Badge key={colors} color={colors} text={colors} />
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
