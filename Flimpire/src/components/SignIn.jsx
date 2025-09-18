import style from '../style/SignIn.module.css'
function SignIn({handleSignup}) {
    return (
        <div className={style.container}>
            <h1 className={style.h1}>Welcome</h1>
            <form id="SignIn" className={style.form}>
                <fieldset className={style.fieldset}>
                    <legend className={style.legend}>Email</legend>
                    <input type="text" className={style.input}/>
                </fieldset>
                <fieldset className={style.fieldset}>
                    <legend className={style.legend}>password </legend>
                    <input type="text" className={style.input}></input>
                </fieldset>
                <center>
                    <button className={style.submit}>SignIn</button>
                    <p>Don't have an account? <button className={style.link_signup} onClick={handleSignup}>SignUp</button></p>
                </center>
                
            </form>
        </div>
    )
}

export default SignIn;

