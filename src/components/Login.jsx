import React, { useState } from "react";
import '../styles/Login.css'

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    
    if (username === "renan" && password === "12345") {
      localStorage.setItem("loggedIn", "true");
      onLogin();
    } else {
      alert("Kullanıcı adı veya şifre hatalı!");
    }
  };

  return (
    <div className="login-container">
      <h2>Diyetisyen Girişi</h2>
      <input
        type="text"
        placeholder="Kullanıcı Adı"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Şifre"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Giriş Yap</button>
    </div>
  );
}
