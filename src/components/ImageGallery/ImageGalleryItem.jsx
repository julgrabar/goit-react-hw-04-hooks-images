import propTypes from 'prop-types';

export const ImageGalleryItem = ({
  webformatURL,
  tags,
  onImgClick,
  modalImg,
  setImage,
}) => {
  return (
    <li>
      <img
        src={webformatURL}
        alt={tags}
        onClick={() => {
          onImgClick();
          setImage(modalImg);
        }}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: propTypes.string.isRequired,
  modalImg: propTypes.string.isRequired,
  onImgClick: propTypes.func.isRequired,
  tags: propTypes.string.isRequired,
  setImage: propTypes.func.isRequired,
};
