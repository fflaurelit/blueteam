import React, { Component,useState,useEffect } from 'react';
import { StyleSheet, Text, View,  SafeAreaView,ActivityIndicator,BackHandler } from 'react-native';
import { WebView } from 'react-native-webview';
import api from '../../constant/ApiCall'
import ANT from 'react-native-vector-icons/AntDesign'

 const PayMent = ({route,navigation}) => {
     const {url,booking_id,date,time,phone,bid} = route.params;
     const [visible, setVisible] = useState(false);
     useEffect(() => {
       
    
        const backHandler = BackHandler.addEventListener(
          "hardwareBackPress",
          backAction
        );
    
        return () => backHandler.remove();
      }, []);
      const backAction = () => {
        api.post('/api.php?action=checkBooking', {
            id: bid,
          })
          .then(response => {
        if(response.status == 200){
            if(response.data.status == '200'){
                navigation.navigate('ThankYou',{
                    booking_id:booking_id,
                    date:date,
                    time:time,
                    phone:phone
                  })
              }else{
                
                navigation.navigate('Bookingfailed')
              
              }
          }})
          .then()
    };
     const ActivityIndicatorElement = () => {
        return (
          <View style={styles.activityIndicatorStyle}>
            <ActivityIndicator
              color="#009688"
              size="large"
            />
          </View>
        );
      };
     return (
         <View style={{flex:1,backgroundColor:'#fff'}}>
           <View style={{height:'8%',flexDirection:'row',alignItems:'center'}}>
                <ANT onPress={()=>{backAction()}} name="close" style={{padding:2}} size={30}></ANT>
           </View>
            <View style={{flex:1}}>
            <WebView
          style={{flex: 1}}
          //Loading URL
          source={{uri: url}}
          //Enable Javascript support
          javaScriptEnabled={true}
          //For the Cache
          domStorageEnabled={true}
          onLoadStart={() => setVisible(true)}
          onLoad={() => setVisible(false)}
        />
        {visible ? <ActivityIndicatorElement /> : null}
            </View>
         </View>
     )
 }
 
 export default PayMent
 
 const styles = StyleSheet.create({
    activityIndicatorStyle: {
        flex: 1,
        position: 'absolute',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 'auto',
        marginBottom: 'auto',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
      },
 })
 