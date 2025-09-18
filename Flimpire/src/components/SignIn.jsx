import style from '../style/SignIn.module.css'
function SignIn() {
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
                <button>SignIn</button>
                <p>Already have an account? <span>SignIn</span></p>
            </form>
        </div>
    )
}

export default SignIn;

