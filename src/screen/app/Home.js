import React,{useEffect,useContext,useState,useRef} from 'react'
import { StyleSheet,Image, Text, View,SafeAreaView,Dimensions,Modal,FlatList,TouchableOpacity,ActivityIndicator,I18nManager,PermissionsAndroid,Platform, Alert, Linking } from 'react-native'
import MapView from 'react-native-maps';
import HomeHeader from '../../components/HomeHeader';
import NotificationHeader from '../../components/NotificationHeader';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import CategoryComp from '../../components/CategoryComp';
import colors from '../../constant/colors'
import EVIL from 'react-native-vector-icons/EvilIcons'
import PakageComponent from '../../components/PakageComponent';
import api from '../../constant/ApiCall'
import AppContext from '../../context/AppContext'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from 'react-native-geolocation-service';
import i18n from '../../i18n' 
import VersionCheck from 'react-native-version-check';
import Geocoder from 'react-native-geocoding';
import CustomButton from '../../components/CustomButton';

import MapModal from './MapModal'
import { color } from 'react-native-reanimated';
import SpInAppUpdates, {
  NeedsUpdateResponse,
  IAUUpdateKind,
  StartUpdateOptions,
} from 'sp-react-native-in-app-updates';

const inAppUpdates = new SpInAppUpdates(
  false // isDebug
);
const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height; 
const LATITUDE_DELTA = 0.0922;
const Home = ({navigation}) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [mapmodalVisible, setmapModalVisible] = React.useState(false);

  const [pakageArry, setPakageArry] = React.useState([]);
  const [offer, setOffer] = React.useState('')
  const [catArry, setCatArry] = React.useState([]) 
  const [logitude, setLong] = useState(23.4241)
  const [lattiude, setlattitude] = useState(53.8478)
  const [loader, setLoading] = useState(false)
  const [name, setpakage] = useState('')
  const markerRef = useRef(null); 
  const [address, setAddress] = useState('')
  const [lattitudedelta, setlattitudeDelta] = useState(0.00522)
  const [longitudedelta, setlongitudedelta] = useState(Dimensions.get("window").width / Dimensions.get("window").height * 0.00522)
  const {setUserId,setUser,setClientId,setBookingData,bookdata,lang,setLang} = useContext(AppContext)
  useEffect(() => {
    Geocoder.init("AIzaSyA8IUpnIqpTdXaDn7NTkN1k2CU3Hh8T8Ck"); 
    getHeadr()
    getcategory()
    setUserFunc()
    requestPermission()
    langaugeReset() 
    return ()=>{ 
      getHeadr()
      getcategory()
      setUserFunc()
    }
  }, [])  
  const decodeAddress = (lat,long) =>{
    console.log(long)
    Geocoder.from(lat, long)
    .then(json => {
      
      var addressComponent = json.results[0].formatted_address;
      setAddress(addressComponent)
    })
    .catch(error => console.warn(error));
    // setlattitude(lat)
    // setLong(long)
  }
  const checkUpdateNeeded = async (langu) => {
    const inAppUpdates = new SpInAppUpdates(
      false // isDebug
    );
    // curVersion is optional if you don't provide it will automatically take from the app using react-native-device-info
    inAppUpdates.checkNeedsUpdate({ curVersion: '0.0.8' }).then((result) => {
      if (result.shouldUpdate) {
        
        if (Platform.OS === 'android') {
          // android only, on iOS the user will be promped to go to your app store page
          updateOptions = {
            updateType: IAUUpdateKind.FLEXIBLE,
          };
        }
        inAppUpdates.startUpdate(StartUpdateOptions); // https://github.com/SudoPlz/sp-react-native-in-app-updates/blob/master/src/types.ts#L78
      }
    }).catch(err=>{
      console.log(err)
    });
    // let updateNeeded = await VersionCheck.needUpdate();
    // console.log(updateNeeded)
    // if (updateNeeded.isNeeded == true) {
    //   let link = '';
    //   if(Platform.OS == 'android'){
    //     link = 'https://play.google.com/store/apps/details?id=com.blueteam'
    //   }else{
    //     link = 'https://apps.apple.com/us/app/keynote/id1579217038'
    //   }
    //   Alert.alert(
    //     i18n.t('updateTitle1', { locale: langu }),
    //     i18n.t('updateTitle2', { locale: langu }),
    //     [
    //       {
    //         text: i18n.t('cancel', { locale: langu }),
    //         onPress: () => console.log("Cancel Pressed"),
    //         style: "cancel"
    //       },
    //       { text: i18n.t('update', { locale: langu }), onPress: () => {
    //         Linking.openURL(link)
    //       }}
    //     ]
    //   );
    //     //Alert the user and direct to the app url
    // }
}
  const langaugeReset = async() =>{ 
    let lng = await AsyncStorage.getItem('lang')
    i18n.locale = lng
    setLang(lng)
    if (lng == 'en') { 
        if (I18nManager.isRTL) {
                  I18nManager.forceRTL(false);
            }
 } else {
        if (!I18nManager.isRTL) {
               I18nManager.forceRTL(true);
            }
 }
 checkUpdateNeeded(lng);
  
}  
  const setUserFunc = async()=>{
    let user = await AsyncStorage.getItem('USER');
    user = JSON.parse(user)
    setUser(user)
    setUserId(user.id)
    setClientId(user.client_id)
    let bookj = bookdata;
    bookj.name = user.name
    bookj.email = user.house_no
    bookj.address = user.address
    bookj.phone = user.phone;
    setBookingData(bookj)
  }
  const getHeadr = () =>{
    api.get('/api.php?action=getoffer')
    .then(response => {if(response.status == 200){
      setOffer(response.data.data.offer_desp)
    }})
    .then()
  }
  const getcategory = () =>{
   
    api.get('/api.php?action=getCategory')
    .then(response => {if(response.status == 200){
      setCatArry(response.data.data)
    }})
    .then()
  } 
  const getPakagae = (id) =>{
    setPakageArry([])
    setLoading(true) 
    setModalVisible(!modalVisible);
    let bookj = bookdata; 
    bookj.category_id = id
    setBookingData(bookj)
    api.post('/api.php?action=getAllPakage', {
      id: id,
    })
    .then(response => {if(response.status == 200){
      setPakageArry(response.data.data)
     
    }})
    .then().finally(()=>{
      setLoading(false)
    })
  }
  const getCurrent = ()=>{
    Geolocation.getCurrentPosition(
      (position) => {
        let bookj = bookdata;
        bookj.lat = position.coords.latitude
        bookj.lon = position.coords.longitude
        setBookingData(bookj)
        setLong(position.coords.longitude)
        setlattitude(position.coords.latitude) 
        decodeAddress(position.coords.latitude,position.coords.longitude)
      },
      (error) => {
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000,forceRequestLocation:true }
  );
  }
  const requestPermission = async () => {
    if(Platform.OS == 'ios'){
      Geolocation.requestAuthorization('whenInUse')
      getCurrent()
    }else{
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getCurrent()
        } else {
          requestPermission()
        }
      } catch (err) {
        console.log(err) 
      }
    }        
		
	}
  const onRegionChangeComplete = (coord) => {
    let bookj = bookdata;
    bookj.lat =coord.latitude
    bookj.lon = coord.longitude
    setBookingData(bookj) 
    decodeAddress(coord.latitude,coord.longitude)
    setlattitude(parseFloat(coord.latitude))
    setLong(parseFloat(coord.longitude))
  };
  const onConfirm = (obj) =>{
    console.log(obj) 
    setlattitude(obj.lat)
    setLong(obj.lon)
    setAddress(obj.add)
    let bookj = bookdata;
    bookj.address = obj.add;
    setBookingData(bookj) 
    setmapModalVisible(false)
  }
  const closeModal =()=>{
    setmapModalVisible(false)
  }
    return (
        <SafeAreaView style={styles.container}>
            <HomeHeader oncontact={()=>navigation.navigate('ContactUs')} onnoti={()=>navigation.navigate('Notification')}></HomeHeader>
            <NotificationHeader text={offer}></NotificationHeader>
            <NotificationHeader text={address}></NotificationHeader>
            <View style={styles.mapContainer}>
            <MapView
            ref={markerRef}
              style={styles.mapView} 
              onRegionChangeComplete={(coord,gesture)=>{
                
                if(gesture.isGesture){
                  onRegionChangeComplete(coord)
                }
              }}
             
              zoomEnabled={true}
             
              zoomControlEnabled
              animateToCoordinate
              initialRegion={{ 
                latitude: parseFloat(lattiude),
                longitude: parseFloat(logitude),
                latitudeDelta: 0.00522,
                longitudeDelta: Dimensions.get("window").width / Dimensions.get("window").height * 0.00522,
              }}
                region={{
                    latitude: parseFloat(lattiude),
                    longitude: parseFloat(logitude),
                    latitudeDelta: 0.00522,
                    longitudeDelta: Dimensions.get("window").width / Dimensions.get("window").height * 0.00522,
                  }}
                  
                  // minZoomLevel={18}
                  // maxZoomLevel={20}
                 
                  
            >
            </MapView>
            <View style={styles.markerFixed}>
          <Image style={styles.marker} source={require('../../assets/pin.png')} />
        </View>
        <TouchableOpacity onPress={()=>{setmapModalVisible(true)}} style={styles.changeLocation}>
          <Text style={{color:'#fff'}}> { i18n.t('change_location', { locale: lang })}</Text>
        </TouchableOpacity>
            <View style={{flexDirection:'row',position:'absolute',bottom:10}}>
              
              {catArry.map((data,i)=>{
                return (<CategoryComp press={()=>{getPakagae(data.main_id),setpakage(lang == 'en' ? data.main_name : data.main_name_arabic)}} key={data.main_id} name={lang == 'en' ? data.main_name : data.main_name_arabic} img={data.main_image}></CategoryComp>)
              })}
              
              
            </View>
           
            </View>
            <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
         
          setModalVisible(!modalVisible);
        }}
      >
        <SafeAreaView style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.modalHead}>
              <Text style={styles.modalTitle}>{name}</Text>
              <EVIL onPress={()=>{setModalVisible(false)}} size={30} name="close" color="#fff"></EVIL>
            </View>
           {loader == true && ( <ActivityIndicator size="small" color="#fff"></ActivityIndicator>)}
            <FlatList
            showsVerticalScrollIndicator={false}
              data={pakageArry} 
              renderItem={({item})=>(<PakageComponent press={()=>{
                setModalVisible(false);
                let bookj = bookdata;
                bookj.main_id = item.pakage_category_id;
                bookj.address = address;
                setBookingData(bookj)
                navigation.navigate('BigSmall',{pakage:item})
              }} name={lang == 'en' ? item.pakage_name : item.pakage_name_arabic}></PakageComponent>)}
              keyExtractor={item => item.pakage_id}
            />
          </View>
        </SafeAreaView>
          </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={mapmodalVisible}
        onRequestClose={() => {
         
          setmapModalVisible(!mapmodalVisible);
        }}
      >
       <MapModal closeModal={closeModal} onConfirm={onConfirm} lattitude={lattiude} longiude={logitude}></MapModal>
        </Modal>
        </SafeAreaView>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
       flex:1,
      
      },
      mapContainer: {
        flex: 1,
        height: hp('83%'),
      },
      mapView: {
        height: '70%',
        width: '100%',
      },
      centeredView: {
        flex: 1,
        paddingHorizontal:10,
        
        backgroundColor:colors.darkBlue,
        paddingBottom:hp('8%')
      },
      modalHead:{
        height:hp('7%'),
        backgroundColor:colors.darkBlue,
        flexDirection:'row',
        width:'100%',
        alignItems:'center',
        paddingHorizontal:20,
        justifyContent:'space-between'
      },
      modalTitle:{
        color:'#fff',
        fontSize:25,
        textTransform:'capitalize',
        fontWeight:'bold'
      },
      markerFixed: {
        left: '50%',
        marginLeft: -24,
        marginTop: -48,
        position: 'absolute',
        top: '50%'
      },
      marker: {
        height: 48,
        width: 48
      },
      zoomIn:{
        width:wp('10%'),
        height:wp('10%'),
        backgroundColor:'#fff',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
      },
      changeLocation:{
        width:wp('30%'),
        backgroundColor:colors.darkBlue,
        position:'absolute',
        height:hp('5%'),
        top:10,
        right:10,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:5
      }
      
})
