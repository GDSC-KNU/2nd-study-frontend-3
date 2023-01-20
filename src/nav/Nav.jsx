import React, { useEffect, useRef, useState } from 'react';
import styles from './sidebar.module.css';
import { useNavigate, Link } from 'react-router-dom';
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from 'react-icons/ai';

const Sidebar = ({ width = 280, children }) => {
    const [isOpen, setOpen] = useState(false);
    const [xPosition, setX] = useState(280);
    const side = useRef();
    const navigate = useNavigate();

    const toggleMenu = () => {
        if (xPosition > 0) {
            setX(0);
            setOpen(true);
        } else {
            setX(width);
            setOpen(false);
        }
    };

    const click1 = () => {
        navigate('/detail');
    };

    const handleClose = async (e) => {
        let sideArea = side.current;
        let sideCildren = side.current.contains(e.target);
        if (isOpen && (!sideArea || !sideCildren)) {
            await setX(width);
            await setOpen(false);
        }
    };

    useEffect(() => {
        window.addEventListener('click', handleClose);
        return () => {
            window.removeEventListener('click', handleClose);
        };
    });

    return (
        <div className={styles.container}>
            <div
                ref={side}
                className={styles.sidebar}
                style={{
                    width: `${width}px`,
                    height: '100%',
                    transform: `translatex(${-xPosition}px)`,
                }}
            >
                <button onClick={() => toggleMenu()} className={styles.button}>
                    {isOpen ? (
                        <span>
                            <AiOutlineDoubleLeft />
                        </span>
                    ) : (
                        <span>
                            <AiOutlineDoubleRight />
                        </span>
                    )}
                </button>
                <div className={styles.title}>
                    <h1>Honey Class</h1>
                </div>
                <div className={styles.menu}>
                    <button onClick={click1} className={styles.link}>
                        학과별 인기순
                    </button>
                    <br />
                    <br />
                    <button onClick={click1} className={styles.link}>
                        카데고리별 인기순
                    </button>
                    <br />
                    <br />
                    <button onClick={click1} className={styles.link}>
                        교수님별 인기순
                    </button>
                    <br />
                    <br />
                    <button onClick={click1} className={styles.link}>
                        프로젝트 소개
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
