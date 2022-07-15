import React,{useContext,useEffect} from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AppContext from '../context/AppContext'
import i18n from '../i18n'

const CustomInput = ({placeholder,icon}) => {
    const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);
    const {setBookingData,bookdata,lang} = useContext(AppContext)
    const [placeholfe, setplav] = React.useState('Prefered Date')
    useEffect(() => {
      var today = formatDate()
      setplav(today)
      let data = bookdata;
      data.prefered_date =  today;
      setBookingData(data)
    }, [])
    const formatDate = () => {
      var d = new Date(),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear();
  
      if (month.length < 2) 
          month = '0' + month;
      if (day.length < 2) 
          day = '0' + day;
  
      return [year, month, day].join('-');
  }
    const showDatePicker = () => {
        setDatePickerVisibility(true);
      };
    
      const hideDatePicker = () => {
        setDatePickerVisibility(false);
      };
    
      const handleConfirm = (date) => { 
        hideDatePicker();
        let actul = JSON.stringify(date)
       
        let data = bookdata;
        data.prefered_date =  actul.substring(1, 11)+"T14:37:00.116+05:30";
        setBookingData(data)
        setplav(actul.substring(1, 11))
       
      };
    return (
        <Pressable onPress={showDatePicker} style={{marginVertical:15,flexDirection:'row',height:50,borderBottomWidth:1,width:'90%',alignSelf:'center',alignItems:'center'}}>
            {icon}
            <Text style={{color:'grey',marginLeft:'4%'}}>{placeholfe == 'Prefered Date' ? i18n.t('prefered_date', { locale: lang }) : placeholfe}</Text>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                date={new Date()}
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
        </Pressable>
    )
}

export default CustomInput

const styles = StyleSheet.create({})
