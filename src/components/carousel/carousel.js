import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Slider from 'react-slick';

import styles from './carousel-styles.scss';

const customPaging = (i, pagingTitles, theme) => (
  <div className={cx(styles.pagingTitle, theme.pagingTitle)}>
    {pagingTitles[i]}
  </div>
);

const Carousel = props => {
  const {
    children,
    pagingTitles,
    theme,
    hasPaging,
    autoplay,
    autoplaySpeed
  } = props;
  const settings = {
    infinite: true,
    arrows: false,
    autoplay,
    autoplaySpeed,
    pauseOnHover: true,
    pauseOnDotsHover: true,
    pauseOnFocus: true,
    focusOnSelect: true,
    dots: hasPaging,
    dotsClass: 'cwCarouselPaging',
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    customPaging: i => customPaging(i, pagingTitles, theme)
  };

  return (
    <Slider
      {...settings}
      className={cx(styles.carouselWrapper, theme.carouselWrapper)}
    >
      {[ ...children ]}
    </Slider>
  );
};

Carousel.propTypes = {
  autoplay: PropTypes.bool,
  autoplaySpeed: PropTypes.number,
  hasPaging: PropTypes.bool,
  pagingTitles: PropTypes.arrayOf(PropTypes.string),
  theme: PropTypes.shape({ carouselWrapper: PropTypes.string }),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

Carousel.defaultProps = {
  autoplay: true,
  autoplaySpeed: 4000,
  hasPaging: true,
  pagingTitles: [],
  theme: {}
};

export default Carousel;
