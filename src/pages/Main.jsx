import DataTable from '../components/DataTable';
import styled from 'styled-components';
import NewTable from '../components/NewTable';
import GridTable from '../components/GridTable';

const Wrapper = styled.div`
    max-width: 100%;
    ant-table {
        border-radius: 10px;
    }
    .ant-layout {
        max-width: 100%;
    }
`;

const Main = () => {
    return (
        <Wrapper>
            <NewTable />
        </Wrapper>
    );
};

export default Main;
