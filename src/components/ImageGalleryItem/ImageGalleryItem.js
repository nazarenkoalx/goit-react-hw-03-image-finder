import { GalleryLi, GalleryImg } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ webformatURL, largeImageURL }) => {
  return (
    <GalleryLi>
      <GalleryImg src={webformatURL} alt="" width="290" />
    </GalleryLi>
  );
};
