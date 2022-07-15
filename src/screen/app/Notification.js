import React,{useEffect} from 'react'
import { StyleSheet, Text, View,FlatList ,ActivityIndicator} from 'react-native'
import LightBlueHead from '../../components/BlueHeader';
import Fontisto from 'react-native-vector-icons/Fontisto'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import api from '../../constant/ApiCall'

const Shop = ({navigation}) => {
    const [notiArry, setNotifca] = React.useState([])
    const [loader, setLoading] = React.useState(false)

  useEffect(() => {
    getNotification()
   
  }, [])
  const getNotification = () =>{
    setLoading(true)
    api.post('/api.php?action=getallnotificationUsers',{id:'20185'})
    .then(response => {if(response.status == 200){
        setNotifca(response.data.data)
    }})
    .then().finally(()=>{
      setLoading(false)
  })
  }
    return (
        <View style={{flex:1,backgroundColor:'#fff'}}>
            <LightBlueHead press={()=>navigation.goBack()}  showback={true} text="notification"></LightBlueHead>
            {loader == true && ( <ActivityIndicator size="small" color="#000"></ActivityIndicator>)}
            <FlatList
            showsVerticalScrollIndicator={false} 
              data={notiArry}
              renderItem={({item})=>(<View key={item.id} style={styles.notobox}>
                  <Text style={{textAlign:'left',color:'#3880ff',fontSize:hp('2%')}}>{item.title}</Text>
                  <Text style={{textAlign:'left'}}>{item.description}</Text>
              </View>)}
              keyExtractor={item => item.pakage_id}
            />
        </View>
    )
}

export default Shop

const styles = StyleSheet.create({
    notobox:{
        width:wp('95%'),
        height:hp('10%'),
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 2,
        backgroundColor: "white",
        marginVertical:10,
        alignSelf:'center',
        paddingHorizontal:10
    }
})
