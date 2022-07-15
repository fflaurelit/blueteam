import React,{useContext,useEffect} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import LightBlueHead from '../../components/BlueHeader';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { heightPercentageToDP } from 'react-native-responsive-screen';
import Ripple from 'react-native-material-ripple';
import AppContext from '../../context/AppContext'
import i18n from '../../i18n'
import api from '../../constant/ApiCall'
const Shop = ({navigation}) => { 
    const {user,lang} = useContext(AppContext)
    const [credit, setCedit] = React.useState('')
    useEffect(() => {
        getUserData()
    }, [])
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getUserData()
          });
          return unsubscribe;
      }, [navigation])
    const getUserData = () =>{
            api.post('/api.php?action=getUserData',{id:user.id})
            .then(response => {if(response.status == 200){
              console.log(response.data.data)
              setCedit(response.data.data.credit)
            }})
            .then()
    }
    return (
        <View style={{flex:1,backgroundColor:'#fff'}}>
            <LightBlueHead showback={true} press={()=>navigation.goBack()} text="credit"></LightBlueHead>
            <Ionicons style={{alignSelf:'center',marginTop:heightPercentageToDP('5%')}} color="#7fc6ff" size={heightPercentageToDP('15%')} name="wallet"></Ionicons>
            <Text style={{alignSelf:'center',marginTop:heightPercentageToDP('3%'),fontSize:heightPercentageToDP('3%'),color:'#000'}}>{i18n.t('total_credit_earned', { locale: lang })}</Text>
            <Text style={{alignSelf:'center',marginTop:heightPercentageToDP('3%'),fontSize:heightPercentageToDP('3%'),color:'#000'}}>{credit} Dhs</Text>
            <Ripple onPress={()=>navigation.navigate('RechargePakage')} rippleContainerBorderRadius={heightPercentageToDP('7%')} style={styles.btton}>
                <Text style={styles.txx}>{i18n.t('request', { locale: lang })}</Text>
            </Ripple>

        </View>
    )
}

export default Shop

const styles = StyleSheet.create({
    btton:{
        width:'40%',
        height:heightPercentageToDP('7%'),
        marginTop:20,
        alignSelf:'center',
        backgroundColor:'#7fc6ff',
        borderRadius:heightPercentageToDP('7%'),
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    txx:{
        fontSize:15,color:'#fff'
    }
})
