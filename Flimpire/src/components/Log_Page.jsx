import Log_Anime from "./Log_Anime";
import SignIn from './SignIn'
import styles from '../style/Log_Page.module.css'

function Log_Page() {
    return (
        <div className={styles.outerContainer}>
            <div className={styles.container}>
                <div className={styles.imageContainer}>
                    <Log_Anime />
                </div>
                <div className={styles.signInContainer}>
                    <SignIn />
                </div>
                
            </div>
        </div>
    );
}

export default Log_Page;