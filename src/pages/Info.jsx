import './info.css';
import { Layout } from 'antd';
const { Content } = Layout;

const Info = () => {
    return (
        <Content
            style={{
                margin: '0 16px',
                textAlign: 'center',
            }}
        >
            <div className="Main">
                <div>
                    <h1 className="project">Project Info</h1>
                </div>
                <h1 className="cardname">Development</h1>
                <div className="cardContainer1">
                    <div className="textcard1">
                        <h2>Front End Team3</h2>
                        <div className="card">
                            <li>김현우</li>
                            <li>남성훈</li>
                            <li>배종현</li>
                            <li>조동필</li>
                        </div>
                    </div>
                    <div className="textcard1">
                        <h2>Back End Team3</h2>
                        <div className="card">
                            <li>박지윤</li>
                            <li>이지안</li>
                            <li>장윤성</li>
                            <li>정원영</li>
                        </div>
                    </div>
                </div>
                <h1 className="cardname">Tech Stack</h1>
                <div className="cardContainer2">
                    <div className="textcard2">
                        <h2>Front End</h2>
                        <div className="card">
                            <li>Html</li>
                            <li>CSS</li>
                            <li>Java Script</li>
                            <li>React</li>
                        </div>
                    </div>
                    <div className="textcard2">
                        <h2>Back End</h2>
                        <div className="card">
                            <li>Kotlin</li>
                            <li>Spring</li>
                            <li>Spring-boot</li>
                            <li>Mysql</li>
                        </div>
                    </div>
                    <div className="textcard2">
                        <h2>Data</h2>
                        <div className="card">
                            <li>Python</li>
                            <li>Selenium</li>
                        </div>
                    </div>
                </div>
            </div>
        </Content>
    );
};
export default Info;
