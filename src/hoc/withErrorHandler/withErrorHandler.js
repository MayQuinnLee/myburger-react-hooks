import React, {Component} from 'react';
import Aux from '../../hoc/Aux/Aux'
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => { 
    //we expect to receive 2 arguments = burgerbuilder & axios
    return class extends Component {
        state = {
            error: null,
        }

        //Based on LifeCycleHook, componentDidMount will only work when all the children (WrappedComponent) has been rendered, when an error occur before children could be render, this hook below will not work
        componentWillMount () {
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
                //when sending request, we have to return the request so that the request can continue
            }) //not concern on the request, but want to clear the error
            this.resInterceptor = axios.interceptors.response.use(
              res => res,
              error => {
                this.setState({ error: error });
              }
            );
        }

        componentWillUnmount () {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }
        //preventing memory leaks

        errorConfirmedHandler =() =>{
            this.setState({error:null})
        }

        render () {
            return (
                <Aux> 
                    <Modal 
                    show={this.state.error}
                    modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null} 
                        {/*message property return by Firebase*/}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            )
        }

    }
}

export default withErrorHandler;