"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useRouter } from "next/navigation"
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function LoginPage() {

    // const [failed_login, setLoginStatus(v)] = false;
    var failed_login = false;

    async function login() {
        var email = (document.getElementById("email_input") || { value: "" }).value;
        var password = (document.getElementById("password_input") || { value: "" }).value;

        // alert("logging in")
        var form = new FormData();
        form.append('email', email);
        form.append('password', password);

        const response = await axios.post("https://pkotowski.pythonanywhere.com/login", form)
        var message = response.data.message;
        if (message === "OK") {
            // alert("Logged in")
            localStorage.setItem('userName', response.data.user.name);
            localStorage.setItem('userID', response.data.userId)
            var polls_response = await axios.get("https://pkotowski.pythonanywhere.com/polls");
            localStorage.setItem('polls', JSON.stringify(polls_response.data.polls));
            router.push("/polls")
        }
        else {
            // setLoginStatus(false);
        }


    }
    const router = useRouter();
    return (
        <><br></br>
            <h1>Strona Logowania</h1>
            {failed_login ?
                <div id="unauthorized" className="hidden"> Unauthorized</div> : <div></div>}
            <label htmlFor="email">Email:</label><input type="text" name="email" className="input_box" id="email_input" /><br></br>
            <label htmlFor="password">Password</label><input type="password" name="password" className="input_box"
                id="password_input" /><br></br>
            <button onClick={() => {
                login();
            }} style={{ display: 'block', margin: '10px 0' }}>Login</button>



        </>
    );
}
