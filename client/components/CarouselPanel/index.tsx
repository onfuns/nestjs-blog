import { Carousel } from 'antd'
import styles from './style.module.less'
const CarouselPanel = () => {
  const carouselList = [
    {
      url: 'https://coderfuns.com/',
      img: 'https://image.onfuns.com/blog/blog-slider-1.jpg',
    },
    {
      url: 'https://coderfuns.com/',
      img: 'https://image.onfuns.com/blog/blog-slider-2.jpg',
    },
  ]
  return (
    <Carousel autoplay className={styles.carouselPanel}>
      {carouselList.map((c, index) => (
        <a key={index} className={styles.carouselItem} href={c.url} target="__blank">
          <img src={c.img} />
        </a>
      ))}
    </Carousel>
  )
}

export default CarouselPanel
