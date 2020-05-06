import React, {useState, useEffect} from 'react';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => { 
    //we expect to receive 2 arguments = burgerbuilder & axios
    return props => {
        const [error, setError] = useState(null);

        //cannot use useEffect() because we want to render this before JSX
        const reqInterceptor = axios.interceptors.request.use(req => {
            setError(null);
            return req;
            //when sending request, we have to return the request so that the request can continue
        }); //not concern on the request, but want to clear the error
        const resInterceptor = axios.interceptors.response.use(
            res => res,
            error => {
            setError(error)
            }
        );
            
        useEffect(() => {    //when using return we can cleanup       
            return () => {
                axios.interceptors.request.eject(reqInterceptor);
                axios.interceptors.response.eject(resInterceptor);
            };
        },[reqInterceptor, resInterceptor]);
        
        const errorConfirmedHandler = () => {
            setError(null)
        };

        return (
            <React.Fragment> 
                <Modal 
                show={error}
                modalClosed={errorConfirmedHandler}>
                    {error ? error.message : null} 
                    {/*message property return by Firebase*/}
                </Modal>
                <WrappedComponent {...props} />
            </React.Fragment>
        );
    };
};

export default withErrorHandler;