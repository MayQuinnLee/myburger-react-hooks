import React from 'react';
import Modal from '../../components/UI/Modal/Modal';
import useHttpErrorHandler from '../../hooks/http-Error-Handler';

const withErrorHandler = (WrappedComponent, axios) => { 
    //we expect to receive 2 arguments = burgerBuilder & axios
    return props => {
        const [error, clearError] = useHttpErrorHandler(axios); 
        //array destructuring coincidentally look like useState, can return anything from custom hooks
        //axios: the hook expect to receive 'httpClient'
        //we can use the hook in other component, extract the 'error' data and do whatever we want, over here we are just showing a error modal
        return (
            <React.Fragment> 
                <Modal 
                show={error}
                modalClosed={clearError}>
                    {error ? error.message : null} 
                    {/*message property return by Firebase*/}
                </Modal>
                <WrappedComponent {...props} />
            </React.Fragment>
        );
    };
};

export default withErrorHandler;