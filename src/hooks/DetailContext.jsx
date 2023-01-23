import { createContext, useState } from 'react';

const DetailContext = createContext({});

export const DetailProvider = ({ children }) => {
    const [detail, setDetail] = useState({});

    return (
        <DetailContext.Provider value={{ detail, setDetail }}>
            {children}
        </DetailContext.Provider>
    );
};

export default DetailContext;
