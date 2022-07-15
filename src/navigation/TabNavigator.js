import * as React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screen/app/Home'
import Profile from '../screen/app/Profile'
import Shop from '../screen/app/Shop'
import Credit from '../screen/app/Credit'
import RechargePakage from '../screen/app/RechargePakage'
import AdditionalService from '../screen/app/AdditionalService'
import ContactDetail from '../screen/app/ContactDetail'
import AddressBook from '../screen/app/AddressBook'
import ShowMap from '../screen/app/ShowMap'
import ThankYou from '../screen/app/ThankYou'
import ServiceHistory from '../screen/app/ServiceHistory'
import QRcode from '../screen/app/QRcode'
import EditProfile from '../screen/app/EditProfile'
import SaveCard from '../screen/app/SaveCard'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Octicons from 'react-native-vector-icons/Octicons'
import Feather from 'react-native-vector-icons/Feather'
import Notification from '../screen/app/Notification'
import GarageImage from '../screen/app/GarageImage'
import BigSmall from '../screen/app/BigSmall'
// import Payment from '../screen/app/Payment'
import PaymentBooking from '../screen/app/PaymentBooking'
import Bookingfailed from '../screen/app/Bookingfailed'
import i18n from '../i18n'
import AppContext from '../context/AppContext' 
import ContactUs from '../screen/app/ContactUs'
import Ratings from '../screen/app/Ratings';
import { MFWebView, MFSettings, MFTheme,MFCountry } from 'myfatoorah-reactnative';
import Payment from '../screen/payment/Home'
import Failed from '../screen/app/Failed';
import Cpayment from '../screen/payment/Cpayment';
import Cpayment1 from '../screen/payment/Cpayment1';
import Cpayment2 from '../screen/payment/Cpayment2';


const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{headerShown:false}}> 
      

      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="AdditionalService" component={AdditionalService} />
      <HomeStack.Screen name="AddressBook" component={AddressBook} />
      <HomeStack.Screen name="GarageImage" component={GarageImage} />
      <HomeStack.Screen name="Notification" component={Notification} />
      <HomeStack.Screen name="BigSmall" component={BigSmall} />
      <HomeStack.Screen name="ContactDetail" component={ContactDetail} />
      <HomeStack.Screen name="Payment" component={Payment} />
      <HomeStack.Screen name="MFWebView"
                                      component={MFWebView}
                                      options={MFWebView.navigationOptions}
                                      />
      <HomeStack.Screen name="ThankYou" component={ThankYou} />
      <HomeStack.Screen name="PaymentBooking" component={PaymentBooking} />
      <HomeStack.Screen name="Bookingfailed" component={Bookingfailed} />
      <HomeStack.Screen name="ContactUs" component={ContactUs} />
      <HomeStack.Screen name="Failed" component={Failed} />
      
    </HomeStack.Navigator>
  );
} 
const ProfileStack = createStackNavigator();

function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator screenOptions={{headerShown:false}}>
        <ProfileStack.Screen name="Profile" component={Profile} />
        <ProfileStack.Screen name="ServiceHistory" component={ServiceHistory} />
        <ProfileStack.Screen name="QRcode" component={QRcode} />
        <ProfileStack.Screen name="EditProfile" component={EditProfile} />
        <ProfileStack.Screen name="AddressBook" component={AddressBook} />
        <ProfileStack.Screen name="SaveCard" component={SaveCard} />
        <CreditStack.Screen name="Payment" component={Payment} />
        <CreditStack.Screen name="ShowMap" component={ShowMap} />
        <ProfileStack.Screen name="ContactUs" component={ContactUs} />
        <ProfileStack.Screen name="Ratings" component={Ratings} />
        
    </ProfileStack.Navigator>
  );
}
const CreditStack = createStackNavigator();

function CreditStackScreen() {
  return (
    <CreditStack.Navigator screenOptions={{headerShown:false}}>
        <CreditStack.Screen name="Credit" component={Credit} />
        <CreditStack.Screen name="RechargePakage" component={RechargePakage} />
        <CreditStack.Screen name="Cpayment" component={Cpayment} />
        <CreditStack.Screen name="Cpayment1" component={Cpayment1} />
        <CreditStack.Screen name="Cpayment2" component={Cpayment2} />
        <HomeStack.Screen name="MFWebView"
                                      component={MFWebView}
                                      options={MFWebView.navigationOptions}
                                      />
    </CreditStack.Navigator>
  );
}
const Tab = createBottomTabNavigator();
export default function App() {
  const {lang} = React.useContext(AppContext)   
  return (
   
      <Tab.Navigator 
        tabBarOptions={{
            activeTintColor: '#3880ff',
            inactiveTintColor: '#9f9f9d',
        }}
        screenOptions={{headerShown:false,tabBarHideOnKeyboard:true}}
      >
        <Tab.Screen options={{
            tabBarIcon:({focused})=>(<AntDesign color={focused == true ? '#3880ff' : '#9f9f9d'} size={30} name="home"></AntDesign>)
        }} name={i18n.t('home', { locale: lang })} component={HomeStackScreen} />
        <Tab.Screen options={{
            tabBarIcon:({focused})=>(<Octicons color={focused == true ? '#3880ff' : '#9f9f9d'} size={30} name="credit-card"></Octicons>)
        }}  name={i18n.t('credit', { locale: lang })} component={CreditStackScreen} />
        <Tab.Screen options={{
            tabBarIcon:({focused})=>(<Feather color={focused == true ? '#3880ff' : '#9f9f9d'} size={30} name="shopping-bag"></Feather>)
        }} name={i18n.t('shop', { locale: lang })} component={Shop} />
        <Tab.Screen options={{
            tabBarIcon:({focused})=>(<AntDesign color={focused == true ? '#3880ff' : '#9f9f9d'} size={30} name="user"></AntDesign>)
        }} name={i18n.t('profile', { locale: lang })} component={ProfileStackScreen} />
      </Tab.Navigator>
    
  );
}