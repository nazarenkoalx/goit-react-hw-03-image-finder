import PropTypes from 'prop-types';

export const LargeImage = ({ imgUrl }) => {
  return <img src={imgUrl} alt="" />;
};

LargeImage.propTypes = {
  imgUrl: PropTypes.string.isRequired,
};
