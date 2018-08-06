import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import storiesDefaultImage from './assets/stories-default.jpg';

import styles from './stories-styles.scss';

class Stories extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    const { stories, handleClick, storiesTitle, theme } = this.props;
    return (
      <div className={cx(styles.container, theme.container)}>
        <h2 className={cx(styles.title, theme.title)}>
          {storiesTitle}
        </h2>
        <div className={cx(styles.grid, theme.grid)}>
          {stories.map(story => (
            <a
              key={story.link}
              className={cx(styles.story, theme.story)}
              style={{
                backgroundImage: `url(${story.background_image_url ||
                  storiesDefaultImage})`
              }}
              href={story.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleClick(story.title)}
            >
              {story.title}
            </a>
          ))}
        </div>
      </div>
    );
  }
}

Stories.propTypes = {
  stories: PropTypes.arrayOf(
    PropTypes.shape({
      link: PropTypes.string,
      title: PropTypes.string,
      background_image_url: PropTypes.string
    })
  ).isRequired,
  handleClick: PropTypes.func.isRequired,
  storiesTitle: PropTypes.string.isRequired,
  theme: PropTypes.shape({
    grid: PropTypes.string,
    container: PropTypes.string,
    title: PropTypes.string,
    story: PropTypes.string
  })
};

Stories.defaultProps = { theme: {} };

export default Stories;
