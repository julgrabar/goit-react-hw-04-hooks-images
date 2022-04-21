import propTypes from 'prop-types';
import { List } from './ImageGallery.styled';
import { ImageGalleryItem } from './ImageGalleryItem';

export const ImageGallery = ({ images, onImgClick, setImage }) => {
  return (
    <>
      <List>
        {images.map(({ id, webformatURL, largeImageURL, tags }) => (
          <ImageGalleryItem
            key={id}
            webformatURL={webformatURL}
            tags={tags}
            modalImg={largeImageURL}
            onImgClick={onImgClick}
            setImage={setImage}
          />
        ))}
      </List>
    </>
  );
};

ImageGallery.propTypes = {
  images: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.number.isRequired,
      webformatURL: propTypes.string.isRequired,
      largeImageURL: propTypes.string.isRequired,
      tags: propTypes.string.isRequired,
    })
  ).isRequired,
  onImgClick: propTypes.func.isRequired,
  setImage: propTypes.func.isRequired,
};
