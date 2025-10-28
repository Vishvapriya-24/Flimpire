import axios from 'axios';
import SignIn from './SignIn';
import styles from '../../style/Log_Page.module.css';
import SignUp from './SignUp';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

function Log_Page() {
    const [signup,setsignup] = useState(false);
    const [Message,setMessage] = useState("");
    const navigate = useNavigate();
    const handleSignupToggle = ()=> {
        setsignup(!signup);
    }

    const handleSignupSubmit = async (name, age, email, password) => {
        try {
            const res = await axios.post("http://localhost:8000/signup", {
                name,
                age,
                email,
                password
            });
            setMessage(res.data.msg);
            
        } catch (err) {
            if (err.response) {
                setMessage(err.response.data.error); // e.g. "User already exists"
            }
             else {
                setMessage("Server error, try again later");
            }
        }
    };

    const handleSignInSubmit = async(email,password)=>{
        try {

            const res = await axios.post("http://localhost:8000/signin",{
                email,
                password
            },{withCredentials:true})

            setMessage(res.data.msg);
            navigate('/home/movies');
            if (res.data.token) {
                localStorage.setItem("token", res.data.token);
            }
            
        }catch(err) {
            if(err.response) {
                setMessage(err.response.data.error);
            }
            else {
                setMessage("server error, try again later");
            }
        }
    }

    return (
        <div className={styles.outerContainer}>
                
                <div className={styles.signInContainer}>
                    {signup ? <SignUp handleSignupToggle={handleSignupToggle} handleSignupSubmit={handleSignupSubmit} Message={Message}/> : <SignIn handleSignupToggle={handleSignupToggle} handleSignInSubmit={handleSignInSubmit} Message={Message}/>}
                    
                </div>
                
                
        </div>
    );
}

export default Log_Page;