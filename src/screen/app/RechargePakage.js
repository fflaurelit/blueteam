import React,{useEffect,useState,useContext} from 'react'
import { StyleSheet, Text, View,FlatList,Alert } from 'react-native'
import MCI from 'react-native-vector-icons/MaterialCommunityIcons'
import LightBlueHead from '../../components/LightBlueHead';
import CustomButton from '../../components/CustomButton';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import api from '../../constant/ApiCall'
import AppContext from '../../context/AppContext'

import Ripple from 'react-native-material-ripple';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import i18n from '../../i18n'

const AdditionalService = ({route,navigation}) => {
    const [total, setPrice] = useState('')
    const [fruits, setAdditional] = useState([])
    const [selectedid, setId] = useState('')
    const [buyamount, setBuy] = useState('')
    const {user,lang} = useContext(AppContext)

    useEffect(() => {
      getPakagae()
    }, [])
    const getPakagae = () =>{
      api.get('/api.php?action=getCards')
      .then(response => {if(response.status == 200){
    
        setAdditional(response.data.data)
      }})
      .then()
    }
    const onRoute = ()=>{
      if(selectedid != ''){
        var val = Math.floor(1000 + Math.random() * 9000);
        var id = val+user.client_id; 
        if(selectedid == 56){
          navigation.navigate('Cpayment',{amount:total,uid:user.id,mid:selectedid,getamt:buyamount,phone:user.phone,addressn:user.address,email:user.email})
        }else if(selectedid == 57){
          navigation.navigate('Cpayment1',{amount:total,uid:user.id,mid:selectedid,getamt:buyamount,phone:user.phone,addressn:user.address,email:user.email})
        }else if(selectedid == 58){
          navigation.navigate('Cpayment2',{amount:total,uid:user.id,mid:selectedid,getamt:buyamount,phone:user.phone,addressn:user.address,email:user.email})
        }

      }else{
        Alert.alert('Please select Pakage first.')
      }
    }
    
 
    return (
        <View style={{flex:1,backgroundColor:'#fff',paddingBottom:50}}>
            <LightBlueHead press={()=>navigation.goBack()} text="request"></LightBlueHead>
            <View style={{height:'80%'}}>
            <FlatList
        data={fruits}
        renderItem={({item,index})=>{
          return (<Ripple onPress={()=>{
            setId(item.id)
            setPrice(item.buyamt)
            setBuy(item.getamt)
          }} 
          style={{
          flexDirection:'row',
          minHeight:50,
          borderBottomWidth:1,
          borderColor:'grey',
          paddingHorizontal:10,
          justifyContent:'center',
          alignItems:'center',
         
          }}>
            <View style={{flexDirection:'column',width:'20%'}}>
              {item.id == selectedid ? (<MCI name="circle-slice-8" size={30}></MCI>) : (<MCI name="circle-outline" size={30}></MCI>)}
            </View>
            <View style={{flexDirection:'column',width:'80%'}}>
              <Text>{item.title}</Text>
              <Text>{item.desp}</Text>
            </View>
          </Ripple>)
        }}
        keyExtractor={item => item.id}
        style={{ marginBottom:40}}
      />
            </View>
            {/* <ScrollView>
    
            <View>
            {fruits.map((data,i)=>{
                
              })}
            </View>
       
            </ScrollView> */}
    
        <View style={{position:'absolute',bottom:0,width:'100%'}}>
        <View style={styles.totalStrip}>
              <View style={{flexDirection:'row',width:'70%'}}>
              <Text style={styles.text}>{i18n.t('total', { locale: lang })} - </Text>
              <Text style={styles.text}>{total} {i18n.t('dhs', { locale: lang })}</Text>
              </View>
              <View style={{width:'30%'}}>
                <CustomButton  press={onRoute} is_pri={true} text="buy_now"></CustomButton>
              </View>
          </View>
         
        </View>
      </View>
    )
}

export default AdditionalService

const styles = StyleSheet.create({
    col:{
        flexDirection:'column',
        paddingHorizontal:10,
        width:'50%',
        alignItems:'center'
    },
    totalStrip:{
        flexDirection:'row',
        height:heightPercentageToDP('7%'),
        backgroundColor:'#dedede',
        justifyContent:'space-between',
        paddingHorizontal:10,
        alignItems:'center',
        marginTop:20
    },
    text:{
        fontSize:heightPercentageToDP('2.5%')
    }
})
