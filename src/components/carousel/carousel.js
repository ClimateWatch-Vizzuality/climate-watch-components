import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Slider from 'react-slick';

import styles from './carousel-styles.scss';

const customPaging = (i, pagingTitles, theme) => (
  <div className={cx(styles.pagingTitle, theme.pagingTitle)}>
    {pagingTitles[i]}
  </div>
);

/**
 * Carousel component is composed by two different sliders, one with fade transition (top one) and other with a lateral transition (bottom one).
 *
 * To determine where to place the `children` a `topSlide` or `bottomSlide` boolean should be passed as prop.
 * View the code for more detail on implementation.
 *
 * [React-slick](https://react-slick.neostack.com/) library is the main dependency.
 */
class Carousel extends Component {
  render() {
    const {
      children,
      pagingTitles,
      theme,
      hasPaging,
      autoplay,
      autoplaySpeed
    } = this.props;

    const topSliderConfig = {
      infinite: true,
      fade: true,
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
      customPaging: i => customPaging(i, pagingTitles, theme),
      beforeChange: (current, next) => this.bottomSlider.slickGoTo(next)
    };

    const bottomSliderConfig = {
      infinite: true,
      arrows: false,
      autoplay: false,
      slidesToShow: 1
    };

    return (
      <div className={cx(styles.carouselWrapper, theme.carouselWrapper)}>
        <div
          className={cx(
            styles.fadeSliderWithPaging,
            theme.fadeSliderWithPaging
          )}
        >
          <Slider {...topSliderConfig}>
            {children.filter(child => child.props.topSlide)}
          </Slider>
        </div>
        <Slider
          {...bottomSliderConfig}
          ref={slider => {
            this.bottomSlider = slider;
          }}
        >
          {children.filter(child => child.props.bottomSlide)}
        </Slider>
      </div>
    );
  }
}

Carousel.propTypes = {
  /** Whether or not to autoplay */
  autoplay: PropTypes.bool,
  /** Speed of the carousel */
  autoplaySpeed: PropTypes.number,
  /** Whether or not to display pagination */
  hasPaging: PropTypes.bool,
  /** Array of strings containing slides titles to display on the pagination element.
   * Each string index belongs to the slide with the same index
    */
  pagingTitles: PropTypes.arrayOf(PropTypes.string),
  /** Theming carousel with customized styles */
  theme: PropTypes.shape({
    carouselWrapper: PropTypes.string,
    fadeSliderWithPaging: PropTypes.string,
    pagingTitle: PropTypes.string
  }),
  /** Slides to render  */
  children: PropTypes.arrayOf(PropTypes.node).isRequired
};

Carousel.defaultProps = {
  autoplay: true,
  autoplaySpeed: 4000,
  hasPaging: true,
  pagingTitles: [],
  theme: {}
};

export default Carousel;
