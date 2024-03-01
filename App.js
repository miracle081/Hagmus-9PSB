import { NavigationContainer } from "@react-navigation/native";
import { AppProvider } from "./globals/AppContext";
import { StackNavigator } from "./framwork/navigation/Stack";
import { StatusBar } from "expo-status-bar";
import { LogBox } from "react-native";
import { Preloader } from "./framwork/components/Preloader";
import { useCallback, useContext, useEffect, useState } from "react";
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { OpenSans_400Regular, OpenSans_600SemiBold, OpenSans_700Bold } from "@expo-google-fonts/open-sans";
import { EBGaramond_400Regular, EBGaramond_600SemiBold, EBGaramond_700Bold } from "@expo-google-fonts/eb-garamond";
import { Kurale_400Regular } from "@expo-google-fonts/kurale";
import { Inter_400Regular, Inter_700Bold } from "@expo-google-fonts/inter";
import { Quicksand_400Regular, Quicksand_700Bold, Quicksand_600SemiBold } from "@expo-google-fonts/quicksand";
// import registerNNPushToken from 'native-notify';
import { RootSiblingParent } from 'react-native-root-siblings';
import { LeaveMsg } from "./framwork/screens/LeaveMsg";
import { PushNotification } from "./framwork/Notification/Notification";

LogBox.ignoreLogs(["AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-async-storage/async-storage' instead of 'react-native'. See https://github.com/react-native-async-storage/async-storage"]);
export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  // registerNNPushToken(14154, 'N5giMDhOo3VVDMQelhuPpv');

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({ OpenSans_400Regular });
        await Font.loadAsync({ OpenSans_600SemiBold });
        await Font.loadAsync({ OpenSans_700Bold });
        await Font.loadAsync({ EBGaramond_400Regular });
        await Font.loadAsync({ EBGaramond_600SemiBold });
        await Font.loadAsync({ EBGaramond_700Bold });
        await Font.loadAsync({ Quicksand_400Regular });
        await Font.loadAsync({ Quicksand_700Bold });
        await Font.loadAsync({ Quicksand_600SemiBold });
        await Font.loadAsync({ Kurale_400Regular });
        await Font.loadAsync({ Inter_400Regular });
        await Font.loadAsync({ Inter_700Bold });
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <RootSiblingParent>
      <AppProvider>
        <StatusBar style="light" />
        <NavigationContainer>
          <StackNavigator />
          <Preloader />
          <PushNotification />
        </NavigationContainer>
      </AppProvider>
    </RootSiblingParent>
  )
}