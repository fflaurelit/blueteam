import React,{useState,useEffect,useContext} from 'react'
import { StyleSheet, Text, View,Pressable, Alert } from 'react-native'
import colors from '../../constant/colors'
import EVIL from 'react-native-vector-icons/EvilIcons'
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons'
import FA5 from 'react-native-vector-icons/FontAwesome5'
import CustomButton from '../../components/CustomButton';
import AppContext from '../../context/AppContext'
import i18n from '../../i18n'

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


const BigSmall = ({route,navigation}) => {
    const {setBookingData,bookdata,lang} = useContext(AppContext)
    const [carsize, setCarSize] = useState([
        {type:'salon',label:i18n.t('salon', { locale: lang }),icon:<Ionicons color="#fff" name="car-hatchback" size={wp('13%')}></Ionicons>},
        {type:'four-wheeler',label:i18n.t('four_wheeler', { locale: lang }),icon:<FA5 color="#fff" name="car-side" size={wp('9%')}></FA5>}
    ]) 
    const [garagecarSize, setGarageCarSize] = useState([])
    const {pakage} = route.params;
    const [size, setSize] = useState('')
    const [typesize, setTypeSize] = useState('')

    const [pakagedesp, setPakageDesp] = useState(null) 
    const [pricebig, setPriceBig] = useState(0)
    const [smallbig, setPriceSmall] = useState(0)
    const [setarry, setInterior] = useState([
        {'type':'Interior',icon:<Ionicons color="#fff" name="steering" size={wp('13%')}></Ionicons>,'price':0},
        {'type':'Exterior',icon:<Ionicons color="#fff" name="car" size={wp('11%')}></Ionicons>,'price':0},
        {'type':'Both',icon:<Ionicons color="#fff" name="car-2-plus" size={wp('9%')}></Ionicons>,'price':0}

    ])
    const [price, setPrice] = useState('')
    useEffect(() => {
        if(pakage.pakage_desp_type == 'T'){
            let str = ''
            if(lang == 'en'){
                 str = pakage.pakage_desp;
            }else{
                 str = pakage.pakage_desp_arabic;
            }
            
            let myArr = str.split(",");
            setPakageDesp(myArr)
        }else{
            if(lang == 'en'){
                setPakageDesp(pakage.pakage_desp)
           }else{
            setPakageDesp(pakage.pakage_desp_arabic);
           }
            
        }
       
        setPriceSmall(pakage.pakage_salon_price)
        setPriceBig(pakage.pakage_four_price)
        
        // let garageSize = {}
        // if(pakage.pakage_category_id == '3'){ 
        //     garageSize = bookdata;
        //     bookdata.carsize
        //     if(pakage.pakage_salon == 'Y'){
        //         garageSize.push( {type:'salon',label:i18n.t('price', { locale: lang }),icon:<Ionicons color="#fff" name="car-hatchback" size={wp('13%')}></Ionicons>})
        //     }
        //     if(pakage.pakage_fourwheeler == 'Y'){
        //         console.log('yes for big')
        //         garageSize.push({type:'four-wheeler',label:i18n.t('price', { locale: lang }),icon:<FA5 color="#fff" name="car-side" size={wp('9%')}></FA5>})
        //     }
           
        //     setGarageCarSize(garageSize)
        // }
    }, [])
    const setRouting =()=>{
        let bookj = bookdata;
        bookj.price = price
        bookj.car_type = size
        bookj.pakage_id = pakage.pakage_id
        bookj.service_type_id = typesize;
        if(pakage.pakage_category_id == '3'){ 
            bookj.car_type = 'common'
            bookj.price = pakage.pakage_four_price
        }
        setBookingData(bookj)
        if(bookdata.main_id != "3"){
            if(size == ''){
                Alert.alert('Select Car Size')
            }else{
                if(pakage.show_additional_pakage == 'Y'){
                    navigation.navigate('AdditionalService',{pakageid:pakage.pakage_id,price:price,cartype:size})
                }else{
    
                    navigation.navigate('ContactDetail')
                }
            }
            
        }else{
            navigation.navigate('ContactDetail')
        }
       
    }
    return (
        <View style={styles.centeredView}>
            <View style={styles.modalHead}>
              <Text style={styles.modalTitle}>{lang == 'en' ? pakage.pakage_name : pakage.pakage_name_arabic}</Text>

              <EVIL onPress={()=>navigation.navigate('Home')} size={30} name="close" color="#fff"></EVIL>
            </View>
            {pakagedesp !=null && pakagedesp.map((data,i)=>{
                return (<View style={{flexDirection:'row'}}>
                    <Ionicons name="check" color="#fff" size={20}></Ionicons>
                    <Text style={styles.desp}>{data}</Text>
                    </View>)
            })}
            <View style={{flexDirection:'row',width:'100%',alignItems:'center',justifyContent:'center',marginTop:30}}>
            {bookdata.main_id != "3" && carsize.map((data,i)=>{
                
                return(
                    <Pressable  key={data.type} onPress={()=>{
                        setSize(data.type)
                       
                        if(data.type == 'salon'){
                            setPrice(pakage.pakage_salon_price)
                            let accc = setarry;
                            accc[0].price = pakage.pakage_s_interior_price;
                            accc[1].price = pakage.pakage_s_exterior_price;
                            accc[2].price = pakage.pakage_s_both_price
                            setInterior(accc)
                        }else{
                            setPrice(pakage.pakage_four_price)
                            let accc = setarry;
                            accc[0].price = pakage.pakage_f_interior_price;
                            accc[1].price = pakage.pakage_f_exterior_price;
                            accc[2].price = pakage.pakage_f_both_price
                            setInterior(accc)
                        }
                        }} style={styles.sizebox}>
                        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        
                        <View style={styles.circle}>
                        {data.icon}
                        </View>
                        {data.type == size && (<Ionicons  name="check-circle" color="#fff" size={30}></Ionicons>)}
                        </View>
                       
                        <Text style={styles.type}>{data.label}</Text>
                        <Text style={styles.price}>{data.type == 'salon' ? smallbig:pricebig}{pakage.pakage_fourwheeler_additional == 'Y' ? '':i18n.t('dhs', { locale: lang })}</Text>
                    </Pressable>
                )
            })}
             {pakage.pakage_category_id == "3" && (
                    <View   style={styles.sizeboxGarage}>
                        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                        <Text style={{fontSize:hp('3%'),color:'#fff'}}>{i18n.t('price', { locale: lang })} - <Text style={{color:'#fff'}}>{pakage.pakage_four_price} {i18n.t('dhs', { locale: lang })}</Text></Text>
                        </View>
                    </View>
                )}
            </View>
            {pakage.pakage_fourwheeler_additional == 'Y' && (
                <View style={{flexDirection:'row',width:'100%',alignItems:'center',justifyContent:'center',marginTop:30}}>
            {setarry.map((data,i)=>{
                return(
                    <Pressable key={data.type} onPress={()=>{
                        setTypeSize(data.type)}} style={styles.ssizebox}>
                        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        
                        <View style={styles.scircle}>
                        {data.icon}
                        </View>
                        {data.type == typesize && (<Ionicons  name="check-circle" color="#fff" size={30}></Ionicons>)}
                        </View>
                       
                        <Text style={styles.type}>{data.type}</Text>
                        <Text style={styles.price}> {data.price} {i18n.t('dhs', { locale: lang })}</Text>
                    </Pressable>
                )
            })}
            </View>
            )}
            
            <View style={{width:'96%',alignSelf:'center'}}>
            <CustomButton press={setRouting} text={`book_now`}></CustomButton>
            </View>
           
        </View>
    )
}

