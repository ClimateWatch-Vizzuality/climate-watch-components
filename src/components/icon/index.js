import React from 'react';
import PropTypes from 'prop-types';
import BitIcon from '@bit/aabdaab.cw-components.global.icon';

const Icon = (props) => <BitIcon {...props} />

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  theme: PropTypes.shape({
    icon: PropTypes.string
  })
}

Icon.defaultProps = {
  theme: {}
}

export default Icon;
