import React from 'react';
import Loader from '../Loader/Loader'; 

const LoadMoreButton = ({ onClick, disabled, loading }) => (
    <div className="load-more-button-container">
      {loading && <Loader />}
      <button type="button" className="button" onClick={onClick} disabled={disabled}>
        Load more
      </button>
    </div>
  );

export default LoadMoreButton;
