onSubmit={(values, actions) => {
    setPreloader(true)
    actions.resetForm();
    signInWithEmailAndPassword(authentication, !userAsync ? values.email : userAsync.email, values.password)
      .then(() => {
        onAuthStateChanged(authentication, async (user) => {
          setUserUID(user.uid);
          setAsyncItem(user.uid)
          const docSnap = await getDoc(doc(db, "users", user.uid))
          let info = { userRole: "" }
          info = docSnap.data()
          setUserInfo(info)
          if (info.emailVerified) {
            if (info.userName == "") {
              navigation.navigate("Username")
            } else {
              if (info.userRole == "user") {
                if (info.email == "test@hagmuspay.com") {
                  navigation.reset({ index: 0, routes: [{ name: "HomePage", }] })
                } else {
                  if (!userAsync) {
                    navigation.navigate("LoginOtp")
                  } else {
                    navigation.reset({ index: 0, routes: [{ name: "HomePage", }] })
                  }
                }
              }
              else if (info.userRole == "admin") {
                navigation.reset({ index: 0, routes: [{ name: "AdminHome", }] })
              } else {
                navigation.replace("LandingPage")
              }
            }
          } else {
            navigation.navigate("Verification")
          }
          setPreloader(false)
        })
      })
      .catch((error) => {
        setPreloader(false)
        let msg = error.code.split("/").pop()
        msg = msg.split("-").join(" ")
        Alert.alert(
          'Access denied',
          msg,
          [{ text: 'Try again' }]
        )
      })
  }}