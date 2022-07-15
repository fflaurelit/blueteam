import React,{useEffect,useContext} from 'react'
import { StyleSheet, Text, View,FlatList,ActivityIndicator,TouchableOpacity } from 'react-native'
import LightBlueHead from '../../components/LightBlueHead';
import Fontisto from 'react-native-vector-icons/Fontisto'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import api from '../../constant/ApiCall'
import Ripple from 'react-native-material-ripple';
import AppContext from '../../context/AppContext'
import { NavigationContainer } from '@react-navigation/native';
import i18n from '../../i18n'
import Toast from 'react-native-simple-toast';
import colors from '../../constant/colors';

const Shop = ({navigation}) => {
    const [notiArry, setNotifca] = React.useState([])
    const [type, setType] = React.useState('pending');
    const [pendingArry, setPendingArry] = React.useState([]);
    const [completedArry, setCompletedArry] = React.useState([]);
    const {clientId,lang} = useContext(AppContext)
    const [loader, setLoading] = React.useState(false)
    const [showcancel,setshowcancel] = React.useState(true)
  useEffect(() => { 
    setType('pending')
    getNotification()
   
  }, [])
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setType('pending')
      setshowcancel(true)
      getNotification()
    })
    return unsubscribe;
  }, [navigation]);
  const getNotification = () =>{
    setLoading(true)
    api.post('/api.php?action=getServiceHistory',{id:clientId})
    .then(response => {if(response.status == 200){
      
        let compdata = response.data.data;
        let pend  = [];
        let comp = [];
        compdata.forEach(element => { 
            if(element.service_status == '0' && element.is_cancelled != '1'){
                pend.push(element); 
            }
          });
          setPendingArry(pend)
          setNotifca(pend)
          compdata.forEach(element => { 
            if(element.service_status == '1'){
                comp.push(element); 
            }
          });
          setCompletedArry(comp)
        // setNotifca(response.data.data)
    }})
    .then().finally(()=>{
        setLoading(false)
    })
  }
  const cancelBooking = (id) =>{
      console.log(id)
    setLoading(true)
    api.post('/api.php?action=cancelBooking',{id:id})
    .then(response => {if(response.status == 200){
      console.log(response.data)
      if(response.data.status == '200'){
        Toast.show('Booking is Cancelled.',Toast.LONG)
        getNotification()
      }else{
        Toast.show('Cancellation Failed',Toast.LONG)
      }
      //setCedit(response.data.data.credit)
    }})
    .finally(()=>{
        setLoading(false)
    })
}
  
  const ontabchage = (tgg) =>{
    if(tgg == 'pending'){
        setNotifca(pendingArry)
        setshowcancel(true)
    }else{
        setNotifca(completedArry)
        setshowcancel(false)
    }
  }
    return (
        <View style={{flex:1,backgroundColor:'#fff'}}>
            <LightBlueHead press={()=>navigation.goBack()}  showback={true} text="service_history"></LightBlueHead>
            <View style={styles.bttnRow}>
                <Ripple onPress={()=>{ontabchage('pending');setType('pending')}} style={[styles.bttnCol,{borderBottomWidth:type == 'pending' ? 1 : 0,borderColor:'#3880ff'}]}>
                    <Text style={[styles.bttnText,{color:type == 'pending' ? '#3880ff' : '#000'}]}>{i18n.t('pending', { locale: lang })}</Text>
                </Ripple>
                <Ripple onPress={()=>{ontabchage('complecated');setType('complecated')}} style={[styles.bttnCol,,{borderBottomWidth:type != 'pending' ? 1 : 0,borderColor:'#3880ff'}]}>
                    <Text style={[styles.bttnText,{color:type != 'pending' ? '#3880ff' : '#000'}]}>{i18n.t('completed', { locale: lang })}</Text>
                </Ripple>
            </View>
            {loader == true && ( <ActivityIndicator size="small" color="#000"></ActivityIndicator>)}
            <FlatList
            showsVerticalScrollIndicator={false}
              data={notiArry}
              renderItem={({item})=>(<View key={item.id} style={styles.notobox}>
                  <View style={{flexDirection:'row',justifyContent:'space-between',marginVertical:10}}>
                  <Text style={{textAlign:'left',color:'#3880ff',fontSize:hp('2%')}}>{item.main_name}</Text>
                  <Text style={{textAlign:'left',color:'#000',fontSize:hp('2%')}}>{item.car_type}</Text>
                  </View>
                  <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                  <Text style={{textAlign:'left'}}>{item.pakage_name}</Text>
                  <Text style={{textAlign:'left',color:'#000'}}>{item.prefered_date.substring(0, 10)}</Text>
                  </View>
                  {showcancel == true && (<View style={{flex:1,justifyContent:'flex-end'}}>
                    <TouchableOpacity style={{alignSelf:'flex-end',
                   
                    padding:5, 
                    borderRadius:5,
                    marginVertical:10,
                    backgroundColor:'#ff5959'}} onPress={()=>{cancelBooking(item.id)}}><Text style={{color:'#fff'}}>Cancel</Text></TouchableOpacity>
                    
                  </View>)}
                  {(showcancel == false && item.If_rating_done != "1") && (<View style={{flex:1,justifyContent:'flex-end'}}>
                   
                    <TouchableOpacity style={{alignSelf:'flex-end',
                    padding:5, 
                    borderRadius:5,
                    marginVertical:10,
                    backgroundColor:'#3baaff'}} onPress={()=>navigation.navigate('Ratings',{id:item.id})}><Text style={{color:'#fff'}}>Rate Booking</Text></TouchableOpacity>
                  </View>)}
              </View>)}
              keyExtractor={item => item.service_id}
            />
        </View>
    )
}

export default Shop

const styles = StyleSheet.create({
    notobox:{
        width:wp('95%'),
        minHeight:hp('10%'),
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 2,
        backgroundColor: "white",
        marginVertical:10,
        alignSelf:'center',
        padding:10,
        
    },
    bttnRow:{
       
        height:50,
        flexDirection:'row'
    },
    bttnCol:{
        width:'50%',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        height:50
    },
    bttnText:{
        color:'#3880ff',
        fontSize:18,
        fontWeight:'bold'
    }
})