export default BigSmall

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        paddingHorizontal:10,
        
        backgroundColor:colors.darkBlue
      },
      modalHead:{
        minHeight:hp('7%'),
        backgroundColor:colors.darkBlue,
        flexDirection:'row',
        width:'100%',
        alignItems:'center',
        paddingVertical:6,
        justifyContent:'space-between'
      },
      modalTitle:{
        color:'#fff',
        fontSize:25
      },
      sizebox:{
          flexDirection:'column',
          width:wp('43%'),
          height:hp('25%'),
          borderWidth:1,
          margin:10,
          borderColor:'#fff',
          borderRadius:5,
          padding:wp('2%'),
      },
      sizeboxGarage:{
        flexDirection:'row',
        width:wp('70%'),
        height:hp('15%'),
        borderWidth:1,
        margin:10,
        borderColor:'#fff',
        borderRadius:5,
        padding:wp('2%'),
    },
      ssizebox:{
        flexDirection:'column',
        width:wp('28%'),
        height:hp('20%'),
        borderWidth:1,
        margin:10,
        borderColor:'#fff',
        borderRadius:5,
        padding:wp('2%'),
      },
      scircle:{
        backgroundColor:'#1555c4',
        width:wp('15%'),
        height:wp('15%'),
        borderRadius:wp('18%'),
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
      },
      circle:{
          backgroundColor:'#1555c4',
          width:wp('20%'),
          height:wp('20%'),
          borderRadius:wp('18%'),
          flexDirection:'row',
          alignItems:'center',
          justifyContent:'center'

      },
      type:{
          color:'#fff',
          fontSize:hp('2.2%'),
          marginTop:hp('3%')
      },
      price:{
        color:'#fff',
        fontSize:hp('2.2%'),
      },
      desp:{
        color:'#fff',
        fontSize:hp('2.2%'),
        marginLeft:5
        
      }
})
