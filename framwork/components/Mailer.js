import axios from "axios";

export function Mailer(emailTo, subject, message) {
    const request = axios.get(`https://wenethub.com/sendemail.php?email=${emailTo}&subject=${subject}&message=${message}`);
    return request;
}