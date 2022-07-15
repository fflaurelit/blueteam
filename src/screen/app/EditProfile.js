import React,{useState,useContext,useEffect} from 'react'
import { StyleSheet, Text, View,Pressable,ScrollView,ToastAndroid,ActivityIndicator, TouchableOpacity,Alert } from 'react-native'
import BlueHeader from '../../components/BlueHeader';
import AuthHeader from '../../components/AuthHeader';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import ANT from 'react-native-vector-icons/AntDesign'
import APL from 'react-native-vector-icons/SimpleLineIcons'
import CustomPhone from '../../components/CustomPhone';
import api from '../../constant/ApiCall'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthContext from '../../navigation/Auth'
import AppContext from '../../context/AppContext'
import Toast from 'react-native-simple-toast';

const Login = ({navigation}) => {
    const [phone, setPhone] = useState('')
    const [passwword, setPassword] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [cpassword, setCPassword] = useState('')
    const [loading, setLoading] = useState('') 
    const { signIn,signOut } = useContext(AuthContext)  
    const [ne, setnameerr] = useState(false)
    const [ee, setemailerr] = useState(false) 
    const [pe, setpasserr] = useState(false)
    const [cperr, setcpasserr] = useState(false)
    const [houseno, sethouseNo] = useState('')
    const [addresslink, setaddresslink] = useState('')
    const [nearby, setNearBy] = useState('') 
    const [id, setId] = useState('')
    const {user,setUser,lang} = useContext(AppContext)

    useEffect(() => {
        setName(user.name)
        setEmail(user.email)
        setPhone(user.phone)
        sethouseNo(user.house_no)
        setaddresslink(user.address_link)
        setNearBy(user.near_by)
        setPassword(user.password)
        setCPassword(user.password)
        setId(user.id)
    }, [navigation])
    const LoginFun = async() =>{
        if(phone != ''  && name != ''){
                setLoading(true)
                api.post('/api.php?action=editProfile', {
                    name:name, 
                    email:email,
                    phone:phone,
                    password:passwword,
                    near_by: nearby, 
                    address_link: addresslink,
                    house_no: houseno,
                    id:id
                })
                .then(response => {if(response.status == 200){
                   if(response.data.status == '400'){
                    Toast.show('Please enter valid phone number.',Toast.LONG)
                   }else{
                    Toast.show('Profile Updated Successfully',Toast.LONG)
                   
                    savData(response.data.data)
                   
                   }
                  
                }})
                .then().finally(()=>{
                    setLoading(false)
                })
            
            
        }else{
           name == '' ? setnameerr(true):setnameerr(false)
           phone == '' ? setemailerr(true):setemailerr(false)
           Toast.show('Please enter required fields',Toast.LONG)
        }
       
      }
      const DeleteAccount = async() =>{
       
                setLoading(true)
                api.post('/api.php?action=deleteUser', {
                    u_id:id
                })
                .then(response => {if(response.status == 200){
                   if(response.data.status == '400'){
                    Toast.show('Unable to delete Account.',Toast.LONG)
                   }else{
                    Toast.show('Account Deleted Successfully.',Toast.LONG)
                   
                    logout()
                   
                   }
                  
                }})
                .then().finally(()=>{
                    setLoading(false)
                })
       
      }
      const DeleteAlert = () =>{
        Alert.alert(
            "",
            "Are your sure you want to delete account?",
            [
              // The "Yes" button
              {
                text: "Yes",
                onPress: () => {
                    DeleteAccount()
                },
              },
              // The "No" button
              // Does nothing but dismiss the dialog when tapped
              {
                text: "No",
              },
            ]
          );
      }
      const savData = async(data)=>{
          console.log(data)
          setUser(data)
        await AsyncStorage.setItem('USER', JSON.stringify(data))
      }
      const logout = async()=>{
        await AsyncStorage.clear() 
        await AsyncStorage.setItem('lang',lang)
        signOut()
    }  
    return (
        <View style={{flex:1,backgroundColor:'#fff'}}>
               <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }} enableOnAndroid={true}>
               <ScrollView showsVerticalScrollIndicator={false}>
            <BlueHeader press={()=>navigation.goBack()} showback={true} text="edit"></BlueHeader>
          
            <CustomInput value={name} style={{borderBottomColor:ne == true ? 'red' : '#000'}} onChange={(text)=>{
                setName(text)
                setnameerr(false)
            }} placeholder="name" icon={<ANT size={30} name="user"></ANT>}></CustomInput>
            <CustomInput value={email}  onChange={setEmail} placeholder="email" icon={<APL size={30} name="envelope"></APL>}></CustomInput>
            <CustomPhone value={phone} onChange={(text)=>{
                setPhone(text)
                setemailerr(false)
            }}  style={{borderBottomColor:ee == true ? 'red' : '#000'}}  placeholder="phone" icon={<APL size={30} name="phone"></APL>}></CustomPhone>
            <CustomInput  value={houseno} onChange={sethouseNo} placeholder="house_no" icon={<ANT size={30} name="home"></ANT>}></CustomInput>
            <CustomInput value={addresslink} onChange={setaddresslink} placeholder="address" icon={<APL size={30} name="envelope"></APL>}></CustomInput>
            <CustomInput value={nearby} onChange={setNearBy} placeholder="near_by" icon={<APL size={30} name="envelope"></APL>}></CustomInput>

            {/* <CustomInput onChange={(text)=>{
                setPassword(text)
                setpasserr(false)
            }} value={passwword} style={{borderBottomColor:pe == true ? 'red' : '#000'}} security={true} placeholder="password" icon={<APL size={30} name="lock"></APL>}></CustomInput>
            <CustomInput onChange={(text)=>{
                setCPassword(text)
                setcpasserr(false)
            }} value={cpassword} style={{borderBottomColor:cperr == true ? 'red' : '#000'}}  security={true} placeholder="confirm" icon={<APL size={30} name="lock"></APL>}></CustomInput> */}
            <View style={{width:'95%',alignSelf:'center'}}>
                <CustomButton isloading={loading} press={LoginFun} is_pri={true} text="submit"></CustomButton>

            </View>
            <View style={{width:'95%',alignSelf:'center'}}>
                <TouchableOpacity style={{alignSelf:'center'}} onPress={()=>{DeleteAlert()}}>
                    <Text style={{color:'red',fontSize:18,fontWeight:'bold'}}>Delete Account</Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
               </KeyboardAwareScrollView>
           
      
        
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    langText:{
        fontSize:20,
        alignSelf:'center',
        fontWeight:'bold'
    }
})
