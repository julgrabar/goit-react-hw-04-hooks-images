import { Component } from 'react';
import { SearchBar } from './SearchBar/SearchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Global } from './Global';
import { getImages } from 'services/api';
import { mapper } from 'utils/mapper';
import { Button } from 'components/Button/Button';
import { Loader } from './Loader/Loader';
import { NoResult } from './NoResult.styled';
import { Modal } from './Modal/Modal';

export class App extends Component {
  state = {
    searchValue: '',
    images: [],
    page: 1,
    isLoading: false,
    totalResults: 0,
    isModalOpen: false,
    modalImage: null,
  };

  async componentDidUpdate(_, prevState) {
    const { page, searchValue } = this.state;
    if (prevState.searchValue !== searchValue || prevState.page !== page) {
      try {
        this.setState({
          isLoading: true,
        });

        const images = await getImages(searchValue, page);
        const { totalHits, hits } = images;
        this.setState(prev => ({
          images: [...prev.images, ...mapper(hits)],
          totalResults: totalHits === 0 ? -1 : totalHits,
        }));
      } catch (error) {
        alert(
          'Упс.. Что-то пошло не так.. Перезагрузите страницу или ввидите другой поисковый запрос.'
        );
      } finally {
        this.setState({
          isLoading: false,
        });
      }
    }
  }

  onSubmit = text => {
    this.setState({
      searchValue: text,
      images: [],
      page: 1,
    });
  };

  onNextPage = () => {
    this.setState(prev => ({
      page: prev.page + 1,
    }));
  };

  onImgClick = () => {
    this.setState(prev => ({
      isModalOpen: !prev.isModalOpen,
    }));
  };

  setModalImage = image => {
    this.setState({
      modalImage: image,
    });
  };

  render() {
    const { isLoading, images, totalResults, isModalOpen, modalImage } =
      this.state;

    return (
      <div className="App">
        <Global />

        <SearchBar onSubmit={this.onSubmit} />
        {images.length > 0 && (
          <ImageGallery
            images={images}
            onImgClick={this.onImgClick}
            setImage={this.setModalImage}
          />
        )}
        {isLoading && <Loader />}
        {images.length < totalResults && isLoading === false && (
          <Button onBtn={this.onNextPage} />
        )}
        {isModalOpen && (
          <Modal modalImg={modalImage} onClose={this.onImgClick} />
        )}
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
  }
}
