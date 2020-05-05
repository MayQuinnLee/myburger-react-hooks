import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({adapter: new Adapter()}); //enzyme is connected

describe('<NavigationItems />', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<NavigationItems />)
    });

    it('should render two <NavigationItem/> elements if not authenticated', () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });
    it('should render three <NavigationItem/> elements if authenticated', () => {
        // wrapper = shallow(<NavigationItems isAuth/>)
        wrapper.setProps({isAuth: true})
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });
    it('should render three <NavigationItem/> elements if authenticated', () => {
        wrapper.setProps({isAuth: true})
        expect(wrapper.contains(<NavigationItem link="/logout">Log out</NavigationItem>)).toEqual(true);
    });
});

//describe takes 2 arguments, 1 is the name of the test bundle, 2 is a function
//it allows you to write 1 test, which takes 2 arguments
//shallow renders the component, but not deeply (nested components)
//find, just tell enzyme what we want to find
//then we return an expectation on what we want to find
