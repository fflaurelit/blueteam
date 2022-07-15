import React,{useEffect,useState} from 'react'
import { StyleSheet, Text, View,Image,Modal, ScrollView,ToastAndroid } from 'react-native'
import Ionicons from 'react-native-vector-icons/Entypo'
import LightBlueHead from '../../components/LightBlueHead';
import CustomButton from '../../components/CustomButton';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import ImagePicker from 'react-native-image-crop-picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ripple from 'react-native-material-ripple';
import i18n from '../../i18n'
import AppContext from '../../context/AppContext'
import Toast from 'react-native-simple-toast';

const AdditionalService = ({route,navigation}) => {
    const {booking_id,date,time,phone,ifavai,bid,email,name,customer_tap_id,price} = route.params;
    const [imgArray, setimageArray] = useState([])
    const [modalVisible, setModalVisible] = useState(false);
    const [loader, setLoading] = useState(false)
    const {lang,user} = React.useContext(AppContext) 

   const upload = (type) =>{
        if(type == 'gallary'){
            ImagePicker.openPicker({
                multiple: true
              }).then(images => {
                let dat = imgArray.concat(images)
               setimageArray(dat)
              });
        }else{
            ImagePicker.openCamera({
              cropping: true,
              width:500,height:500
              }).then(images => {
                let dat = imgArray.concat(images)
                setimageArray(dat)
                
              }); 
        }
   }
 const uploadapi = async(path,type) =>{
  console.log(path)
  setLoading(true)
    const formData = new FormData() 
    formData.append('imagefile', {
        uri: path,
        type: type, 
        name: 'fate.jpeg', 
    }) 
    formData.append('service_id',booking_id)
    console.log(formData)
      try {
        const res = await fetch(`https://admin.blueteam.xyz/api.php?action=addGarageImage`, {
          method: 'POST',
          body: formData,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
        });
      
        const json = await res.json();
        console.log(json);
        if (json.status == '200') {
         
        }
      } catch (error) {
        console.log(error);
      
      }finally{
        setLoading(false)
      }
 }
 const onUpload = () =>{
   if(imgArray.length > 0){
    imgArray.forEach(element => {
      uploadapi(element.path,element.mime)
    });
    if(ifavai == 'online_booking'){ 
      navigation.navigate('Payment',{
        main_id:bid,
        serv_id:booking_id,
        date:date,
        time:time,
        phone:phone,
        amount:price,
        name:name,
        addressn:user.address,
        email:email
      })
      
    }else{
      navigation.navigate('ThankYou',{
        booking_id:booking_id,
        date:date,
        time:time,
        phone:phone
      })
    }
   }else{
    Toast.show('Image Is Required',Toast.LONG)

   }
    
     
 }
    return (
        <View style={{flex:1,backgroundColor:'#fff'}}>
            <LightBlueHead text="please_take_picture_of_the_car_registration_card"></LightBlueHead>
            <ScrollView>
            <View style={{marginTop:10}}>
              {imgArray.length == 0 ? (  <Ripple onPress={()=>{setModalVisible(true)}} style={{width:'90%',
        height:heightPercentageToDP('30%'),
        borderWidth:2,
        borderStyle:'dashed',
        borderRadius:10,borderColor:'#115ee2',backgroundColor:'#eef4ff',alignItems:'center',justifyContent:'center',alignSelf:'center'}}>
            <Ionicons color="#115ee2" size={heightPercentageToDP('15%')} name="upload"></Ionicons>
            <Text style={{ color:"#115ee2",fontSize:heightPercentageToDP('2.5%'),textAlign:'center'}}>{i18n.t('please_take_picture_of_the_car_registration_card', { locale: lang })}</Text>
        </Ripple>) : (<View style={{flexDirection:'row',flexWrap:'wrap',alignItems:'center',justifyContent:'center'}}>
        {imgArray.map((item,index)=>{
          return (<Image source={{uri:item.path}} style={{width:widthPercentageToDP('25%'),height:widthPercentageToDP('25%'),margin:10}}></Image>)
        })}
        <Ripple onPress={()=>{setModalVisible(true)}} style={styles.add}>
        <Ionicons color="#115ee2" size={heightPercentageToDP('5%')} name="upload"></Ionicons>
        </Ripple>
        </View>)}
      
        
       
       </View>
         
          <View style={styles.col}>
              
                  <CustomButton isloading={loader} press={()=>{onUpload()}} is_pri={true} text="submit"></CustomButton>
             
            
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
          <View style={styles.modalView}>
            <Ripple onPress={()=>{ setModalVisible(!modalVisible);upload('gallary')}} style={styles.column}>
                <FontAwesome name="picture-o" size={heightPercentageToDP('5%')}></FontAwesome>
                <Text style={styles.name}>Gallery</Text>
            </Ripple>  
            <Ripple onPress={()=>{ setModalVisible(!modalVisible);upload('camera')}} style={styles.column}>
                <Ionicons name="camera" size={heightPercentageToDP('5%')}></Ionicons>
                <Text style={styles.name}>Camera</Text>
            </Ripple>           
          </View>
        </View>
      </Modal>
            </ScrollView>
       
      </View>
    )
}

export default AdditionalService

const styles = StyleSheet.create({
    col:{
        flexDirection:'row',
        paddingHorizontal:10,
        width:'95%',
        alignItems:'center',
        alignSelf:'center',
        marginTop:heightPercentageToDP('10%')
    },
  
    text:{
        fontSize:heightPercentageToDP('2.5%')
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        backgroundColor: "white",
        borderRadius: 20,
      
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        flexDirection:'row',
        width:'80%',
        height:heightPercentageToDP('15%')
      },
      column:{
        width:'50%',
        justifyContent:'center',
        alignItems:'center'
      },
      name:{
        fontSize:heightPercentageToDP('2%'),
        marginTop:15
      },
      add:{
     width:widthPercentageToDP('25%'),
        height:widthPercentageToDP('25%'),
        borderWidth:2,
        borderStyle:'dashed',
        borderRadius:10,
        borderColor:'#115ee2',
        backgroundColor:'#eef4ff',
        alignItems:'center',
        justifyContent:'center'
      }
})
