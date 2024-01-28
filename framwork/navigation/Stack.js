import { useEffect, useState, useContext, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from 'expo-splash-screen';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AppContext } from "../../globals/AppContext";

// =========== Screens =========== //
import { LandingPage } from "../screens/LandingPage";
import { HomePage } from "../screens/HomePage";
import { Login } from "../screens/Login";
import { Username } from "../screens/Username";
import { ForgotPassword } from "../screens/ForgotPassword";
import { Signup } from "../screens/Signup";
import { Verification } from "../screens/Verification";
import { VerifyAccount } from "../screens/VerifyAcccount";
import { IdVerification } from "../screens/IdVerification";
import { ProfileImageUpload } from "../screens/ProfileImageUpload";
import { VerifyStatus } from "../screens/VerifyStatus";
import { Wallets } from "../screens/Wallets";
import { ConfirmTrans } from "../screens/ConfirmTrans";
import { Successful } from "../screens/Successful";
import { Settings } from "../screens/Settings";
import { Kyc } from "../screens/Kyc";
import { ProfileSettings } from "../screens/ProfileSettings";
import { Notification } from "../screens/Notification";
import { WithdrawalMethod } from "../screens/WithdrawalMethod";
import { BankDetails } from "../screens/BankDetails";
import { AboutUs } from "../screens/AboutUs";
import { HelpSupport } from "../screens/HelpSupport";
import { HagmusTransfer } from "../screens/HagmusTransfer";
import { History } from "../screens/Histrory";
import { HagmusTfHistory } from "../screens/HagmusTfHistory";
import { TransferDetails } from "../screens/TransferDetails";
import { HistoryDetails } from "../screens/HistoryDetails";
import { TradeSuccessful } from "../screens/TradeSuccessful";
import { Faq } from "../screens/Faq";
import { Earn } from "../screens/Earn";
import { LeaveMsg } from "../screens/LeaveMsg";
import { Referral } from "../screens/Referral";
import { PasswordReset } from "../screens/PasswordReset";
import { HagmusPay } from "../screens/HagmusPay";
import { BankTransfer } from "../screens/BankTransfer";
import { BorderTransfer } from "../screens/BorderTransfer";
import { Airtime } from "../screens/Airtime";
import { Data } from "../screens/Data";
import { Tv } from "../screens/Tv";
import { Electricity } from "../screens/Electricity";
import { DeleteAcct } from "../screens/DeleteAcct";
import { BvnVerify } from "../screens/BvnVerify";
import { Invite } from "../screens/Invite";
import { SetPin } from "../screens/SetPin";
import { ChangePin } from "../screens/ChangePin";
import { Web } from "../screens/Web";
import { LoginOtp } from "../screens/LoginOtp";
import { ForgottenPin } from "../screens/ForgottenPin";
import { CashbackHistory } from "../screens/CashbackHistory";
import { CardIntro } from "../screens/CardIntro";
import { DollarCards } from "../screens/DollarCards";
import { ViewCard } from "../screens/Dollarcard/ViewCard";
import { CardDetails } from "../screens/Dollarcard/CardDetails";
import { CardInfo } from "../screens/Dollarcard/CardInfo";
import { MyDollarCard } from "../screens/Dollarcard/MyDollarCard";
import { FundDollarCard } from "../screens/Dollarcard/FundDollarCard";
import { CardSettings } from "../screens/Dollarcard/CardSettings";
import { NinVerification } from "../screens/NinVerification";
import { UserAddress } from "../screens/UserAddress";

const Stack = createNativeStackNavigator();

