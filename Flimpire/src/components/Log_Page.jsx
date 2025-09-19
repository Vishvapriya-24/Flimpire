
import SignIn from './SignIn';
import styles from '../style/Log_Page.module.css';
import SignUp from './SignUp';
import { useState } from "react";

function Log_Page() {
    const [signup,setsignup] = useState(false);
    const handleSignup = ()=> {
        setsignup(!signup);
    }
    return (
        <div className={styles.outerContainer}>
                
                <div className={styles.signInContainer}>
                    {signup ? <SignUp /> : <SignIn handleSignup={handleSignup} />}
                </div>
                
        </div>
    );
}

export default Log_Page;