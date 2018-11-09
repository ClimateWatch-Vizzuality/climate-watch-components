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
  /** Wether or not to autoplay */
  autoplay: PropTypes.bool,
  /** Speed of the carousel */
  autoplaySpeed: PropTypes.number,
  /** Wether or not to display pagination */
  hasPaging: PropTypes.bool,
  /** Array of strings containing slides titles to display on the pagination element.
   * Each string index belongs to the slide with the same index
    */
  pagingTitles: PropTypes.arrayOf(PropTypes.string),
  /** Theming carousel with customized styles */
  theme: PropTypes.shape({
    carouselWrapper: PropTypes.string,
    pagingTitle: PropTypes.string
  }),
  /** Slides to render  */
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
