import React,{useContext,useState} from 'react'
import { StyleSheet, Text, View,Dimensions } from 'react-native'
import AppContext from '../../context/AppContext'
import MapView, { Marker, ProviderPropType } from 'react-native-maps';
import ANT from 'react-native-vector-icons/AntDesign'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Geocoder from 'react-native-geocoding';
const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height; 

const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const ShowMap = ({route,navigation}) => {
    const {bookdata,userId,user} = useContext(AppContext)
    const [address, setAddress] = useState('')
    const [region, setRegion] = useState({
      latitude: parseFloat(bookdata.lat),
      longitude: parseFloat(bookdata.lon),
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
})
    useEffect(() => {
        Geocoder.init("AIzaSyA8IUpnIqpTdXaDn7NTkN1k2CU3Hh8T8Ck"); // use a valid API key
    }, [])
    const decodeAddress = (lat,long) =>{
        Geocoder.from(lat, long)
		.then(json => {
        	var addressComponent = json.results[0].formatted_address;
            setAddress(addressComponent)

		})
		.catch(error => console.warn(error));
      }
      const onRegionChange = (region) =>{
       setRegion(region);
        decodeAddress(region.latitude,region.longitude)
    }
    return (
        <View style={styles.mapContainer}>
            <View style={{height:50,backgroundColor:'#115ee2',flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}>
                <ANT onPress={()=>{
                    navigation.goBack()
                }} name="close" size={30} style={{marginRight:20}} color="#fff"></ANT>
            </View>
            <MapView
              style={styles.mapView}
              initialRegion={region}

     
                  onRegionChange={(region,gesture) => {
                    if(gesture.isGesture){
                      onRegionChange(region)
                    }
                }}
            > 
                
            </MapView>
            <View style={styles.markerFixed}>
          <Image style={styles.marker} source={require('../../assets/pin.png')} />
        </View>
            </View>
    )
}
 
export default ShowMap

const styles = StyleSheet.create({
    mapContainer: {
        flex: 1,
        height: hp('100%'),
      },
      markerFixed: {
        left: '50%',
        marginLeft: -24,
        marginTop: -48,
        position: 'absolute',
        top: '50%'
      },
      marker: {
        height: 48,
        width: 48
      },
})
 