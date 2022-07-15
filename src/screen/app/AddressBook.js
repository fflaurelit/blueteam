import React,{useEffect,useContext,useState,useRef} from 'react'
import { StyleSheet, Text, View,FlatList,Alert,ActivityIndicator,Modal,SafeAreaView } from 'react-native'
import LightBlueHead from '../../components/BlueHeader';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import ION from 'react-native-vector-icons/Ionicons'
import api from '../../constant/ApiCall'
import AppContext from '../../context/AppContext'
import Geocoder from 'react-native-geocoding';
import CustomInput from '../../components/CustomInput';
import ANT from 'react-native-vector-icons/Entypo'
import Ripple from 'react-native-material-ripple';
import MapView, { Marker, Callout } from 'react-native-maps';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import i18n from '../../i18n'

import Toast from 'react-native-simple-toast';

const Shop = ({navigation}) => { 
    const [notiArry, setNotifca] = React.useState([])
    const [loader, setLoading] = React.useState(false)
    const {bookdata,user,lang} = useContext(AppContext)
    const [address, setAddress] = React.useState('')
    const [modalVisible, setModalVisible] = React.useState(false);
    const [houseno, setHouseno] = useState('')
    const [nearby, setNearby] = useState('')
  const [addloader, setAddLoader] = useState(false)
  const [mapvisible, setMapVisible] = useState(false);
  const [lattitude, setlattitude] = useState('')
  const [mapaddress, setMapAdress] = useState('')
  const [longitude, setLongitude] = useState('')
  const [type, setType] = useState('')
  const [addArray, setAddArray] = useState([
    {
      location:'',
      nearby:'',
      type:'home',
      house_no:'',
      lat:'',
      lon:''
    },{
      location:'',
      nearby:'',
      type:'office',
      house_no:'',
      lat:'',
      lon:''
    },{
      location:'',
      nearby:'',
      type:'other1',
      house_no:'',
      lat:'',
      lon:''
    },{
      location:'',
      nearby:'',
      type:'other2',
      house_no:'',
      lat:'',
      lon:''
    }
  ])
  const markerRef = useRef(null);

  useEffect(() => {
   
    getNotification()
    Geocoder.init("AIzaSyA8IUpnIqpTdXaDn7NTkN1k2CU3Hh8T8Ck"); // use a valid API key
    decodeAddress(bookdata.lat,bookdata.lon)
  }, [])
  const decodeAddress = (lat,long) =>{ 
    Geocoder.from(lat, long)
.then(json => {
      var addressComponent = json.results[0].address_components[0];
      console.log(addressComponent.long_name)
        //setAddress(addressComponent.long_name)
        setMapAdress(addressComponent.long_name)

})
.catch(error => console.warn(error));
  }
  const getNotification = () =>{
    setLoading(true)
    api.post('/api.php?action=getAddressBook',{user_id:user.id})
    .then(response => {
      if(response.data.status == '200'){
        setAddArray(response.data.data)
    }else{
      setAddArray(addArray)
    }
  })
    .then().finally(()=>{
      setLoading(false)
  })
  }
  const deleteAddressBook = (id) =>{
    addArray.forEach(element => {
      if(element.type == id){
        element.house_no = '';
        element.location = '';
        element.nearby = '';
        element.lat = '';
        element.lon = ''
      }
    });
    setAddArray(addArray)
    api.post('/api.php?action=insertAddressBook', {
      addArray: addArray,
      user_id:user.id
     
    })
    .then(response => {
      if(response.status == 200){
        Toast.show('Address deleted successfully',Toast.LONG)
      setModalVisible(false);
      getNotification()
    }else{
      Toast.show('Try Again Later',Toast.LONG)
    }
  })
    .then().finally(()=>{
      setAddLoader(false)
    })
  }
  const createTwoButtonAlert = (id) =>
  Alert.alert(
    "",
    "Are you sure you want to delete this address?",
    [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      { text: "OK", onPress: () =>{
        deleteAddressBook(id)
      }}
    ]
  );
  
  const onAddChange = () =>{
    addArray.forEach(element => {
      if(element.type == type){
        element.house_no = houseno;
        element.location = address;
        element.nearby = nearby;
        element.lat = lattitude;
        element.lon = longitude
      }
    });
    setAddArray(addArray)
    setAddLoader(true)
    api.post('/api.php?action=insertAddressBook', {
      addArray: addArray,
      user_id:user.id
     
    })
    .then(response => {
      if(response.status == 200){
      Toast.show('Address erased successfully',Toast.LONG)
      setModalVisible(false);
      getNotification()
    }else{
      Toast.show('Try Again Later',Toast.LONG)
    }
  })
    .then().finally(()=>{
      setAddLoader(false)
    })
  }
  const onRegionChangeComplete = () => {
    if (markerRef && markerRef.current && markerRef.current.showCallout) {
      markerRef.current.showCallout();
    }
  };
    return (
        <View style={{flex:1,backgroundColor:'#fff'}}>
            <LightBlueHead press={()=>navigation.goBack()}  showback={true} text="address_book"></LightBlueHead>
            {loader == true && ( <ActivityIndicator size="small" color="#000"></ActivityIndicator>)}
            <FlatList
            showsVerticalScrollIndicator={false}
              data={addArray}
              renderItem={({item})=>(<View key={item.id} style={styles.notobox}>
                  <View style={{flexDirection:'column',width:'90%'}}>
                  <Text style={{fontWeight:'bold'}}>Type - {item.type}</Text>
                      <View style={styles.eleRow}>
                          <ION name="location-sharp" color="#3880ff" size={20}></ION>
                      <Text style={styles.eletext}>{item.location}</Text>
                      </View>
                      <View style={styles.eleRow}>
                          <ION name="home" color="#3880ff" size={20}></ION>
                      <Text style={styles.eletext}>{item.house_no}</Text>
                      </View>
                      <View style={styles.eleRow}>
                          <MCI name="near-me" color="#3880ff" size={20}></MCI>
                      <Text style={styles.eletext}>{item.nearby}</Text>
                      </View>
                  </View>
                  <View style={{flexDirection:'column',width:'10%'}}>
                  <Feather onPress={()=>{
                    setAddress(item.location)
                    setHouseno(item.house_no)
                    setNearby(item.nearby)
                    setlattitude(item.lat)
                    setLongitude(item.lon)
                    setType(item.type)
                    setModalVisible(true);
                  }} color="#3880ff" size={30} name="edit-2"></Feather>

<MCI onPress={()=>{createTwoButtonAlert(item.type)}} color="#3880ff" size={30} name="delete-outline"></MCI> 
                  </View>
                
              </View>)}
              keyExtractor={item => item.pakage_id}
            />
            
                 
                
             {/* <Ripple onPress={()=>{setModalVisible(true)}} style={styles.fab}>
               <ION color="#fff" name="add" size={hp('3%')}></ION>
             </Ripple> */}
             <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
              
                setModalVisible(!modalVisible);
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>Add Address</Text>
                  <CustomInput value={address}  onChange={(text)=>{
                setAddress(text)
               
            }} placeholder="address" icon={<ANT size={30} name="location-pin"></ANT>}></CustomInput>
             <CustomInput value={houseno}  onChange={(text)=>{
                setHouseno(text)
               
            }} placeholder="house_no" icon={<ANT size={30} name="home"></ANT>}></CustomInput>
             <CustomInput value={nearby} onChange={(text)=>{
                setNearby(text)
                
            }} placeholder="near_by" icon={<MCI size={30} name="google-nearby"></MCI>}></CustomInput>
            <Ripple onPress={()=>{setMapVisible(true)}}>
                  <Text style={styles.button}>Open Map</Text>
                </Ripple>
                <Ripple onPress={()=>{onAddChange()}}>
                 {addloader == true ? (<ActivityIndicator color="#000" size="small"></ActivityIndicator>) : ( <Text style={styles.button}>Submit</Text>)}
                </Ripple>
                <Ripple onPress={()=>{setModalVisible(false)}}>
                  <Text style={[styles.button,{color:'red'}]}>Cancel</Text>
                </Ripple>
               
                </View>
                
              </View>
              <Modal
        animationType="slide"
        transparent={true}
        visible={mapvisible}
        onRequestClose={() => {
          
          setMapVisible(false);
        }}
      >
        <SafeAreaView style={{flex:1}}>
            <View style={{height:50,backgroundColor:'#115ee2',flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}>
            <AntDesign onPress={()=>{
              setAddress(mapaddress)
              setMapVisible(false);}} name="check" size={30} style={{marginRight:20}} color="#fff"></AntDesign>
                <AntDesign onPress={()=>{setMapVisible(false);}} name="close" size={30} style={{marginRight:20}} color="#fff"></AntDesign>
            </View>
            <View style={{height:50,backgroundColor:'#115ee2',flexDirection:'row',alignItems:'center',paddingHorizontal:5}}>
              <Text style={{color:'#fff'}}>{mapaddress}</Text>
              </View>
        <MapView
              style={{
                height: '100%',
                width: '100%',
              }} 
              minZoomLevel={5}
              maxZoomLevel={20}
              onRegionChangeComplete={onRegionChangeComplete}
                region={{
                    latitude: parseFloat(bookdata.lat),
                    longitude: parseFloat(bookdata.lon),
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  }}
            >
                 <Marker
           coordinate={{
            latitude: parseFloat(bookdata.lat),
            longitude: parseFloat(bookdata.lon),
          }}
          onDragStart={()=>{
            markerRef.current.hideCallout();
          }}
          showCallout={true}
          onDragEnd={(e) => {
            decodeAddress(e.nativeEvent.coordinate.latitude,e.nativeEvent.coordinate.longitude);
            setlattitude(e.nativeEvent.coordinate.latitude)
            setLongitude(e.nativeEvent.coordinate.longitude)
          }}
            draggable
            ref={markerRef}
          >
               <Callout style={{width:100}}>
              <View >
                <Text >{i18n.t('marker_drag', { locale: lang })}</Text>
              </View>
            </Callout>
          </Marker>
            </MapView>
        </SafeAreaView>
      </Modal>
            </Modal>
           
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
        paddingHorizontal:10,
        flexDirection:'row',
        justifyContent:'space-between',
        paddingVertical:5
    },
    eleRow:{
        flexDirection:'row',
        marginVertical:3
    },
    eletext:{textAlign:'left',color:'#000',fontSize:13,marginLeft:3},
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    button:{
      margin:10,
      fontWeight:'bold',
      fontSize:hp('2%'),
      color:'#115ee2'
    },
    fab:{
      width: 60,  
height: 60,   
borderRadius: 30,            
backgroundColor: '#115ee2',                                    
position: 'absolute',                                          
bottom: 10,                                                    
right: 10, 
flexDirection:'row',
justifyContent:'center',
alignItems:'center'
    },
    modalText:{
      margin:10,
      fontWeight:'bold',
      fontSize:hp('2.5%'),
     color:'#000'
    }
})
