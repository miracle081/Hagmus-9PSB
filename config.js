import {
    API_KEY, AUTH_DOMAIN,
    PROJECT_ID, STORAGE_BUCKET,
    MESSAGING_SENDER_ID, APP_ID,
    CoingeckoAPIKey,
    VTPass_API_KEY, VTPass_Public_Key, VTPass_Secret_Key,
    BaseURL, BaseURL_Food,
} from "@env"

const apiKey = API_KEY
const authDomain = AUTH_DOMAIN
const projectId = PROJECT_ID
const storageBucket = STORAGE_BUCKET
const messagingSenderId = MESSAGING_SENDER_ID
const appId = APP_ID

export const firebaseConfig = {
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messagingSenderId,
    appId,
};

export const coingeckoAPIKey = CoingeckoAPIKey
export const VTPass = { apiKey: VTPass_API_KEY, publicKey: VTPass_Public_Key, secretKey: VTPass_Secret_Key }
export const baseURL = BaseURL
export const BaseURLFood = BaseURL_Food