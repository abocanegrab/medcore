import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import enCommon from './locales/en/common.json'
import enNav from './locales/en/nav.json'
import enDashboard from './locales/en/dashboard.json'
import enAdmision from './locales/en/admision.json'
import enTriaje from './locales/en/triaje.json'
import enConsultation from './locales/en/consultation.json'
import enFarmacia from './locales/en/farmacia.json'
import enLogin from './locales/en/login.json'
import enUi from './locales/en/ui.json'
import enAppointments from './locales/en/appointments.json'

import esCommon from './locales/es/common.json'
import esNav from './locales/es/nav.json'
import esDashboard from './locales/es/dashboard.json'
import esAdmision from './locales/es/admision.json'
import esTriaje from './locales/es/triaje.json'
import esConsultation from './locales/es/consultation.json'
import esFarmacia from './locales/es/farmacia.json'
import esLogin from './locales/es/login.json'
import esUi from './locales/es/ui.json'
import esAppointments from './locales/es/appointments.json'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        common: enCommon,
        nav: enNav,
        dashboard: enDashboard,
        admision: enAdmision,
        triaje: enTriaje,
        consultation: enConsultation,
        farmacia: enFarmacia,
        login: enLogin,
        ui: enUi,
        appointments: enAppointments,
      },
      es: {
        common: esCommon,
        nav: esNav,
        dashboard: esDashboard,
        admision: esAdmision,
        triaje: esTriaje,
        consultation: esConsultation,
        farmacia: esFarmacia,
        login: esLogin,
        ui: esUi,
        appointments: esAppointments,
      },
    },
    fallbackLng: 'en',
    ns: ['common', 'nav', 'dashboard', 'admision', 'triaje', 'consultation', 'farmacia', 'login', 'ui', 'appointments'],
    defaultNS: 'common',
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'medcore_language',
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
