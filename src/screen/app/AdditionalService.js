import React,{useEffect,useState,useContext} from 'react'
import { StyleSheet, Text, View,Image,TouchableOpacity,ActivityIndicator, ScrollView,FlatList,Alert } from 'react-native'
import SelectMultiple from 'react-native-select-multiple'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import LightBlueHead from '../../components/LightBlueHead';
import CustomButton from '../../components/CustomButton';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import api from '../../constant/ApiCall'
import AppContext from '../../context/AppContext'

import i18n from '../../i18n' 
 import ION from 'react-native-vector-icons/Ionicons'
 import FAT from 'react-native-vector-icons/Fontisto'
const AdditionalService = ({route,navigation}) => {
    const [selectedFruits, setselectedFruits ] = React.useState([])
    const {setBookingData,bookdata,lang} = useContext(AppContext)
  const [loader, setLoading] = useState(false)
    const {price} = route.params;
    const {pakageid} = route.params;
    const {cartype} = route.params;
    const [total, setPrice] = useState('')
    const [fruits, setAdditional] = useState([])
    const [extradata, setExtraData] = useState(false)
    useEffect(() => {
      setPrice(price)
      getPakagae()
    }, [])
    const getPakagae = () =>{
      setLoading(true)
      api.post('/api.php?action=getAdditionalitems', {
        id: pakageid,
      })
      .then(response => {if(response.status == 200){
        let dat = response.data.data
        let addArry = []
        if (cartype == "salon") {
          dat.forEach((element) => {
            if (element.add_price == "") {
              let name = lang == 'en' ? element.add_name : element.add_name_arabic
              addArry.push({price:element.add_price_small,checked:false,desp:element.add_desp_arabic,id:element.add_id,label:name+' - '+element.add_price_small,value:element.add_name+' - '+element.add_price_small})
            } else {
              let name = lang == 'en' ? element.add_name : element.add_name_arabic
              addArry.push({price:element.add_price,checked:false,desp:element.add_desp_arabic,id:element.add_id,label:name+' - '+element.add_price,value:element.add_name+' - '+element.add_price})
            }
            
          });
        }else{
          dat.forEach(element => {
            let name = lang == 'en' ? element.add_name : element.add_name_arabic
            if (element.add_price == "") {
              addArry.push({id:element.add_id,price:element.add_price_big,checked:false,label:name+' - '+element.add_price_big,value:element.add_name+' - '+element.add_price_big})
            } else {
              addArry.push({id:element.add_id,price:element.add_price,checked:false,label:name+' - '+element.add_price,value:element.add_name+' - '+element.add_price})
            }
            
          });
        }
        
        setAdditional(addArry)
      }})
      .then().finally(()=>{
        setLoading(false)
    })
    }
    const onRoute = ()=>{
      
      let addArry = [];
      let bookj = bookdata;
      let allprice = parseInt(price);
      fruits.forEach(element => {
          if(element.checked == true){
            allprice = allprice + parseInt(element.price)
            addArry.push({add_name:element.label,add_price:price})
          }
      });
      if(allprice == 0){
        bookj.price = price
      }else{
        bookj.price = allprice
      }
      bookj.additional_service = addArry
      setBookingData(bookj)
      navigation.navigate('ContactDetail')
    }
    const onSkip = () =>{
      let bookj = bookdata;
      bookj.price = price
      let addArry = [];
      bookj.additional_service = addArry
      setBookingData(bookj)
      navigation.navigate('ContactDetail')
    }
    const calculate = (items) =>{
      console.log(items)
      let final = parseInt(price)
      let arr= []
      items.forEach(element => {
        arr = element.value.split("-");
        final = parseInt(arr[1]) + final;
      });
      setPrice(final)
    }
    const checking = (id,checked) =>{
      let daar = fruits
      console.log(daar)
      console.log(id)
      let final = parseInt(price);
      daar.forEach(element => {
        if(element.id == id){
            element.checked = !element.checked
            // if(checked == true){
            //   final = final - parseInt(element.price)
            // }else{
            //   final = final + parseInt(element.price)
            // }
        }
    });
    //setPrice(final)
    setAdditional(daar)
   
    setExtraData(!extradata)
    getPrice(daar)
  }
    const getPrice = (arr) =>{
      let final = parseInt(price);
      let normal = 0;
        arr.forEach(element => {
          if(element.checked == true){
            normal = normal + parseInt(element.price)
          }
      });
    final = final + normal;
    setPrice(final)
    }
    return ( 
      <View style={{flex:1,backgroundColor:'#fff'}}>
        <LightBlueHead press={()=>navigation.goBack()} text="additional_service"></LightBlueHead>
        <ScrollView>
        {loader == true && ( <ActivityIndicator size="small" color="#000"></ActivityIndicator>)}
        <View style={{marginTop:10}}>
           <FlatList
                data={fruits}
                renderItem={({item})=>(<TouchableOpacity onPress={()=>{
                    checking(item.id,item.checked)
                   }}  style={[styles.selectRow,{borderColor:item.checked == true ? 'blue' : '#000'}]}>
                     {item.checked == true ? (<ION name="checkbox-sharp" size={hp('2.5%')} color={'blue'}></ION>) : (<FAT name="checkbox-passive" size={hp('2.5%')} color={'black'}></FAT>)}
                       <Text style={[{fontSize:hp('2%'),color:item.checked == true ? 'blue' : '#000',textAlign:'right'}]}>{item.label}</Text>
                       <MaterialIcons onPress={()=>{
                         Alert.alert(item.desp)
                       }} size={30}   name="info-outline"></MaterialIcons>
                   </TouchableOpacity>)}
                keyExtractor={item => item.id}
                extraData={extradata}
            />
        </View>
          <View style={styles.totalStrip}>
              <Text style={styles.text}>{i18n.t('total', { locale: lang })}</Text>
              <Text style={styles.text}>{total} {i18n.t('dhs', { locale: lang })}</Text>
          </View>
          <View style={{flexDirection:'row'}}>
              <View style={styles.col}>
                  <CustomButton press={onRoute} is_pri={true} text="book_now"></CustomButton>
              </View>
              <View style={styles.col}>
                  <CustomButton press={onSkip} text="skip"></CustomButton>
              </View>
          </View>
        </ScrollView>
        
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
        height:hp('7%'),
        backgroundColor:'#dedede',
        justifyContent:'space-between',
        paddingHorizontal:10,
        alignItems:'center',
        marginTop:20
    },
    text:{
        fontSize:hp('2.5%')
    },
    selectRow:{
      minHeight:hp('7%'),
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-between',
      borderBottomWidth:1,
      width:'95%',
      alignSelf:'center'
}
})
