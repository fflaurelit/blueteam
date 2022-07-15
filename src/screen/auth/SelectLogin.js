import React,{useContext,useEffect} from 'react'
import { StyleSheet, Text, View,Pressable,Modal,I18nManager } from 'react-native'
import BlueHeader from '../../components/BlueHeader';
import AuthHeader from '../../components/AuthHeader';
import CustomButton from '../../components/CustomButton';
import Ripple from 'react-native-material-ripple';
import i18n from '../../i18n'
import AppContext from '../../context/AppContext'
import FEA from 'react-native-vector-icons/Feather'
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from "react-native-restart";
 
const Login = ({navigation}) => { 
    const {lang,setLang} = useContext(AppContext)
    const [modalVisible, setModalVisible] = React.useState(false);
    const [langu, setlang] = React.useState('en');
    const [lanArry, setLangArry] = React.useState([{name:'English',i18:'en'},{name:'Arabic',i18:'arabic'}]);
    useEffect(() => {
       checklang()
    }, [])  
    const checklang = async() =>{
        let rrg = await AsyncStorage.getItem('lang')
       
        if(rrg != null){
            if(rrg == 'en'){
                I18nManager.forceRTL(false);
            }else{
                I18nManager.forceRTL(true);
            }
            setLang(rrg)
            setlang(rrg)
        }else{
            I18nManager.forceRTL(false);
            setLang('en')
            setlang('en')
            await AsyncStorage.setItem('lang','en')
        }
    }
    const langaugeReset = async(lng) =>{ 
        await AsyncStorage.setItem('lang',lng)
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
        RNRestart.Restart();
    }
    return (
        <View style={{flex:1,backgroundColor:'#fff'}}>
        <BlueHeader showback={false} text=""></BlueHeader>
        <AuthHeader head="LStarted" desp="Createandaccount"></AuthHeader>
        <View style={{width:'95%',alignSelf:'center',marginTop:30}}>
        <CustomButton press={()=>navigation.navigate('Register')} is_pri={true} text="signup"></CustomButton>
        </View>
        <View style={{width:'95%',alignSelf:'center'}}> 
        <CustomButton press={()=>navigation.navigate('LoginWithPhone')} is_pri={false} text="login"></CustomButton>
        </View>
        <Pressable style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}} onPress={()=>setModalVisible(true)}>
            <Text style={styles.langText}>{i18n.t('language', { locale: lang })}</Text>
        </Pressable>
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
                return(<Ripple onPress={()=>{setlang(data.i18);langaugeReset(data.i18);}} style={styles.langrow}>
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

export default Login

const styles = StyleSheet.create({
    langText:{
        fontSize:20,
        alignSelf:'center',
        fontWeight:'bold',
        textAlign:'center'
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
