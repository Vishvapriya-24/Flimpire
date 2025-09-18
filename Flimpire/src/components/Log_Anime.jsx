import { useEffect, useState } from 'react';
import img1 from '../assets/black.jpg';
import img2 from '../assets/kaththi.jpg';
import img3 from '../assets/circle.jpg';
import styles from '../style/Log_Anime.module.css';

function Log_Anime() {
    const images = [img1, img2, img3];
    const [img_index, setimg_Index] = useState(0); // start with first image
   
    useEffect(() => {
        const timer = setInterval(() => {
            setimg_Index((previmg_Index) => (previmg_Index + 1) % images.length);
        }, 5000); // change every 3 seconds

        // cleanup function so old timers don't keep running
        return () => clearInterval(timer);
    }, []);


    return (
        <div className={styles.container}>
            <img 
                src={images[img_index]} 
                alt="slideshow" 
                width="300"
            />
        </div>
    );
}

export default Log_Anime;
