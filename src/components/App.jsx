import React, { Component } from 'react';
import axios from 'axios';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageGalleryItem from './ImageGallery/ImageGalleryItem';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import './styles.css';

const API_KEY = '39383014-65ce5dfe2161e424b70e47e6d';

export class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    isLoading: false,
    showModal: false,
    modalImage: '',
  };

  handleSearch = (query) => {
    this.setState({ query, page: 1, images: [] }, this.fetchImages);
  };

  fetchImages = () => {
    const { query, page } = this.state;
    this.setState({ isLoading: true });

    axios
      .get(
        `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      )
      .then((response) => {
        this.setState((prevState) => ({
          images: [...prevState.images, ...response.data.hits],
          page: prevState.page + 1,
        }));
      })
      .catch((error) => console.error(error))
      .finally(() => this.setState({ isLoading: false }));
  };

  handleLoadMore = () => {
    this.fetchImages();
  };

  handleImageClick = (src) => {
    this.setState({ showModal: true, modalImage: src });
  };

  closeModal = () => {
    this.setState({ showModal: false, modalImage: '' });
  };

  render() {
    const { images, isLoading, showModal, modalImage } = this.state;

    return (
      <div className="app">
        <Searchbar onSubmit={this.handleSearch} />
        <div className="gallery-container">
          <ImageGallery>
            {images.map((image) => (
              <ImageGalleryItem
                key={image.id}
                src={image.webformatURL}
                alt={image.tags}
                onClick={() => this.handleImageClick(image.largeImageURL)}
              />
            ))}
          </ImageGallery>
        </div>
        {isLoading && <Loader />}
        <div className="button-container">
          {images.length > 0 && !isLoading && (
            <Button onClick={this.handleLoadMore} />
          )}
        </div>
        {showModal && (
          <Modal
            src={modalImage}
            alt="Modal Image"
            onClose={this.closeModal}
          />
        )}
      </div>
    );
  }
}

export default App;