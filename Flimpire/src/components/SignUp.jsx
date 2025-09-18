import style from '../style/SignIn.module.css'
function SignUp() {
    return (
        <div className={style.container}>
            <h1>SignUp Form</h1>
            <form id="SignUp">
                <div>
                    <input type="text" placeholder='Enter Username'/>
                </div>
                <div>
                    <input type="text" placeholder='Enter Email'/>
                </div>
                <div>
                    <input type="text" placeholder='Create Password'/>
                </div>
                <div>
                    <input type="text" placeholder='Confirm password'/>
                </div>
                <button>SignUp</button>
                <p>Already have an account? <span>SignIn</span></p>
            </form>
        </div>
    )
}

export default SignUp;