export function StackNavigator() {
    const { setPreloader, userInfo, setUserInfo } = useContext(AppContext);
    const [onLoadEnd, setOnLoadEnd] = useState(false);

    useEffect(() => {
        setPreloader(true)
        const getData = async () => {
            try {
                const value = await AsyncStorage.getItem('userInfo')
                if (value !== null) {
                    setUserInfo(value);
                }
                setTimeout(() => {
                    setPreloader(false)
                    setOnLoadEnd(true)
                }, 1000);
            } catch (e) {
                setPreloader(false)
                setOnLoadEnd(true)
            }
        }
        getData();
    }, [onLoadEnd]);
    useCallback(async () => {
        if (onLoadEnd) {
            await SplashScreen.hideAsync();
        }
    }, [onLoadEnd]);
    if (!onLoadEnd) {
        return null;
    }

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}
            initialRouteName={userInfo == "" ? "LandingPage" : "Login"}
        // initialRouteName="HomePage"
        >
            <Stack.Screen name='LandingPage' component={LandingPage} />
            <Stack.Screen name='Login' component={Login} />
            <Stack.Screen name='Username' component={Username} />
            <Stack.Screen name='ForgotPassword' component={ForgotPassword} />
            <Stack.Screen name='HomePage' component={HomePage} />
            <Stack.Screen name='Signup' component={Signup} />
            <Stack.Screen name='Verification' component={Verification} />
            <Stack.Screen name='VerifyAccount' component={VerifyAccount} />
            <Stack.Screen name='IdVerification' component={IdVerification} />
            <Stack.Screen name='ProfileImageUpload' component={ProfileImageUpload} />
            <Stack.Screen name='VerifyStatus' component={VerifyStatus} />
            <Stack.Screen name='Wallets' component={Wallets} />
            <Stack.Screen name='ConfirmTrans' component={ConfirmTrans} />
            <Stack.Screen name='Successful' component={Successful} />
            <Stack.Screen name='Settings' component={Settings} />
            <Stack.Screen name='Kyc' component={Kyc} />
            <Stack.Screen name='ProfileSettings' component={ProfileSettings} />
            <Stack.Screen name='Notification' component={Notification} />
            <Stack.Screen name='WithdrawalMethod' component={WithdrawalMethod} />
            <Stack.Screen name='BankDetails' component={BankDetails} />
            <Stack.Screen name='AboutUs' component={AboutUs} />
            <Stack.Screen name='HelpSupport' component={HelpSupport} />
            <Stack.Screen name='HagmusTransfer' component={HagmusTransfer} />
            <Stack.Screen name='History' component={History} />
            <Stack.Screen name='HagmusTfHistory' component={HagmusTfHistory} />
            <Stack.Screen name='HagmusPay' component={HagmusPay} />
            <Stack.Screen name='BorderTransfer' component={BorderTransfer} />
            <Stack.Screen name='BankTransfer' component={BankTransfer} />
            <Stack.Screen name='Airtime' component={Airtime} />
            <Stack.Screen name='Data' component={Data} />
            <Stack.Screen name='Tv' component={Tv} />
            <Stack.Screen name='Electricity' component={Electricity} />
            <Stack.Screen name='DeleteAcct' component={DeleteAcct} />
            <Stack.Screen name='BvnVerify' component={BvnVerify} />
            <Stack.Screen name='Invite' component={Invite} />
            <Stack.Screen name='SetPin' component={SetPin} />
            <Stack.Screen name='ChangePin' component={ChangePin} />
            <Stack.Screen name='TransferDetails' component={TransferDetails} />
            <Stack.Screen name='HistoryDetails' component={HistoryDetails} />
            <Stack.Screen name='TradeSuccessful' component={TradeSuccessful} />
            <Stack.Screen name='Faq' component={Faq} />
            <Stack.Screen name='Earn' component={Earn} />
            <Stack.Screen name='LeaveMsg' component={LeaveMsg} />
            <Stack.Screen name='Referral' component={Referral} />
            <Stack.Screen name='PasswordReset' component={PasswordReset} />
            <Stack.Screen name='Web' component={Web} />
            <Stack.Screen name='LoginOtp' component={LoginOtp} />
            <Stack.Screen name='ForgottenPin' component={ForgottenPin} />
            <Stack.Screen name='CashbackHistory' component={CashbackHistory} />
            <Stack.Screen name='CardIntro' component={CardIntro} />
            <Stack.Screen name='DollarCards' component={DollarCards} />
            <Stack.Screen name='MyDollarCard' component={MyDollarCard} />
            <Stack.Screen name='FundDollarCard' component={FundDollarCard} />
            <Stack.Screen name='ViewCard' component={ViewCard} />
            <Stack.Screen name='CardDetails' component={CardDetails} />
            <Stack.Screen name='CardInfo' component={CardInfo} />
            <Stack.Screen name='CardSettings' component={CardSettings} />
            <Stack.Screen name='NinVerification' component={NinVerification} />
            <Stack.Screen name='UserAddress' component={UserAddress} />
        </Stack.Navigator>
    )
}