import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Slider from "react-slick";

import styles from './carousel-styles.scss';

const Carousel = (props) => {
  const { children } = props;
  const settings = {
    infinite: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    pauseOnFocus: true,
    focusOnSelect: false,
    dots: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  }

  return (
    <Slider {...settings} className={styles.carouselWrapper}>
      {[...children]}
    </Slider>
  )
}

export default Carousel;
