import React,{useState,useContext,useEffect,useRef} from 'react'
import { Dimensions,StyleSheet, Text, View,Image,ScrollView ,SafeAreaView,Modal,TouchableOpacity} from 'react-native'
import BlueHeader from '../../components/LightBlueHead';
import CustomButton from '../../components/CustomButton';
import Ripple from 'react-native-material-ripple';
import CustomInput from '../../components/CustomInput';
import ANT from 'react-native-vector-icons/AntDesign'
import FONTAWE from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import APL from 'react-native-vector-icons/SimpleLineIcons'
import CustomPhone from '../../components/CustomPhone';
import MapAddress from '../../components/MapAddress'; 
import PickUpDate from '../../components/PickUpDate';
import CustomTime from '../../components/CustomTime';
import AppContext from '../../context/AppContext'
import api from '../../constant/ApiCall'
import MapView, { Marker, Callout } from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import i18n from '../../i18n'
import Toast from 'react-native-simple-toast';
const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height; 

const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const Login = ({navigation}) => {  
    const {bookdata,userId,user,lang} = useContext(AppContext)
    const [name, setname] = useState('')
    const [email, setemail] = useState('') 
    const [phone, setphone] = useState('')
    const [note, setNote] = useState('')
    const [address, setAddress] = useState('')
    const [modalVisible, setModalVisible] = useState(false);
    const [addArry, setAddressArr] = useState([])
    const [mapvisible, setMapVisible] = useState(false);
    const [logitude, setLang] = useState('0')
    const [lattiude, setlattitude] = useState('0')
    const [paymentOption, setPaymentOption] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('online')
    const [loader, setLoading] = useState(false)
    const [mapaddress, setMapAdress] = useState('')
    const markerRef = useRef(null);

    const [paymentArray, setpaymentArray] = useState([
      {
        icon:<FONTAWE style={{marginHorizontal:10}} name="credit-card-alt" size={20} color="#115ee2"></FONTAWE>,
        text:'Online Payment',
        value:'online_booking'
      },{
        icon:<FONTAWE style={{marginHorizontal:10}} name="id-card" size={20} color="#115ee2"></FONTAWE>,
        text:'Blue Team Credit',
        value:'userprevious'
      }
    ])
    useEffect(() => {
      Geocoder.init("AIzaSyA8IUpnIqpTdXaDn7NTkN1k2CU3Hh8T8Ck"); // use a valid API key
      setname(bookdata.name)
      setemail(bookdata.email)
      setphone(bookdata.phone)
      setAddress(bookdata.address)
      setlattitude(bookdata.lat)
      setLang(bookdata.lon)
      decodeAddress(parseFloat(bookdata.lat),parseFloat(bookdata.lon)) 
    }, [])
    const onbook = (mode,ifavai) =>{
        if(name != '' && phone != '' && email != '' && bookdata.prefered_date != '' && bookdata.prefered_time != '' && address != ''){
          let finalArry = bookdata
            finalArry.name = name
            finalArry.email = email 
            finalArry.phone = phone
            finalArry.note = note
            finalArry.address = address 
            finalArry.payment_mode = mode
            finalArry.ifavai = ifavai
            finalArry.user_id = user.client_id
            finalArry.lat = lattiude
            finalArry.lon = logitude
          if(ifavai == 'online_booking'){
            navigation.navigate('Payment',{
              bookingArray:finalArry
            })
          }else{
            setLoading(true)  
          
            api.post('/api.php?action=dobooking',finalArry)
            .then(response => {
              if(response.data.status == 200){
               
                if(finalArry.category_id == '3'){
                  navigation.navigate('GarageImage',{
                    booking_id:response.data.data.service_id,
                    date:response.data.data.prefered_date,
                    time:response.data.data.time_zone,
                    phone:response.data.data.phone,
                    ifavai:ifavai,
                    bid:response.data.data.bid,
                    name:name,
                    email:email,
                    customer_tap_id:user.customer_tap_id,
                    price:bookdata.price
                  })
                  Toast.show('Booking Successfull',Toast.LONG)
                }else{ 
                    Toast.show('Booking Successfull',Toast.LONG)
                    navigation.navigate('ThankYou',{
                      booking_id:response.data.data.service_id,
                      date:response.data.data.prefered_date,
                      time:response.data.data.time_zone,
                      phone:response.data.data.phone
                    })
                }
            }else if(response.data.status == '500'){
              Toast.show('Insufficient Balance',Toast.LONG)
            }else{
              navigation.navigate('Bookingfailed')
              Toast.show('Booking Failed! Try Again Later',Toast.LONG)
            }
          })
            .then().finally(()=>{
              setLoading(false)
          })
          }
          
          
         
        }else{
          Toast.show('All Fields are required',Toast.LONG)
        }
    }
    const getNotification = () =>{
      setLoading(true)
        api.post('/api.php?action=getAddressBook',{user_id:userId})
        .then(response => {if(response.status == 200){
            
            setAddressArr(response.data.data)
            setModalVisible(true)
        }})
        .then().finally(()=>{
          setLoading(false)
        });
      }
      const decodeAddress = (lat,long) =>{
        Geocoder.from(lat, long)
		.then(json => {
        	var addressComponent = json.results[0].formatted_address;
          console.log(addressComponent)
            //setAddress(addressComponent.long_name)
            setMapAdress(addressComponent)

		})
		.catch(error => console.warn(error))
      }
      const onRegionChange = (region) => {
        setlattitude(region.latitude)
        setLang(region.longitude)
        decodeAddress(region.latitude,region.longitude)
      };
    return (
        <View style={{flex:1,backgroundColor:'#fff'}}>
            <ScrollView showsVerticalScrollIndicator={false}>
            <BlueHeader showback={false} text="contact_details"></BlueHeader>

            <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:15}}>
              <Text style={{fontWeight:'bold',fontSize:20}}>Total</Text>
              <Text style={{fontWeight:'bold',fontSize:20}}>{bookdata.price} {i18n.t('dhs', { locale: lang })}</Text>
            </View>
            <CustomInput  value={name} onChange={setname} placeholder="name" icon={<ANT size={30} name="user"></ANT>}></CustomInput>
           
            <CustomPhone value={phone}  onChange={setphone} placeholder="phone" icon={<APL size={30} name="phone"></APL>}></CustomPhone>
            <CustomInput value={email} onChange={setemail} placeholder="house_no" icon={<ANT size={30} name="home"></ANT>}></CustomInput>
            <PickUpDate placeholder="Prefered Date" icon={<ANT size={30} name="calendar"></ANT>}></PickUpDate>
            <CustomTime placeholder="Prefered Time" icon={<ANT size={30} name="clockcircleo"></ANT>}></CustomTime>
            <CustomInput onChange={setNote} placeholder="note" icon={<APL size={30} name="pencil"></APL>}></CustomInput>

            <CustomInput onChange={setAddress} value={address} placeholder="address" icon={<APL size={30} name="location-pin"></APL>}></CustomInput>
            <View style={{width:'95%',alignSelf:'center'}}>
            <View style={{flexDirection:'row',justifyContent:'flex-end',width:'95%',alignSelf:'center'}}>
                <MapAddress press={()=>{setMapVisible(true)}} text={i18n.t('map', { locale: lang })} icon={<APL color="#3880ff" name="map" size={23}></APL>}></MapAddress>
                <MapAddress press={getNotification} text={i18n.t('address_book', { locale: lang })} icon={<ANT color="#3880ff" name="book" size={23}></ANT>}></MapAddress>
            </View>
            <View style={{flexDirection:'row'}}>
            <View style={styles.col}>
                  <CustomButton isloading={loader} press={()=>{ setPaymentOption(true)}} is_pri={true} text={`pay_now`}></CustomButton>
              </View>
              <View style={styles.col}>
                  <CustomButton isloading={loader} press={()=>{onbook('cash','userapp')}} is_pri={true} text={`pay_later`}></CustomButton>
              </View>
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
        <View style={styles.centeredView}>
          <View style={[styles.modalView,{width:'80%'}]}>
          <View style={{flexDirection:'row',justifyContent:'space-between'}}>
           <Text style={{fontWeight:'bold',fontSize:18,alignSelf:'center',marginVertical:10}}>Select Address</Text>
           <ANT onPress={()=>{setModalVisible(false)}} name="close" color="#000" size={20}></ANT>
           </View>
            {addArry.map((data,i)=>{
                if(data.location != '' ){
                  return (<TouchableOpacity onPress={()=>{
                    setAddress(data.location)
                    setemail(data.house_no)
                    setlattitude(data.lat)
                    setLang(data.lon)
                  setModalVisible(false)
               }} style={{minHeight:30,marginVertical:10,borderBottomWidth:1,padding:10,borderColor:'#ccc'}}>
                 <Text style={{fontWeight:'bold',color:'#000'}}>{data.type}</Text>
                   <Text style={{textAlign:'left',color:data.disabled == 'true' ? '#ccc' : '#000',fontSize:14}}>{data.location}</Text>
               </TouchableOpacity>)
                }
            })}
          </View>
        </View>
      </Modal> 
      <Modal
        animationType="slide"
        transparent={true}
        visible={paymentOption}
        onRequestClose={() => {
          
          setPaymentOption(!paymentOption);
        }}
      >
        <View style={styles.centeredView}>
          <View style={[styles.modalView,{width:'80%'}]}>
           <View style={{flexDirection:'row',justifyContent:'space-between'}}>
           <Text style={{fontWeight:'bold',fontSize:18,alignSelf:'center',marginVertical:10}}>Payment Mode</Text>
           <ANT onPress={()=>{setPaymentOption(false)}} name="close" color="#000" size={20}></ANT>
           </View>
            {paymentArray.map((data,i)=>{
                return(<TouchableOpacity onPress={()=>{
                    setPaymentMethod(data.value)
                    onbook('cash',data.value)
                    setPaymentOption(false)
                 }} style={{minHeight:30,padding:10,marginVertical:5,flexDirection:'row',justifyContent:'space-between',borderBottomWidth:1,alignItems:'center',borderColor:'#dedede'}}>
                   <View style={{flexDirection:'row'}}>
                   {data.icon}
                     <Text style={{textAlign:'left',fontSize:15,fontWeight:'bold',color:'#115ee2'}}>{data.text}</Text>
                   </View>
                   {paymentMethod == data.value ? (<FONTAWE style={{marginHorizontal:10}} name="circle" color="#000" size={20}></FONTAWE>) : (<Feather style={{marginHorizontal:10}} name="circle" color="#000" size={20}></Feather>)}
                     
                 </TouchableOpacity>)
            })}
          </View>
        </View>
      </Modal> 
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
            <ANT onPress={()=>{setAddress(mapaddress);setMapVisible(false);}} name="check" size={30} style={{marginRight:20}} color="#fff"></ANT>
                <ANT onPress={()=>{setMapVisible(false);}} name="close" size={30} style={{marginRight:20}} color="#fff"></ANT>
            </View>
            <View style={{height:50,backgroundColor:'#115ee2',flexDirection:'row',alignItems:'center',paddingHorizontal:5}}>
              <Text style={{color:'#fff'}}>{mapaddress}</Text>
              </View>
        <MapView
              style={{ 
                height: '100%',
                width: '100%',
              }}
              onRegionChange={(region,gesture) => {
                if(gesture.isGesture){
                  onRegionChange(region) 
                }
            }}
             
                initialRegion={{
                  latitude: parseFloat(lattiude),
                  longitude: parseFloat(logitude),
                  latitudeDelta: LATITUDE_DELTA,
                  longitudeDelta: LONGITUDE_DELTA,
            }}
            minZoomLevel={18}
            >
                
            </MapView>
            <View style={styles.markerFixed}>
          <Image style={styles.marker} source={require('../../assets/pin.png')} />
        </View>
        </SafeAreaView>
      </Modal>
            </ScrollView>
      
        
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    langText:{
        fontSize:20,
        alignSelf:'center',
        fontWeight:'bold'
    },
    col:{
        flexDirection:'column',
        paddingHorizontal:10,
        width:'50%',
        alignItems:'center'
    },
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
        padding: 15,
        
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
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
})
