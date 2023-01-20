import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import Detail from './pages/Detail';
import Main from './pages/Main';
import styled from 'styled-components';
import { Layout, Menu, theme } from 'antd';
import { Typography } from 'antd';
import { useState } from 'react';
import {
    BookOutlined,
    ContainerOutlined,
    UserOutlined,
} from '@ant-design/icons';
import Sidebar from './nav/Nav';

const { Header, Content } = Layout;
const StyledLayout = styled(Layout)`
    max-width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0px 0px 10px 10px;
    Header {
        width: 100%;
        border-radius: 10px 10px 0px 0px;
        background: #f7d35a;
    }
    ant-layout-header {
        background: #f7d35a;
    }
    Content {
        width: 100%;
        border-radius: 10px;
    }
    main {
        width: 100%;
        padding: 0.5rem;
        border-radius: 10px;
    }
    h2 {
        margin: 1rem;
    }
    svg {
        margin-right: 2px;
    }
    Icon {
        margin-right: 2px;
    }
`;

const items1 = ['학과', '카테고리', '교수님'].map((key) => ({
    key,
    // label: <Link to="/detail">{key}별 인기강의</Link>,
    label: <Link to="/">{key}별 인기강의</Link>,
}));

const { Title } = Typography;

function App() {
    const [current, setCurrent] = useState('학과');

    const onMenu = (e) => {
        setCurrent(e.key);
        console.log(e.key);
    };
    const Icon = () => {
        if (current === '학과') {
            return <BookOutlined />;
        }
        if (current === '카테고리') {
            return <ContainerOutlined />;
        }
        if (current === '교수님') {
            return <UserOutlined />;
        }
    };
    console.log(items1);
    return (
        <div className="App">
            {/* <Header /> */}
            <Sidebar />
            <StyledLayout>
                {/* <Header>
                    <div
                        style={{
                            float: 'left',
                            width: 100,
                            height: 31,
                            margin: '16px 24px 16px 0',
                            background: 'rgba(255, 255, 255, 0.2)',
                        }}
                    >
                        Honey Class
                    </div>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={[current]}
                        onClick={onMenu}
                        selectedKeys={[current]}
                        items={items1}
                    />
                </Header> */}

                <Content>
                    <Title level={2} align="center">
                        {/* <BookOutlined /> */}
                        <Icon />
                        {current}별 인기강의
                    </Title>
                    <Routes>
                        <Route path="/" element={<Main />} />
                        <Route path="/detail" element={<Detail />} />
                    </Routes>
                </Content>
            </StyledLayout>
        </div>
    );
}

export default App;
