import { useState, useEffect } from "react";
import styles from "./banner.module.css";
import axios from "../../utils/axios";
import requests from '../../utils/requests';

const Banner = () => {
    const [movie, setMovie] = useState({})
    useEffect(() => {
      (async () => {
        try {
            const response = await axios.get(requests.fetchNetflixOriginals)
            setMovie(response.data.results[Math.floor(Math.random()*response.data.results.length)])
        }catch (error) {
            console.log(error);
        }
      })()
    }, [])
    const truncate = (string,max_num) => {
        return string?.length > max_num ? string.substr(0, max_num - 1) + "..." : string;
    }
  return (
    <div
      className={styles.banner}
      style={{
        backgroundImage: `url('https://image.tmdb.org/t/p/original${movie?.backdrop_path}')`
      }}
    >
      <div className={styles.banner_contents}>
        <h1 className={styles.banner_title}>
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className={styles.banner_buttons}>
          <button className={`${styles.banner_button} ${styles.play}`}>Play</button>
          <button className={styles.banner_button}>My List</button>
        </div>
        <h1 className={styles.banner_description}>{truncate(movie?.overview, 150)}</h1>
      </div>
      <div className={styles.banner_fadeBottom}/>
    </div>
  );
}

export default Banner