// import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import Detail from './pages/Detail';
import Main from './pages/Main';
// import styled from 'styled-components';
import {
    FileOutlined,
    PieChartOutlined,
    UserOutlined,
    DesktopOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { useState, useEffect } from 'react';
import { grey } from '@mui/material/colors';
import Info from './pages/Info';
import { useNavigate } from 'react-router-dom';

const { Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}
const items = [
    getItem('프로젝트 소개', '1', <FileOutlined />),
    getItem('학과별 순위', '2', <PieChartOutlined />),
    getItem('카테고리별 순위', '3', <DesktopOutlined />),
    getItem('교수님별 순위', '4', <UserOutlined />),
];

const App = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [key, setKey] = useState();
    const navigate = useNavigate();
    const LoadPage = (id) => {
        navigate('/' + id);
    };
    const pick = (e) => {
        setKey(e.key);
        if (e.key === '1') {
            navigate('/');
        } else {
            LoadPage(items[e.key - 1].label);
        }
    };
    return (
        <Layout
            style={{
                minHeight: '100vh',
            }}
        >
            <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
            >
                <Link to="/">
                    <div
                        style={{
                            height: 80,
                            margin: 0,
                            background: 'rgba(255, 255, 255, 0.01)',
                            textAlign: 'center',
                            color: 'white',
                        }}
                    >
                        <div className="Logo">
                            <p>Honey</p>
                            <p>Class</p>
                        </div>
                    </div>
                </Link>

                <Menu
                    theme="dark"
                    mode="inline"
                    items={items}
                    onSelect={(e) => pick(e)}
                />
            </Sider>
            <Layout
                className="site-layout"
                style={{
                    padding: 10,
                    background: grey,
                }}
            >
                <Content>
                    <Routes>
                        <Route path="/" element={<Info />} />
                        <Route path="/:current" element={<Main />} />
                        <Route
                            path="/detail/:lecture_id"
                            element={<Detail />}
                        />
                    </Routes>
                </Content>
                <Footer
                    style={{
                        textAlign: 'center',
                    }}
                ></Footer>
            </Layout>
        </Layout>
    );
};
export default App;
