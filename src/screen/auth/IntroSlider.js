
import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import CustomButton from '../../components/CustomButton';

const data = [
  {
    title: 'Car Wash',
    desp:'Enjoy High Quality Car Wash Delivered To Your Doorstep With The First Mobile Car Serves Provider In Abu Dhabi.\n\nWe Are Using The Best American Materials From The Mcguire Company And Others For Polishing,we Also Use The Best American Heat Insulator That Reaches Up To 99% Heat Res',
    image: require('../../assets/Design.png'),
    bg: '#fff',
    img2:require('../../assets/WT2.png'),
  },
  {
    title: 'Car Maintenance',
    desp:'With Blueteam Car Maintenance , Exchange Tires And Brake Pads And Do You Regular Car Checkup Your Doorstep Using Original Spare Parts',
    image: require('../../assets/Design.png'),
    img2:require('../../assets/WT1.png'),
    bg: '#fff',
  },
 
];
const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: 'center'
  },
  image: {
    width: '100%',
    height:hp('60%'),
    resizeMode:'cover',
    marginTop:hp('-10%')
  },
  image2:{
    width:wp('60%'),
    height:hp('30%'),
    resizeMode:'contain',
    position:'absolute',
    top:hp('10%')
  },
  title: {
    fontSize: 22,
    color: 'black',
    textAlign: 'center',
    marginTop:hp('3%')
  },
  desp:{
    fontSize: 15,
    color: 'grey',
    textAlign: 'center', 
    marginHorizontal:20,
    marginTop:hp('1%')
  }
});
const IntroSlider = ({navigation}) => {
    const _keyExtractor = (item) => item.title;
      const _renderItem = ({item}) => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: item.bg,
        }}>
        <SafeAreaView style={styles.slide}>
          
          <Image source={item.image} style={styles.image} />
          <Image source={item.img2} style={styles.image2} />
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.desp}>{item.desp}</Text>
        </SafeAreaView>
      </View>
    );
  };

    return (
            <View style={{flex: 1}}>
        <StatusBar translucent backgroundColor="transparent" />
        <AppIntroSlider
        keyExtractor={_keyExtractor}
            activeDotStyle={{backgroundColor:'#3880ff'}}
          renderItem={_renderItem}
          onDone={()=>{
            navigation.navigate('SelectLogin')
          }}
          bottomButton
          renderNextButton={()=>(<CustomButton is_pri={true} text="next"></CustomButton>)}
          renderSkipButton={()=>(<CustomButton is_pri={false} text="skip"></CustomButton>)}
          renderDoneButton={()=>(<CustomButton is_pri={false} text="skip"></CustomButton>)}
          showSkipButton
          showNextButton

          data={data}
        />
      </View>
    )
}

export default IntroSlider



// import React from 'react';
// import {
//   View,
//   Text,
//   Image,
//   StyleSheet,
//   StatusBar,
//   SafeAreaView,
// } from 'react-native';
// import AppIntroSlider from 'react-native-app-intro-slider';

// const data = [
//   {
//     title: 'Title 1',
//     image: require('../../assets/Design.png'),
//     bg: '#59b2ab',
//   },
//   {
//     title: 'Title 2',
//     image: require('../../assets/Design.png'),
//     bg: '#febe29',
//   },
//   {
//     title: 'Rocket guy',
//     image: require('../../assets/Design.png'),
//     bg: '#22bcb5',
//   },
// ];


// const styles = StyleSheet.create({
//   slide: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingBottom: 96, // Add padding to offset large buttons and pagination in bottom of page
//   },
//   image: {
//     width: 320,
//     height: 320,
//     marginTop: 32,
//   },
//   title: {
//     fontSize: 22,
//     color: 'white',
//     textAlign: 'center',
//   },
// });

// export default class App extends React.Component {
//   _renderItem = ({item}) => {
//     return (
//       <View
//         style={{
//           flex: 1,
//           backgroundColor: item.bg,
//         }}>
//         <SafeAreaView style={styles.slide}>
//           <Text style={styles.title}>{item.title}</Text>
//           <Image source={item.image} style={styles.image} />
//         </SafeAreaView>
//       </View>
//     );
//   };

//   _keyExtractor = (item) => item.title;

//   render() {
//     return (
//       <View style={{flex: 1}}>
//         <StatusBar translucent backgroundColor="transparent" />
//         <AppIntroSlider
//           keyExtractor={this._keyExtractor}
//           renderItem={this._renderItem}
//           bottomButton
//           showSkipButton
//           showPrevButton
//           data={data}
//         />
//       </View>
//     );
//   }
// }