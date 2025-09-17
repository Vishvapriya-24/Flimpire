import style from '../style/signup.module.css'
function SignUp() {
    return (
        <div className={style.container}>
            <h1>Welcome</h1>
            <form id="signup" className={style.form}>
                <fieldset>
                    <legend>Email</legend>
                    <input type="text"/>
                </fieldset>
                <fieldset>
                    <legend>password </legend>
                    <input type="text"></input>
                </fieldset>
                <button>SignUp</button>
                <p>Already have an account? <span>SignUp</span></p>
            </form>
        </div>
    )
}

export default SignUp;

i totally created 3 components one for outside bcz if we click signup it will go to another component, another component is for the left image, and the third component is for the sigin - i want you to give style exactly in the image for the right signin side.  i give component code, okay?