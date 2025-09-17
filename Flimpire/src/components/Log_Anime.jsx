import img from '../assets/black.jpg';
import styles from '../style/Log_Anime.module.css'

function Log_Anime() {
    return (
        <div className={styles.container}>
            <img src={img} alt="Black background" width="300" />
        </div>
    );
}

export default Log_Anime;
