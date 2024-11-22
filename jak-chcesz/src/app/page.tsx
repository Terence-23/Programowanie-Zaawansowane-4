"use client";

import Image from "next/image";
import styles from "./page.module.css";
import LoginPage from "./LoginPage";
import { Axios } from "axios";
import Polls from "./Polls";

export default function Home() {

  // var loginf = ; 
  return (

    < div className="main" >
      <LoginPage />

    </div >
  );
}
