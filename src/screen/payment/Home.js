import { StyleSheet, Text, View,Image,TouchableOpacity,ActivityIndicator
} from 'react-native'
import React,{useState,useEffect} from 'react'
import {
    MFExecutePaymentRequest, 
    MFInitiatePayment,MFCurrencyISO,
    MFPaymentRequest,MFLanguage,
    MFCustomerAddress,MFMobileCountryCodeISO,MFCountry } from 'myfatoorah-reactnative';

    import AntDesign from 'react-native-vector-icons/AntDesign'
    import AppContext from '../../context/AppContext'
import api from '../../constant/ApiCall';
    
const App = ({navigation,route}) => {
    const [paymentMethods, setPaymentMethods] = useState(null) 
    const [loading, setLoading] = useState(false)
    const {lang} = React.useContext(AppContext)
    const {bookingArray} = route.params;

    
   useEffect(() => {
        
    initiatePayments()
   }, [])
    function initiatePayments() {
        setLoading(true)
        let initiateRequest = new MFInitiatePayment(parseInt(bookingArray.price), MFCurrencyISO.UAE_AED)
                MFPaymentRequest.sharedInstance.initiatePayment(initiateRequest, MFLanguage.ENGLISH, (response) => {
                if (response.getError()) {
                    alert('error: ' + response.getError().error);
                }
                else {
                     console.log(response.getPaymentMethods()[0].PaymentMethodId)
                    setPaymentMethods(response.getPaymentMethods())
                    executePayment(response.getPaymentMethods()[0].PaymentMethodId)
                }
                });
                setLoading(false)
        }
        
        function executeResquestJson(id) {
                setLoading(true)
        let request = new MFExecutePaymentRequest(parseInt(bookingArray.price), id);
                request.customerEmail = "a@b.com"; // must be email
                request.customerMobile = bookingArray.phone.substring(3);
                request.customerCivilId = "";
                let address = new MFCustomerAddress("",bookingArray.email,bookingArray.address.substring(0,10),bookingArray.address.substring(10,10), bookingArray.address.substring(20,10),"");
                request.customerAddress = address;
                request.customerReference = "";
                request.language = "en";
                request.mobileCountryCode = MFMobileCountryCodeISO.UAE;
                request.displayCurrencyIso = MFCurrencyISO.UAE_AED;
                return request;
        }
        
        function executePayment(id) {
        let request = executeResquestJson(id);

                MFPaymentRequest.sharedInstance.executePayment(navigation, request, MFLanguage.ENGLISH, (response) => {
                        setLoading(true)
                        console.log(response)
                        if (response.getError()) {
                                
                                navigation.navigate('Failed')
                // api.post('/api.php?action=deleteBookingIfFailed', {
                //         main_id: serv_id,
                //       })
                //       .then(response => {if(response.status == 200){
                //         navigation.navigate('Failed')
                        
                //       }})
                //       .then().finally(()=>{
                //         setLoading(false)
                //         navigation.navigate('Failed') 
                //       })
                }
                else {
                        var bodyString = response.getBodyString();
                        var invoiceId = response.getInvoiceId();
                        var paymentStatusResponse = response.getBodyJson().Data;
                        let finalArry = bookingArray
                        finalArry.transaction_id = invoiceId
                        finalArry.payment_status = '3'
                        console.log(finalArry)
                        api.post('/api.php?action=dobooking',finalArry)
                        .then(response => {
                                if(response.data.status == 200){
                                        navigation.navigate('ThankYou',{
                                                booking_id:response.data.data.service_id,
                                                date:response.data.data.prefered_date,
                                                time:response.data.data.time_zone,
                                                phone:response.data.data.phone
                                        })
                        
                                }else if(response.data.status == '500'){
                                        Toast.show('Insufficient Balance',Toast.LONG)
                                }else{
                                        navigation.navigate('Bookingfailed')
                                        Toast.show('Booking Failed! Try Again Later',Toast.LONG)
                                }
                        })
                        .then().finally(()=>{
                        setLoading(false)
                        })
                        
                        
                }
                });
        }
  return (
    <>
    <View style={{height:50,backgroundColor:'#115ee2',flexDirection:'row',alignItems:'center',paddingHorizontal:10}}>
    <AntDesign color="#fff" name={lang == 'en' ? "arrowleft" : 'arrowleft'} size={25}></AntDesign>
            <Text style={{color:'#fff',fontSize:18}}>Payment Methods</Text>
    </View>
    <View style={{flex:1,backgroundColor:'#fff',justifyContent:'center',alignItems:'center'}}>
            <Text style={{color:'red',fontSize:18,marginVertical:20,textAlign:'center'}}>Booking will be cancelled if {'\n'}payment failed.</Text>
            {loading ==true && (<ActivityIndicator color="blue" size="large"></ActivityIndicator>)}
            {/* {paymentMethods ? (<View>
                { paymentMethods.map(res=>(<TouchableOpacity onPress={()=>{executePayment(res.PaymentMethodId)}}>
              <Image style={{width:100,height:100,resizeMode:'contain'}} source={{uri:res.ImageUrl}}></Image>
              <Text>{res.PaymentMethodEn}</Text>
      </TouchableOpacity>))}
                    </View>) : (<ActivityIndicator color="blue" size="large"></ActivityIndicator>)} */}
      
    </View>
    </>
  )
}

export default App

const styles = StyleSheet.create({})