import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { StateContext } from '../../context/state';

const PrivateRoute = ({children}:{ children: React.ReactNode }) => {
    const {isLogin} = useContext(StateContext)
    return  isLogin ? children : <Navigate to="/auth" />;

};

export default PrivateRoute