import { createContext, useState } from "react";
import { baseURL } from "../config";
import { handleError } from "../framwork/components/HandleRequestError";
import { Alert } from "react-native";

const AppContext = createContext();

function AppProvider({ children }) {
     const [userUID, setUserUID] = useState('');
     const [preloader, setPreloader] = useState(false);
     const [earnBalance, setEarnBalance] = useState(0);
     const [profileImage, setProfileImage] = useState(require("../assets/person.png"));
     const [userInfo, setUserInfo] = useState({ username: '', first_name: "", last_name: "", name: "" });
     const [docID, setDocID] = useState('');
     const [ID, setID] = useState('');
     const [notification, setNotification] = useState([]);
     const [carouselLinks, setCarouselLinks] = useState([
          { uri: "https://wenethub.com/imageslink/bonus.png" },
          { uri: "https://wenethub.com/imageslink/refer.png" },
          // { uri: "https://wenethub.com/imageslink/bills.png" },
     ]);
     const [userCards, setUserCards] = useState([]);
     const [welcomeModal, setWelcomeModal] = useState(true);
     const [referralBonus, setReferralBonus] = useState(0);
     const [token, setToken] = useState("");
     const [pin, setPin] = useState("");
     const [cardId, setCardId] = useState("");
     const [account, setAccount] = useState({ email: "", password: "", });
     const [accountInfo, setAccountInfo] = useState({ account_balance: 0, account_name: "", account_number: "" });


     function getUserInfo() {
          setPreloader(true)
          const requestOptions = {
               method: 'GET',
               headers: {
                    authorization: `bearer ${token}`
               },
               redirect: 'follow'
          };
          fetch(`${baseURL}/api/user`, requestOptions)
               .then(response => response.json())
               .then(response => {
                    const { data, status, message } = response;
                    // console.log(data);
                    setPreloader(false)
                    if (status == "success") {
                         setUserInfo(data)
                    }
                    handleError(status, message);
               })
               .catch(error => {
                    setPreloader(false)
                    console.log('error', error)
               });
     }

     async function getAccountInfo() {
          setPreloader(true)
          let requestOptions = {
               method: 'GET',
               redirect: 'follow',
               headers: {
                    authorization: `bearer ${token}`
               }
          };

          fetch(baseURL + "/api/account", requestOptions)
               .then(response => response.json())
               .then(result => {
                    const { data, status, message } = result
                    // console.log(result);
                    if (status == "success") {
                         setAccountInfo(data)
                         setPreloader(false)
                    }
                    handleError(status, message);
               })
               .catch(error => {
                    setPreloader(false)
                    console.log('error', error)
                    Alert.alert("Error!", error.message)
               });
     }

     function getUserCards() {
          const requestOptions = {
               method: 'GET',
               redirect: 'follow',
               headers: {
                    authorization: `bearer ${token}`
               }
          };

          fetch(baseURL + "/api/cards/my-cards", requestOptions)
               .then(response => response.json())
               .then(result => {
                    const { data, status, message } = result
                    // console.log(result);
                    if (status == "success") {
                         setUserCards(data)
                         setPreloader(false)
                    }
                    handleError(status, message);
               })
               .catch(error => {
                    setPreloader(false)
                    console.log('error', error)
                    Alert.alert("Error!", error.message)
               });
     }

     return (
          <AppContext.Provider value={{
               ID, setID,
               pin, setPin,
               token, setToken,
               docID, setDocID,
               cardId, setCardId,
               account, setAccount,
               userUID, setUserUID,
               userInfo, setUserInfo,
               userCards, setUserCards,
               preloader, setPreloader,
               accountInfo, setAccountInfo,
               earnBalance, setEarnBalance,
               welcomeModal, setWelcomeModal,
               notification, setNotification,
               profileImage, setProfileImage,
               carouselLinks, setCarouselLinks,
               referralBonus, setReferralBonus,
               getUserInfo, getAccountInfo, getUserCards
          }}>
               {children}
          </AppContext.Provider>
     )
}

export { AppContext, AppProvider }