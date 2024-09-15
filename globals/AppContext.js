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
     const [doc, setDoc] = useState('');
     const [ID, setID] = useState('');
     const [notification, setNotification] = useState([]);
     const [carouselLinks, setCarouselLinks] = useState([
          { uri: "https://wenethub.com/imageslink/referralB.png" },
          { uri: "https://wenethub.com/imageslink/NewCashB.png" },
     ]);
     const [userCards, setUserCards] = useState([]);
     const [savingsInfo, setSavingsInfo] = useState([]);
     const [targetName, setTargetName] = useState("");
     const [welcomeModal, setWelcomeModal] = useState(true);
     const [referralBonus, setReferralBonus] = useState(0);
     const [token, setToken] = useState("");
     const [tokenFood, setTokenFood] = useState("4|tgZ8Um6aU7slFLZIKWIlZ7txt9oCEDL3NNOySXke3e573393");
     const [pin, setPin] = useState("");
     const [cardId, setCardId] = useState("");
     const [account, setAccount] = useState({ email: "", password: "", });
     const [saysInfo, setSaysInfo] = useState({});
     const [accountInfo, setAccountInfo] = useState({ account_balance: 0, account_name: "", account_number: "" });
     const [expoPushToken, setExpoPushToken] = useState('');

     function getUserInfo() {
          setPreloader(true)
          const requestOptions = {
               method: 'GET',
               headers: {
                    authorization: `bearer ${token}`
               },
               redirect: 'follow'
          };
          fetch(`${baseURL}/user`, requestOptions)
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
                    if (error.message == "JSON Parse error: Unexpected character: <") Alert.alert("Error!", "Network error, please try again");
                    else Alert.alert("Error!", error.message)
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

          fetch(baseURL + "/account", requestOptions)
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
                    if (error.message == "JSON Parse error: Unexpected character: <") Alert.alert("Error!", "Network error, please try again");
                    else Alert.alert("Error!", error.message)
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

          fetch(baseURL + "/cards/my-cards", requestOptions)
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
                    if (error.message == "JSON Parse error: Unexpected character: <") Alert.alert("Error!", "Network error, please try again");
                    else if (error.message == "JSON Parse error: Unexpected character: <") Alert.alert("Error!", "Network error, please try again");
                    else Alert.alert("Error!", error.message)
               });
     }

     function sendNotification(title, body) {
          const message = {
               to: expoPushToken,
               sound: "default",
               title,
               body
          }
          fetch("https://exp.host/--/v2/push/send", {
               method: "POST",
               headers: {
                    host: "exp.host",
                    accept: "application/json",
                    "accept-encoding": "gzip, deflate",
                    "content-type": "application/json"
               },
               body: JSON.stringify(message),
          })
               .then((d) => console.log(title, body))
               .catch(e => console.log(e))
     }

     function getSavings() {
          setPreloader(true)
          const requestOptions = {
               method: 'GET',
               headers: {
                    authorization: `bearer ${token}`
               },
               redirect: 'follow'
          };
          fetch(`${baseURL}/savings/my-savings`, requestOptions)
               .then(response => response.json())
               .then(response => {
                    const { data, status, message } = response;
                    setPreloader(false)
                    if (status == "success") {
                         // const rinfo = data.find(all => all.name == "business")
                         // console.log(rinfo);
                         setSavingsInfo(data)
                    }
                    handleError(status, message);
               })
               .catch(error => {
                    setPreloader(false)
                    console.log(error);
                    if (error.message == "JSON Parse error: Unexpected character: <") Alert.alert("Error!", "Network error, please try again");
                    else if (error.message == "JSON Parse error: Unexpected character: <") Alert.alert("Error!", "Network error, please try again");
                    else Alert.alert("Error!", error.message)
               });
     }

     function getMySAYS() {
          setPreloader(true)
          const requestOptions = {
               method: 'GET',
               headers: {
                    authorization: `bearer ${token}`
               },
               redirect: 'follow'
          };
          fetch(`${baseURL}/says/my-says`, requestOptions)
               .then(response => response.json())
               .then(response => {
                    const { data, status, message } = response;
                    // console.log(data);
                    setPreloader(false)
                    if (status == "success") {
                         data.length > 0 ? setSaysInfo(data[0]) : setSaysInfo({})
                    }
                    handleError(status, message);
               })
               .catch(error => {
                    setPreloader(false)
                    console.log(error);
                    if (error.message == "JSON Parse error: Unexpected character: <") Alert.alert("Error!", "Network error, please try again");
                    else Alert.alert("Error!", error.message)

               });
     }

     return (
          <AppContext.Provider value={{
               ID, setID,
               doc, setDoc,
               pin, setPin,
               token, setToken,
               docID, setDocID,
               cardId, setCardId,
               account, setAccount,
               userUID, setUserUID,
               saysInfo, setSaysInfo,
               userInfo, setUserInfo,
               userCards, setUserCards,
               tokenFood, setTokenFood,
               preloader, setPreloader,
               targetName, setTargetName,
               accountInfo, setAccountInfo,
               earnBalance, setEarnBalance,
               savingsInfo, setSavingsInfo,
               welcomeModal, setWelcomeModal,
               notification, setNotification,
               profileImage, setProfileImage,
               carouselLinks, setCarouselLinks,
               referralBonus, setReferralBonus,
               expoPushToken, setExpoPushToken,
               getUserInfo, getAccountInfo, getUserCards,
               sendNotification,
               getSavings, getMySAYS
          }}>
               {children}
          </AppContext.Provider>
     )
}

export { AppContext, AppProvider }