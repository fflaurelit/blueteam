import I18n from 'react-native-i18n'
import arabic from './locales/arabic'
import en from './locales/en'

I18n.fallbacks = true

I18n.translations = {
	en,
	arabic,
}
// I18n.locale = 'spanish';

export default I18n