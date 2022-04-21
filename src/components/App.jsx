import { useEffect, useState } from 'react';
import { SearchBar } from './SearchBar/SearchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Global } from './Global';
import { getImages } from 'services/api';
import { mapper } from 'utils/mapper';
import { Button } from 'components/Button/Button';
import { Loader } from './Loader/Loader';
import { NoResult } from './NoResult.styled';
import { Modal } from './Modal/Modal';

export const App = () => {
  const [searchValue, setSearchValue] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState(null);

  useEffect(() => {
    if (searchValue === '') {
      return;
    }
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const images = await getImages(searchValue, page);
        const { totalHits, hits } = images;
        setImages(prev => [...prev, ...mapper(hits)]);
        setTotalResults(totalHits === 0 ? -1 : totalHits);
      } catch (error) {
        alert(
          'Упс.. Что-то пошло не так.. Перезагрузите страницу или ввидите другой поисковый запрос.'
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [searchValue, page]);

  const onSubmit = text => {
    setSearchValue(text);
    setImages([]);
    setPage(1);
  };

  const onNextPage = () => {
    setPage(prev => prev + 1);
  };

  const onImgClick = () => {
    setIsModalOpen(prev => !prev);
  };

  return (
    <div className="App">
      <Global />
      <SearchBar onSearch={onSubmit} />
      {images.length > 0 && (
        <ImageGallery
          images={images}
          onImgClick={onImgClick}
          setImage={setModalImage}
        />
      )}
      {isLoading && <Loader />}
      {images.length < totalResults && isLoading === false && (
        <Button onBtn={onNextPage} />
      )}
      {isModalOpen && <Modal modalImg={modalImage} onClose={onImgClick} />}
      {totalResults === -1 && isLoading === false && (
        <NoResult>
          <span>There is no result</span>
          <img
            src="https://thumbs.gfycat.com/InfiniteUnlawfulKinglet-size_restricted.gif"
            alt="not found"
          />
        </NoResult>
      )}
    </div>
  );
};
