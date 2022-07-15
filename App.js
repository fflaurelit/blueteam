import React from 'react';
import {Text,SafeAreaView,Platform} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import {AppProvider} from './src/context/AppContext';
import { MFWebView, MFSettings, MFTheme,MFCountry,MFEnvironment } from 'myfatoorah-reactnative';

const App = () => {
  React.useEffect(() => {
    let token = "EAsE69oBSq91cFRXAkIV2L1V-V3Q-MsXjB1ik70h6KEObid3LbNGnVum_GJoaEn_913hMtnAVixQfLScqLblqynW8suhTUFx0irGUjM_T7_8H90x4HB2wu2flcjEdAWzz_Iq6cf8nwqz4PIyjFt_JREFU_-IpsbQqVlJG0hw51hkc1Iz1glI3wfFWCWpPQRo05KQuRh7rouqAhdkSM9xufVvSjnHsEoLINLNxJwuWaNL_3ZA4EENEozF-Ft7vPKmCBe_WLIkhE_8gpk6AXPl_8YkuS0-7ZWWiXgpFo3SL0Ih01JJ8aPcPgq49cI9mFYjC7VOkakUkYe56evYIwejyZbVVzoueNbpzheZjX_QvswfG60xOivplMFKVbVN5OAw9bZlK_hQBYPPt0_XfTa1B_Yc8AhVtYqP7s6054AcP9KuxIboAsTbdj_zQgNZwC474LIjxHLc8jywcv6-xs5AR1O65Aj0GEPdHXnOzhM-VAfsMjNnUar42WU8GpwUkb52ahbKGw8iXmD34yS6QdTJTRDoY9GuRB_nOmHkXOOEMUI8hdf36HMpiGpBzbXOqOCLZpoQD1GzaozhpIxzCxChrfWnDJxPoU3iA3sBXHIF0uh_bjEIPqKV1B3uwRJjOYtblJ4jX3JIGPhVMW4lg2IeA5rLmsf05RVi3nl3Xr5wtDiWeOwW";
    let theme = new MFTheme('blue', 'gray', 'Payment', 'Cancel')
    MFSettings.sharedInstance.setTheme(theme)
    MFSettings.sharedInstance.configure(token, MFCountry.UNITEDARABEMIRATES, MFEnvironment.LIVE)
  
  }, [])
  return (<AppProvider><SafeAreaView style={{flex:1,backgroundColor:'#fff'}}><AppNavigator /></SafeAreaView></AppProvider>);
};
  
export default App; 