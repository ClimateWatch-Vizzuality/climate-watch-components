import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Button from 'components/button';
import Icon from 'components/icon';
import styles from './play-timeline-styles.scss';
import infoIcon from './assets/play.svg';
import playButtonTheme from './play-button-theme.scss';

const PlayTimeline = ({ years, selectedYear, theme, handlePlay }) => {
  const yearIndex = selectedYear ? years.indexOf(selectedYear) : 0;
  const getPosition = currentYearIndex =>
    parseInt(currentYearIndex, 10) * 100 / (years.length - 1);
  const correctedTickPosition = currentYearIndex => {
    const CORRECTION_PERCENTAGE = 2.5;
    if (currentYearIndex === 0)
      return getPosition(currentYearIndex) - CORRECTION_PERCENTAGE;
    if (currentYearIndex === years.length - 1)
      return getPosition(currentYearIndex) + CORRECTION_PERCENTAGE;
    return getPosition(currentYearIndex);
  };

  return (
    <div className={cx(styles.timelineContainer, theme.timelineContainer)}>
      <Button theme={playButtonTheme} onClick={handlePlay}>
        <Icon icon={infoIcon} />
      </Button>
      <div className={cx(styles.timeline, theme.timeline)}>
        {years.map((year, i) => (
          <div
            key={year}
            style={{ left: `${getPosition(i)}%` }}
            className={cx(styles.timelineTick, theme.timelineTick)}
          >
            <div
              className={cx(styles.timelineTickMark, theme.timelineTickMark)}
            />
            <div className={cx(styles.year, theme.year)}>
              {year}
            </div>
          </div>
        ))}
        <div
          className={cx(styles.timelineMarker, theme.timelineMarker)}
          style={{ left: `${correctedTickPosition(yearIndex)}%` }}
        />
      </div>
    </div>
  );
};

PlayTimeline.propTypes = {
  /**
   * Selected Year
   */
  selectedYear: PropTypes.string,
  /**
   * Years to show
   */
  years: PropTypes.arrayOf(PropTypes.string).isRequired,
  /**
   * Themable options
   */
  theme: PropTypes.shape({
    timelineContainer: PropTypes.string,
    timeline: PropTypes.string,
    timelineTick: PropTypes.string,
    timelineMarker: PropTypes.string,
    timelineTickMark: PropTypes.string,
    year: PropTypes.string
  }),
  /**
   * Play onClick
   */
  handlePlay: PropTypes.func.isRequired
};

PlayTimeline.defaultProps = { theme: {}, selectedYear: undefined };

export default PlayTimeline;
