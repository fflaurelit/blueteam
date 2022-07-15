import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AuthContext, {defaultState, reducer, restoreToken} from './Auth';
import Login from '../screen/auth/Login';
import Register from '../screen/auth/Register';
import TabNavigator from './TabNavigator';
import IntroSlider from '../screen/auth/IntroSlider';
import SelectLogin from '../screen/auth/SelectLogin';
import Otp from '../screen/auth/Otp';
import LoginWithPhone from '../screen/auth/LoginWithPhone';
import ForgetPass from '../screen/auth/ForgetPass';
import RegisterWhenNotExist from '../screen/auth/RegisterWhenNotExist';
import Notification from '../screen/app/Notification';
import Failed from '../screen/app/Failed';

const Stack = createStackNavigator();
const AppNavigator = () => {
  const [state, dispatch] = React.useReducer(reducer, defaultState);

  React.useEffect(() => {
    restoreToken(dispatch);
  }, []);
  const authContext = React.useMemo(
    () => ({
      signIn: (data) => {
        dispatch({type: 'SIGN_IN', token: data});
      },
      signOut: () => dispatch({type: 'SIGN_OUT'}),
      signUp: (data) => {
        dispatch({type: 'SIGN_IN', token: data});
      },
    }),
    [],
  );
 
  if (state.isLoading) {
    return null; 
  }
  return (
    <NavigationContainer>
       <AuthContext.Provider value={authContext}>
       <Stack.Navigator screenOptions={{headerShown: false}}>
       {state.userToken == null ? ( 
            <>
              {/* <Stack.Screen name="Home" component={TabNavigator} /> */}
            {/* <Stack.Screen name="IntroSlider" component={IntroSlider} /> */}
            <Stack.Screen name="SelectLogin" component={SelectLogin} />
            <Stack.Screen name="LoginWithPhone" component={LoginWithPhone} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Otp" component={Otp} />
            <Stack.Screen name="ForgetPass" component={ForgetPass} />
            <Stack.Screen name="RegisterWhenNotExist" component={RegisterWhenNotExist} />
            
            </>
          ) : ( 
            <>
            <Stack.Screen name="Home" component={TabNavigator} />
            </> )}
      
      </Stack.Navigator>
       </AuthContext.Provider>
     
    </NavigationContainer>
  );
};

export default AppNavigator;
