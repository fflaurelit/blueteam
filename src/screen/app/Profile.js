import React,{useContext, useEffect} from 'react'
import { StyleSheet, Text, View,Modal, ScrollView,I18nManager } from 'react-native'
import BlueHeader from '../../components/BlueHeader';
import Fontisto from 'react-native-vector-icons/Fontisto'
import { heightPercentageToDP } from 'react-native-responsive-screen';
import ANT from 'react-native-vector-icons/AntDesign'
import MCI from 'react-native-vector-icons/MaterialCommunityIcons'
import Ripple from 'react-native-material-ripple';
import FEA from 'react-native-vector-icons/Feather'
import AuthContext from '../../navigation/Auth'
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppContext from '../../context/AppContext'
import i18n from '../../i18n'
import RNRestart from "react-native-restart";

const Shop = ({navigation}) => {
    const [modalVisible, setModalVisible] = React.useState(false);
    const [lanArry, setLangArry] = React.useState([{name:'English',i18:'en'},{name:'Arabic',i18:'arabic'}]);
    const [langu, setlanganguage] = React.useState('en');
    const { signOut } = useContext(AuthContext)  
    const {lang,setLang} = useContext(AppContext)
    useEffect(() => {
        setlanganguage(lang)
    }, [])
    const logout = async()=>{
        await AsyncStorage.clear() 
        await AsyncStorage.setItem('lang',lang)
        signOut()
    }  
    const langaugeReset = async(lng) =>{ 
        await AsyncStorage.setItem('lang',lng)
        i18n.locale = lng
        setLang(lng)
        setlanganguage(lng)
        if (lng == 'en') {
            if (I18nManager.isRTL) {
                      I18nManager.forceRTL(false);
                }
     } else {
            if (!I18nManager.isRTL) {
                   I18nManager.forceRTL(true);
                }
     }
        RNRestart.Restart();
    }
    return (
        <View style={{flex:1,backgroundColor:'#fff'}}>
            <ScrollView>
            <BlueHeader showback={true} press={()=>navigation.goBack()}  text="more"></BlueHeader>
            <Ripple  style={styles.row} onPress={()=>navigation.navigate('QRcode')}>
         
                <ANT size={40} name='qrcode'></ANT>
                <Text style={styles.head}>QR Code</Text>
           
            </Ripple>
            <Ripple  style={styles.row} onPress={()=>navigation.navigate('EditProfile')}>
           
                <ANT size={40} name='user'></ANT>
                <Text style={styles.head}>{i18n.t('edit', { locale: lang })}</Text>
             
            </Ripple> 
            
            <Ripple  style={styles.row} onPress={()=>navigation.navigate('ServiceHistory')}>
           
                <MCI size={40} name='history'></MCI>
                <Text style={styles.head}>{i18n.t('service_history', { locale: lang })}</Text>
            
            </Ripple> 
           
            <Ripple  style={styles.row} onPress={()=>setModalVisible(true)}>
            
                <Fontisto size={35} name='world-o'></Fontisto>
                <Text style={styles.head}>{i18n.t('language', { locale: lang })}</Text>
           
            </Ripple>
           
            <Ripple  style={styles.row} onPress={()=>navigation.navigate('AddressBook')}>
           
                <ANT size={40} name='book'></ANT>
                <Text style={styles.head}>{i18n.t('address_book', { locale: lang })}</Text>
            
            </Ripple>
            <Ripple  style={styles.row} onPress={()=>navigation.navigate('ContactUs')}>
           
                <FEA size={40} name='phone'></FEA>
                <Text style={styles.head}>{i18n.t('contact', { locale: lang })}</Text>
           
            </Ripple>
            {/* <View style={styles.row}>
                <ANT size={35} name='creditcard'></ANT>
                <Text style={styles.head}>Saved Cards</Text>

            </View> */}
            <Ripple onPress={logout} style={styles.row}>
                <ANT color="#fd4141" size={37} name='logout'></ANT>
                <Text style={styles.head}>{i18n.t('logout', { locale: lang })}</Text>
            </Ripple>
            </ScrollView>
            
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
              <View style={{height:60,borderBottomWidth:0.5,alignItems:'center',flexDirection:'row',justifyContent:'center'}}>
                  <Text style={{textAlign:'center',fontWeight:'bold',fontSize:20}}>{i18n.t('language', { locale: lang })}</Text>
              </View>
            {lanArry.map((data,i)=>{
                return(<Ripple onPress={()=>{setlanganguage(data.i18);langaugeReset(data.i18);}} style={styles.langrow}>
                    <Text style={[styles.langText,{color:langu == data.i18 ? '#3880ff' : '#000'}]}>{data.name}</Text>
                    {langu == data.i18 && (<FEA name="check" size={25}  color="#3880ff"></FEA>)}
                    
                </Ripple>)
            })}
            <View style={styles.bttnRow}>
                <Ripple onPress={()=>{setModalVisible(false)}} style={[styles.bttnCol,{borderRightWidth:0.5,borderColor:'#000'}]}>
                    <Text style={styles.bttnText}>Cancel</Text>
                </Ripple>
                <Ripple onPress={()=>{setModalVisible(false)}} style={styles.bttnCol}>
                    <Text style={styles.bttnText}>Ok</Text>
                </Ripple>
            </View>
          </View>
        </View>
      </Modal>
        </View>
    )
}

export default Shop

const styles = StyleSheet.create({
    row:{
        flexDirection:'row',
        height:60,
        borderBottomWidth:0.5,
        borderColor:'#ccc',
        marginVertical:10,
        marginHorizontal:10,
        alignItems:'center'
    },
    head:{
        fontSize:18,
        marginLeft:10
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
          width:'70%',
        margin: 20,
        backgroundColor: "white",
        borderRadius: 10,
       
       
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      langrow:{
          flexDirection:'row',
          height:50,
          alignItems:'center',
          justifyContent:'space-between',
          paddingHorizontal:10
        
      },
      langText:{
          fontSize:17,
          
      },
      bttnRow:{
          borderTopWidth:0.5,
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
