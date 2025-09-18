import style from '../style/SignIn.module.css'
function SignIn({handleSignup}) {
    return (
        <div className={style.container}>
            <h1>Welcome</h1>
            <form id="SignIn" className={style.form}>
                <fieldset>
                    <legend>Email</legend>
                    <input type="text"/>
                </fieldset>
                <fieldset>
                    <legend>password </legend>
                    <input type="text"></input>
                </fieldset>
                <center>
                    <button>SignIn</button>
                    <p>Don't have an account? <button onClick={handleSignup}>SignUp</button></p>
                </center>
                
            </form>
        </div>
    )
}

export default SignIn;

