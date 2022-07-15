import React, {useState} from 'react';

const AppContext = React.createContext();

const AppProvider = ({children}) => {
const [userId, setUserId] = useState(true)
const [user, setUser] = useState({}) 
const [clientId, setClientId] = useState('')
const [location, setLocation] = useState({})
const [bookdata, setBookingData] = useState({
  email: "",
  address: "",
  phone: "", 
  name: "",
  prefered_date: '',
  prefered_time: "",
  note: "",
  car_type: "",
  price: "",
  payment_status: "0",
  service_status: "0",
  user_id: "",
  pakage_id: "",
  service_type_id: "",
  additional_service: [],
  booking_from: "user_app",
  assigned_to: "6",
  lat: 0,
  lon: 0,
  done_by: "User_App",
  sort_date: "",
  ifavai: "",
  payment_mode: "",
  is_card: "",
  is_card_normal: "",
  main_id:""
})
const [lang, setLang] = useState('en')
  return (
    <AppContext.Provider
      value={{lang,setLang,userId,setUserId,user,setUser,location, setLocation,setClientId,clientId,bookdata,setBookingData }}>
      {children}
    </AppContext.Provider>
  ); 
}; 

export {AppProvider, AppContext as default};
