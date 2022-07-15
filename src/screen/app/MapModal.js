
import React,{useState,useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image
} from 'react-native';

import MapView, { MAP_TYPES, ProviderPropType,Marker } from 'react-native-maps';
import NotificationHeader from '../../components/NotificationHeader';
import Geocoder from 'react-native-geocoding';
import CustomButton from '../../components/CustomButton';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height; 
const LATITUDE = 37.78825; 
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const MapModal = ({lattitude,longiude,onConfirm,closeModal}) => {
    useEffect(() => {
        Geocoder.init("AIzaSyA8IUpnIqpTdXaDn7NTkN1k2CU3Hh8T8Ck"); 
        decodeAddress(lattitude,longiude)
    }, [])
    const [address, setAddress] = useState('')
    const [region, setRegion] = useState({
                latitude: lattitude,
                longitude: longiude,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
    })
    const onRegionChange = (region) => {
        setRegion(region);
        decodeAddress(region.latitude,region.longitude)
    }
    const decodeAddress = (lat,long) =>{
        Geocoder.from(lat, long)
        .then(json => {
          var addressComponent = json.results[0].formatted_address;
          setAddress(addressComponent)
        })
        .catch(error => console.warn(error));
    }
    return (
        <View style={styles.container}>
          <MapView 
            style={styles.map}
            initialRegion={region}
            onRegionChangeComplete={(region,gesture) => {
                if(gesture.isGesture){
                  onRegionChange(region) 
                }
            }}
            zoomEnabled={true}
            zoomControlEnabled
            animateToCoordinate
          >  
          </MapView>
          <View style={styles.markerFixed}>
            <Image style={styles.marker} source={require('../../assets/pin.png')} />
          </View>
          <View style={styles.adddressBox}>
              <Text style={{textAlign:'center',color:'#fff'}}>{address}</Text>
          </View>
          <View style={{flexDirection:'row',width:'90%',position:'absolute'}}>
              <View style={styles.col}>
                  <CustomButton press={()=>{onConfirm({lat:region.latitude,lon:region.longitude,add:address})}} is_pri={true} text={`continue`}></CustomButton>
              </View>
              <View style={styles.col}>
                  <CustomButton press={()=>{closeModal()}} is_pri={false} text={`cancel`}></CustomButton>
              </View>
          </View>
      </View>
    )
}

export default MapModal

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    width:'100%',
    height:'100%'
  },
  bubble: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  latlng: {
    width: 200,
    alignItems: 'stretch',
  },
  button: {
    width: 100,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
  buttonText: {
    textAlign: 'center',
  },
  centeredText: { textAlign: 'center' },
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
  adddressBox:{
      width:'100%',
      minHeight:50,
      backgroundColor:'#115ee2',
      position:'absolute',
      top:0,
      paddingHorizontal:10,
      justifyContent:'center'
  },
  col:{
    flexDirection:'column',
    paddingHorizontal:10,
    width:'40%',
    alignItems:'center'
}, 
});


// import React from 'react';
// import {
//   StyleSheet,
//   View,
//   Text,
//   Dimensions,
//   TouchableOpacity,
//   Image
// } from 'react-native';

// import MapView, { MAP_TYPES, ProviderPropType,Marker } from 'react-native-maps';

// const { width, height } = Dimensions.get('window');

// const ASPECT_RATIO = width / height; 
// const LATITUDE = 37.78825; 
// const LONGITUDE = -122.4324;
// const LATITUDE_DELTA = 0.0922;
// const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

// class DisplayLatLng extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       region: {
//         latitude: LATITUDE,
//         longitude: LONGITUDE,
//         latitudeDelta: LATITUDE_DELTA,
//         longitudeDelta: LONGITUDE_DELTA,
//       },
//     };
//   }

//   onRegionChange(region) {
//     this.setState({ region });
//   }



//   randomCoordinate() {
//     const region = this.state.region;
//     return {
//       latitude:
//         region.latitude + (Math.random() - 0.5) * (region.latitudeDelta / 2),
//       longitude:
//         region.longitude + (Math.random() - 0.5) * (region.longitudeDelta / 2),
//     };
//   }

 

//   render() {
//     return (
//       <View style={styles.container}>
//         <MapView
//           provider={this.props.provider}
//           ref={ref => {
//             this.map = ref;
//           }} 
         
//           style={styles.map}
//           initialRegion={this.state.region}
//           onRegionChange={region => this.onRegionChange(region)}
//         >
           
//           </MapView>
//           <View style={styles.markerFixed}>
//           <Image style={styles.marker} source={require('../../assets/pin.png')} />
//         </View>
        
       
//       </View>
//     );
//   }
// }

// DisplayLatLng.propTypes = {
//   provider: ProviderPropType,
// };

// const styles = StyleSheet.create({
//   container: {
//     ...StyleSheet.absoluteFillObject,
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//   },
//   map: {
//     ...StyleSheet.absoluteFillObject,
//   },
//   bubble: {
//     backgroundColor: 'rgba(255,255,255,0.7)',
//     paddingHorizontal: 18,
//     paddingVertical: 12,
//     borderRadius: 20,
//   },
//   latlng: {
//     width: 200,
//     alignItems: 'stretch',
//   },
//   button: {
//     width: 100,
//     paddingHorizontal: 8,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginHorizontal: 5,
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     marginVertical: 20,
//     backgroundColor: 'transparent',
//   },
//   buttonText: {
//     textAlign: 'center',
//   },
//   centeredText: { textAlign: 'center' },
//   markerFixed: {
//     left: '50%',
//     marginLeft: -24,
//     marginTop: -48,
//     position: 'absolute',
//     top: '50%'
//   },
//   marker: {
//     height: 48,
//     width: 48
//   },
// });

// export default DisplayLatLng;