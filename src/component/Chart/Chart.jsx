import React from 'react';
import img from '../../../public/mng.png';
import styles from './Charts.module.css';

const Chart = () => {




    
  return (
      <div className={styles.container}>
          <div className={styles.img_hm_Pg}  data-aos="flip-down"
     data-aos-easing="ease-out-cubic"
     data-aos-duration="2000">
              <img src={img} alt="" />
          </div>
  </div>
    
  )
}

export default Chart;
