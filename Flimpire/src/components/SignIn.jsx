import style from '../style/SignIn.module.css'
import { FaCircleUser } from "react-icons/fa6";
import { TbLockPassword } from "react-icons/tb";

function SignIn({ handleSignup }) {
    return (
        <div className={style.container}>
            <h1 className={style.h1}>Welcome</h1>
            <form id="SignIn" className={style.form}>
                <div className={style.inform}>
                    <FaCircleUser className={style.icon} />
                    <fieldset className={style.fieldset}>
                        <legend className={style.legend}>Email</legend>
                        <input type="text" className={style.input} />
                    </fieldset>
                </div>
                <div className={style.inform}>
                    <TbLockPassword className={style.icon} />
                    <fieldset className={style.fieldset}>
                        <legend className={style.legend}>password </legend>
                        <input type="text" className={style.input}></input>
                    </fieldset>
                </div>

                <center>
                    <button className={style.submit}>SignIn</button>
                    <p>Don't have an account? <button className={style.link_signup} onClick={handleSignup}>SignUp</button></p>
                </center>

            </form>
        </div>
    )
}

export default SignIn;

