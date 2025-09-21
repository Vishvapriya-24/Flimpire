import style from '../style/SignIn.module.css'
import { FaCircleUser } from "react-icons/fa6";
import { TbLockPassword } from "react-icons/tb";
import {useState} from 'react';

function SignIn({ handleSignupToggle,handleSignInSubmit }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSignInSubmit(email, password);
    };

    return (
        <div className={style.container}>
            <h1 className={style.h1}>Welcome to,<br></br>Flimpire SignIn</h1>
            <form id="SignIn" className={style.form} onSubmit={handleSubmit}>
                <div className={style.inform}>
                    <FaCircleUser className={style.icon} />
    
                        <input type="text" placeholder='Email' value={email} className={style.input} onChange={(e)=>{setEmail(e.target.value)}}/>
                </div>
                <div className={style.inform}>
                    <TbLockPassword className={style.icon} />
                    
                        <input type="text" placeholder='Password' value={password} className={style.input} onChange={(e)=>{setPassword(e.target.value)}}></input>
                </div>

                <center>
                    <button className={style.submit} >SignIn</button>
                    <p style={{color:'white'}}>Don't have an account? <button className={style.link_signup} onClick={handleSignupToggle}>SignUp</button></p>
                </center>

            </form>
        </div>
    )
}

export default SignIn;

