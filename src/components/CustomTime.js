import React,{useState,useContext} from 'react'
import { StyleSheet, Text, View,Pressable,Modal, ScrollView,Alert,ActivityIndicator } from 'react-native'
import ANT from 'react-native-vector-icons/Entypo'
import api from '../constant/ApiCall'
import AppContext from '../context/AppContext'
import ENT from 'react-native-vector-icons/AntDesign'
import i18n from '../i18n'

const CustomInput = ({placeholder,icon,security=false}) => {
    const {setBookingData,bookdata,lang} = useContext(AppContext)
    const [slots, setSlots] = useState([])
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const [label, setLabel] = useState('Prefered Time')
    const getPakagae = () =>{
        var today = new Date();
        setLoading(true)
    
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
    
        var yyyy = today.getFullYear();
        if (dd < 10) {
          dd = "0" + dd;
        }
        if (mm < 10) {
          mm = "0" + mm;
        }
        var ctoday = yyyy + '-' + mm +'-' + dd;
      
        if(bookdata.prefered_date.substring(0,10) == ctoday){
            
           var today = bookdata.prefered_date + "T14:37:00.116+05:30";
           
            api.post('/api.php?action=gettimeslot', { 
                id: bookdata.pakage_id,
                date: today,
              }) 
              .then(response => {if(response.status == 200){
                let timeSlots = response.data.data
                var dubaidate = new Date();
                var localTime = dubaidate.getTime();
                var localOffset = dubaidate.getTimezoneOffset() * 60000;
                var utc = localTime + localOffset;
                var offset = 4;    //UTC of Dubai is +04.00
                var dubai = utc + (3600000*offset); 
                  var d = new Date(dubai);
                  var hours = d.getHours() + 1;
                  var current = '';
                  if(hours.toString().length === 1 ){
                     current = '0'+hours+':'+d.getMinutes();
                  }else{
                     current = hours+':'+d.getMinutes();
                  }
                  timeSlots.forEach(element => {
                    if(current >= element.time_zone){
                      element.disabled = 'true'
                    }
                  });   
                  setSlots(timeSlots)
                  setModalVisible(true)
              }})
              .then()
              .finally(()=>{
                  setLoading(false)
              })
            
        
      }else{
        var today = bookdata.prefered_date + "T14:37:00.116+05:30";
           
        api.post('/api.php?action=gettimeslot', { 
            id: bookdata.pakage_id,
            date: today,
          })
          .then(response => {if(response.status == 200){
            let timeSlots = response.data.data
            setSlots(timeSlots)
            setModalVisible(true)
            // console.log(timeSlots)
          }})
          .then()
          .finally(()=>{
            setLoading(false)
        })
      
      }
    }
   
    return (
        <>
        <Pressable onPress={getPakagae} style={{marginVertical:15,flexDirection:'row',height:50,borderBottomWidth:1,width:'90%',alignSelf:'center',alignItems:'center',justifyContent:'space-between'}}>
           <View style={{flexDirection:'row',alignItems:'center'}}>
           {icon} 
            <Text style={{color:'grey',marginLeft:'8%'}}>{label == 'Prefered Time' ? i18n.t('prefered_time', { locale: lang }) : label}</Text>
           </View>
           {loading == true ? (<ActivityIndicator size="small" color="grey"></ActivityIndicator>) : (
               <ANT size={20} color="grey" name="chevron-small-down" ></ANT>
           )}
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
          <View style={{flexDirection:'row',justifyContent:'space-between'}}>
           <Text style={{fontWeight:'bold',fontSize:18,alignSelf:'center',marginVertical:10}}>Select Time Slot</Text>
           <ENT onPress={()=>{setModalVisible(false)}} name="close" color="#000" size={20}></ENT>
           </View>
            <Pressable
              style={[styles.button, styles.buttonClose]}
            >
            </Pressable>
           <ScrollView>
           {slots.map((data,i)=>{
               if(data.disabled == 'false'){
                return <Pressable onPress={()=>{
                   let dat = bookdata;
                   dat.prefered_time = data.id;
                   setBookingData(dat)
                   setLabel(data.time_zone)
                   setModalVisible(false)
                }} style={{height:30,marginVertical:5,borderBottomWidth:1,borderColor:'#dedede'}}>
                    <Text style={{color:data.disabled == 'true' ? '#ccc' : '#000',fontSize:14,}}>{data.time_zone}</Text>
                </Pressable>
               }
                
            })}
           </ScrollView>
          </View>
        </View>
      </Modal>
        </>
    )
}

export default CustomInput

const styles = StyleSheet.create({
    centeredView: {
       
     
        marginTop: 22,
        height:'50%'
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        
      },
})
