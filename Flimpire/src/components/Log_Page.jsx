import Log_Anime from "./Log_Anime";
import SignUp from './SignUp'
import styles from '../style/Log_Page.module.css'

function Log_Page() {
    return (
        <div className={styles.outerContainer}>
            <div className={styles.container}>
                <div className={styles.imageContainer}>
                    <Log_Anime />
                </div>
                <div className={styles.signUpContainer}>
                    <SignUp />
                </div>
                
            </div>
        </div>
    );
}

export default Log_Page;