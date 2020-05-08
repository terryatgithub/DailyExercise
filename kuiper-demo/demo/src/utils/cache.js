import Cookies from 'js-cookie'
import { LANGUAGE_KEY } from '@/constants'

export default {
    getLanguage: () => Cookies.get(LANGUAGE_KEY),
    setLanguage: language => Cookies.set(LANGUAGE_KEY, language),
    removeLanguage: () => Cookies.remove(LANGUAGE_KEY),

    setLocalStorage: (name, content) => window.localStorage.setItem(name, JSON.stringify(content)),
    getLocalStorage: name => JSON.parse(window.localStorage.getItem(name)),
    removeLocalStorage: name => window.localStorage.removeItem(name)
}

