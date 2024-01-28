import axios from "axios";
import { useState } from "react";

export function BankAuth() {
    let response;
    const options = {
        method: 'POST',
        url: 'https://api.sandbox.safehavenmfb.com/oauth2/token',
        headers: { accept: 'application/json', 'content-type': 'application/json' },
        data: {
            grant_type: 'client_credentials',
            client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
            client_assertion: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ0ZWNtdXMub3JnIiwic3ViIjoiOWE2MGE2MmI4NjQzMWFkNmYwNTZlMGYwMWNkODllY2YiLCJhdWQiOiJodHRwczovL2FwaS5zYW5kYm94LnNhZmVoYXZlbm1mYi5jb20iLCJpYXQiOjE3MDE5NzY3MzksImV4cCI6MTkwMTk3NzMzOSwiZW50aXRsZW1lbnQiOjIwOX0.bTcXQLZfc1bFjWNpLU7cM7hKtpNwPeCY2pwosFGJCGlsavSJi5fgEo8MZAk-WeUGAvNzPXtdVjF6KahFcH07gxQUMZrz1wxTgXKJmYa5HOc0syH_kESb2xVHPmbJ-krOFu53NKIpZxPkf7CBRDmSZmnfMZ5hWYB68D2hETDndtQ',
            client_id: '9a60a62b86431ad6f056e0f01cd89ecf'
        }
    };

    axios
        .request(options)
        .then(response => {
            const { data } = response
            if ("access_token" in data) {
                response = { access_token: data.access_token, clientID: data.ibs_client_id };
            } else {
                ToastApp("Unable to authenticate")
            }
        })
        .catch(error => {
            console.error(error);
        });
    return response
}