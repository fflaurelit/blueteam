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
    
const Cpayment1 = ({navigation,route}) => {
    const [paymentMethods, setPaymentMethods] = useState(null)
    const [loading, setLoading] = useState(false)
    const {lang} = React.useContext(AppContext)
    const {amount,uid,mid,getamt,phone,addressn,email} = route.params;

     
   useEffect(() => {
        
    initiatePayments()
   }, [])
    function initiatePayments() {
        setLoading(true)
        let initiateRequest = new MFInitiatePayment(700, MFCurrencyISO.UAE_AED)
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
        let request = new MFExecutePaymentRequest(700, id);
                request.customerEmail = "a@b.com"; // must be email
                request.customerMobile = phone.substring(3);
                request.customerCivilId = "";
                let address = new MFCustomerAddress("",email,addressn.substring(0,10),addressn.substring(10,10), addressn.substring(20,10),"");
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
                        if (response.getError()) {
                            alert('Payment Failed')
                            navigation.navigate('Credit')
                }
                else {
                var bodyString = response.getBodyString();
                        var invoiceId = response.getInvoiceId();
                        var paymentStatusResponse = response.getBodyJson().Data;
                        
                        api.post('/api.php?action=addCredit', {
                            uid: uid,
                            mid:mid,
                            getamt:getamt,
                            tid:invoiceId
                        })
                        .then(response => {if(response.status == 200){
                            alert('Payment Successful. Credit is added to your account.')
                            navigation.navigate('Credit')
                               
                        }})
                        .then().finally(()=>{
                        setLoading(false)
                        })
                        
                }
                });
        }
  return (
    <>
    <View style={{height:50,backgroundColor:'#115ee2',flexDirection:'row',alignItems:'center',paddingHorizontal:10}}>
    {/* <AntDesign color="#fff" name={lang == 'en' ? "arrowleft" : 'arrowleft'} size={25}></AntDesign> */}
            <Text style={{color:'#fff',fontSize:18}}>Payment</Text>
    </View>
    <View style={{flex:1,backgroundColor:'#fff',justifyContent:'center',alignItems:'center'}}>
            <Text style={{color:'red',fontSize:18,marginVertical:20,textAlign:'center'}}>Do not press back button till {'\n'}we redirect you to payment page.</Text>
            {loading ==true && (<ActivityIndicator color="blue" size="large"></ActivityIndicator>)}
            
      
    </View>
    </>
  )
}

export default Cpayment1

const styles = StyleSheet.create({})