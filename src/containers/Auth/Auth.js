import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import classes from './Auth.module.css';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import {updateObject, checkValidity} from '../../shared/utility';

const Auth = props => {
    const [emailState, setEmailState] = useState({            
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Mail Address'
            },
            value: '',
            validation: {
                required: true,
                isEmail: true,
            },
            valid: false,
            touched: false
        }
    });

    const [passwordState, setPasswordState] = useState({
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Password'
            },
            value: '',
            validation: {
                required: true,
                minLength: 6,
            },
            valid: false,
            touched: false
        },
    });

    const [isSignup, setIsSignUp] = useState(true);

    useEffect(() => {
        if(!props.buildingBurger && props.authRedirectPath!=='/'){ props.onSetAuthRedirectPath() }
    },[props.buildingBurger, props.authRedirectPath]);
    //if we are not building a burger and we are not at homepage, then redirect to homepage
    
    const switchAuthModeHandler = useCallback(() => {
        setIsSignUp(!isSignup)
    },[isSignup]);

};



    inputChangedHandler = (event, controlName) => {
        const updatedControls = updateObject(this.state.controls, {
            [controlName]: updateObject(this.state.controls[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.controls[controlName].validation), //this will turn state.valid to true
                touched: true,
            })
        });

        this.setState({controls: updatedControls});

        let formIsValid = true;
        for (let inputIdentifier in updatedControls) {
            formIsValid = updatedControls[inputIdentifier].valid && formIsValid;}
            
        this.setState({orderForm: updatedControls, formIsValid: formIsValid});
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
    }

    render () {
        const formElementsArray=[];
        for(let key in this.state.controls){
            formElementsArray.push({
                id: key,
                config: this.state.controls[key],
            })
        };

        let form = formElementsArray.map(formElement=>(
            <Input 
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                errorId={formElement.config.elementConfig.placeholder}
                changed={(event)=>this.inputChangedHandler(event, formElement.id)}/>
            ));

        if(this.props.loading){
            form = <Spinner />
            };

        let authRedirect = null;
        if(this.props.isAuthenticated){
            authRedirect = <Redirect to={this.props.authRedirectPath}/> 
        }

        return (
            <div className={classes.Auth}>
                {authRedirect}
                {this.props.error ? <p>{this.props.error.message}</p> : null}
                <form onSubmit={this.submitHandler}>                
                    {form}
                    <Button btnType="Success" >SUBMIT</Button>
                </form>
                <Button 
                clicked = {this.switchAuthModeHandler}
                btnType='Danger'> SWITCH TO {this.state.isSignup ? 'SIGN IN' : 'SIGN UP'} </Button>
            </div>
        );
    }
};

const mapStateToProps = state => {
    return{
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token != null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath,
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onAuth : (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
        //if user click through 'authentication' always reset the url, so hard coding is fine
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);