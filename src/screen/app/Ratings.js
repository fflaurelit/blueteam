import React,{useState,useContext} from 'react'
import { StyleSheet, Text, View ,TextInput} from 'react-native'
import StarRating from 'react-native-star-rating';
import api from '../../constant/ApiCall'
import CustomButton from '../../components/CustomButton';
import LightBlueHead from '../../components/LightBlueHead';
import Toast from 'react-native-simple-toast'
import i18n from '../../i18n'
import AppContext from '../../context/AppContext'

const Ratings = ({route,navigation}) => {
    const [starCount, onStarRatingPress] = useState(0)
    const [notes, setNotes] = useState('')
    const [loader, setLoading] = React.useState(false)
    const {id} = route.params; 
    const {user,lang} = useContext(AppContext)
    const insertratingsApp = () =>{
        setLoading(true) 
        api.post('/api.php?action=insertratingsApp', {
          id: id,
          star:starCount,
          note:notes
        })
        .then(response => {
        if(response.status == 200){
            if(response.data.status == "200"){
                Toast.show('Ratings added successfully.',Toast.LONG)
                navigation.goBack()

            }
          //console.log(response)
        }
        })
        .then().finally(()=>{
          setLoading(false)
        })
      }
    return (
        <View style={{flex:1,backgroundColor:'#fff'}}>
             <LightBlueHead press={()=>navigation.goBack()}  showback={true} text="rating"></LightBlueHead>
             <View style={{padding:20}}>
                 <Text style={{fontWeight:'bold',textAlign:'center',fontSize:18}}>{i18n.t('rate_text', { locale: lang })}</Text>
                <View style={{width:'90%',alignSelf:'center',marginVertical:20}}>
                    <StarRating
                        disabled={false}
                        maxStars={5}
                        rating={starCount}
                        selectedStar={(rating) => onStarRatingPress(rating)}
                        fullStarColor='#f39c12'
                    />
                </View>
                <TextInput
                    multiline
                    numberOfLines={5}
                    onChangeText={text => setNotes(text)}
                    style={{padding: 10,borderWidth:1,borderRadius:5,borderColor:'grey',marginVertical:20}}
                    editable
                    maxLength={40}
                />
                <CustomButton isloading={loader}  press={insertratingsApp} is_pri={true} text="submit"></CustomButton>
            </View>
        </View>
    )
}

export default Ratings

const styles = StyleSheet.create({})
