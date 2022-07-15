import React, { Component,useState } from 'react';
import { StyleSheet, Text, View,  SafeAreaView,ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';

 const PayMent = ({route,navigation}) => {
     const {url} = route.params;
     const [visible, setVisible] = useState(false);

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
 