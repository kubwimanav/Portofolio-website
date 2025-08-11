import { useState } from "react"
import type { login } from "../types/type";

export const Login = (props:login) => {
  const [login, setLogin] = useState<login|null>(null);
  const handlelogin = () => {
    setLogin({
      name: 'vincent',
      email: 'vincent@gmail.com'
    })
  }
    const handlogout = () => {
      setLogin(null)
    }
  
  return (
    <div>
      <div onClick={handlelogin}>Login</div>
      <div onClick={handlogout}>Logout</div>
      <div>user name is  {login?.name}</div>
      <div>user name is {login?.email}</div>
    </div>
  );
}