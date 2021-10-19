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
      autoplaySpeed,
      primarySlider,
      config
    } = this.props;

    const primarySliderConfig = {
      infinite: true,
      fade: true,
      arrows: false,
      autoplay,
      autoplaySpeed,
      pauseOnHover: true,
      pauseOnDotsHover: true,
      pauseOnFocus: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      beforeChange: (current, next) =>
        this.secondarySlider && this.secondarySlider.slickGoTo(next),
      dots: hasPaging,
      dotsClass: 'cwCarouselPaging',
      speed: 500,
      customPaging: i => customPaging(i, pagingTitles, theme),
      ...(config && config.primarySlider && config.primarySlider)
    };

    const secondarySliderConfig = {
      infinite: true,
      arrows: false,
      autoplay: false,
      slidesToShow: 1,
      beforeChange: (current, next) =>
        this.primarySlider && this.primarySlider.slickGoTo(next),
      ...(config && config.secondarySlider && config.secondarySlider)
    };

    return primarySlider === 'top'
      ? (
        <div className={cx(styles.carouselWrapper, theme.carouselWrapper)}>
          <div
            className={cx(
            styles.fadeSliderWithPaging,
            theme.fadeSliderWithPaging
          )}
          >
            <Slider
              {...primarySliderConfig}
              ref={slider => {
              this.primarySlider = slider;
            }}
            >
              {children.filter(child => child.props.topSlide)}
            </Slider>
          </div>
          <Slider
            {...secondarySliderConfig}
            ref={slider => {
            this.secondarySlider = slider;
          }}
          >
            {children.filter(child => child.props.bottomSlide)}
          </Slider>
        </div>
)
      : (
        <div className={cx(styles.carouselWrapper, theme.carouselWrapper)}>
          <Slider
            {...secondarySliderConfig}
            ref={slider => {
            this.secondarySlider = slider;
          }}
          >
            {children.filter(child => child.props.topSlide)}
          </Slider>
          <div
            className={cx(
            styles.fadeSliderWithPaging,
            theme.fadeSliderWithPaging
          )}
          >
            <Slider
              {...primarySliderConfig}
              ref={slider => {
              this.primarySlider = slider;
            }}
            >
              {children.filter(child => child.props.bottomSlide)}
            </Slider>
          </div>
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
  /** Slider to handle the pagination 'top' or 'bottom' */
  primarySlider: PropTypes.oneOf([ 'top', 'bottom' ]),
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
  /** custom config for each of the two sliders */
  config: PropTypes.shape({
    primarySlider: PropTypes.object,
    secondarySlider: PropTypes.object
  }),
  /** Slides to render  */
  children: PropTypes.arrayOf(PropTypes.node).isRequired
};

Carousel.defaultProps = {
  autoplay: true,
  autoplaySpeed: 4000,
  hasPaging: true,
  pagingTitles: [],
  theme: {},
  config: {},
  primarySlider: 'top'
};

export default Carousel;
