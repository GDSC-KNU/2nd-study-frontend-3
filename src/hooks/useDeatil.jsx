import { useContext } from 'react';
import DetailContext from './DetailContext';

const useDetail = () => {
    return useContext(DetailContext);
};

export default useDetail;
