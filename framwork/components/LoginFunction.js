import { baseURL } from "../../config";

export function signIn(email, password) {

    var formdata = new FormData();
    formdata.append("email", email);
    formdata.append("password", password);
    var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };
    fetch(`${baseURL}/api/login`, requestOptions)
        .then(response => response.json())
        .then(result => {
            const { status, message, data } = result
            if (status == "error") {
                Alert.alert(
                    'Access denied',
                    message,
                    [{ text: 'Try again' }]
                )
            }
            else if (status == "success") {
                return data
            } else {
                Alert.alert(
                    'Sorry!',
                    "Something went wrong",
                    [{ text: 'Try again' }]
                )
            }
            setPreloader(false)
        })
        .catch(error => {
            console.log('error', error)
            setPreloader(false)
        });
}