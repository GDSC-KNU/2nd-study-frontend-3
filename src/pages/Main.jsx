import styled from 'styled-components';
import NewTable from '../components/NewTable';
import MajorSelect from '../components/MajorSelect';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CategoryTable from '../components/CategoryTable';
import ProfessorTable from '../components/ProfessorTable';
import Typography from '@mui/material/Typography';

const Wrapper = styled.div`
    max-width: 95%;
    ant-table {
        border-radius: 10px;
    }
    .ant-layout {
        max-width: 100%;
    }
`;

// const { Title } = Typography;

const Main = (props) => {
    const [major, setMajor] = useState('');
    const { current } = useParams();
    const [category, setCategory] = useState();
    const [professor, setProfessor] = useState();
    const [semester, setSemester] = useState();
    useEffect(() => {
        if (current !== '학과별 순위') {
            setMajor('');
        }
    }, [current]);
    return (
        <Wrapper>
            <Typography
                variant="h2"
                gutterBottom
                sx={{ p: 0, ml: 3.5, mt: 2, mb: 2, mr: 2, fontWeight: 'bold' }}
                align="left"
            >
                {current === '학과별 순위' && '학과별 인기강의'}
                {current === '카테고리별 순위' && '카테고리별 인기강의'}
                {current === '교수님별 순위' && '교수님별 인기강의'}
            </Typography>
            <MajorSelect
                setMajor={setMajor}
                current={current}
                setCategory={setCategory}
                setProfessor={setProfessor}
                setSemester={setSemester}
            />
            {/* <RadioTable /> */}
            {current === '학과별 순위' && (
                <NewTable major={major} semester={semester} />
            )}
            {current === '카테고리별 순위' && (
                <CategoryTable category={category} semester={semester} />
            )}
            {current === '교수님별 순위' && (
                <ProfessorTable professor={professor} semester={semester} />
            )}
        </Wrapper>
    );
};

export default Main;
