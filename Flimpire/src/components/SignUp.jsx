import signInStyle from '../style/SignIn.module.css'
import signUpStyle from '../style/SignUp.module.css'
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
function SignUp() {
    return (
        <div className={signUpStyle.container}>
            <h1>SignUp Form</h1>
            <form id="SignUp" className={signUpStyle.form}>
                <div className={signUpStyle.inputBox}>
                    <FaUser className={signUpStyle.icon}/>
                    <input className={signUpStyle.inputStyle} type="text" placeholder='Enter Username'/>
                </div>
                <div className={signUpStyle.inputBox}>
                    <MdEmail className={signUpStyle.icon}/>
                    <input className={signUpStyle.inputStyle} type="text" placeholder='Enter Email'/>
                </div>
                <div className={signUpStyle.inputBox}>
                    <FaLock className={signUpStyle.icon}/>
                    <input className={signUpStyle.inputStyle} type="text" placeholder='Create Password'/>
                </div>
                <div className={signUpStyle.inputBox}>
                    <FaLock className={signUpStyle.icon}/>
                    <input className={signUpStyle.inputStyle} type="text" placeholder='Confirm password'/>
                </div>
                <div className={signUpStyle.footer}>
                    <button className={signUpStyle.button}>SignUp</button>
                    <p>Already have an account? <span>SignIn</span></p>
                </div>
            </form>
        </div>
    )
}

export default SignUp;

