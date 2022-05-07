import React, { useState, Fragment, useRef } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import FilterSelector from '../../FilterSelector/FilterSelector';
import FilerobotImageEditor, { TABS, TOOLS } from 'react-filerobot-image-editor';

import Icon from '../../Icon/Icon';

const NewPostEdit = ({ previewImage, setPreviewImage, file, filters }) => {
  const [imageState, setImageState] = useState({
    crop: {  },
    isCropping: true,
  });
  const imageRef = useRef();

console.log(previewImage, 'aaaaaaaaafile')
  const getCroppedImg = (image, crop) => {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          //reject(new Error('Canvas is empty'));
          console.error('Canvas is empty');
          return;
        }
        blob.name = 'cropped.jpeg';
        const fileUrl = window.URL.createObjectURL(blob);
        resolve(fileUrl);
      }, 'image/jpeg');
    });
  };

  const [isImgEditorShown, setIsImgEditorShown] = useState(false);


  const openImgEditor = () => {
    setIsImgEditorShown(true);
  };

  const closeImgEditor = () => {
    setIsImgEditorShown(false);
  };

  const makeClientCrop = async (crop) => {
    window.URL.revokeObjectURL(previewImage.src);
    if (imageState.imageRef && crop.width && crop.height) {
      const croppedImageUrl = await getCroppedImg(
        imageState.imageRef,
        crop,
        'newFile.jpeg'
      );
      setPreviewImage({ src: croppedImageUrl, crop });
      setImageState((previous) => ({ ...previous, isCropping: false }));
    }
  };

  const onCropChange = (crop, percentCrop) => {
    setImageState((previous) => ({
      ...previous,
      crop,
    }));
  };

  const onImageLoaded = (image) => {
    setImageState((previous) => ({ ...previous, imageRef: image }));
  };

  const saveImage = (editedImageObject) => {
    console.log(editedImageObject, 'editedImageObject');
    setPreviewImage({ src: editedImageObject.imageBase64 })
    };


  const baseFileUrl = window.URL.createObjectURL(file);
  return (
    <Fragment>
      <div className="new-post__preview">
        <div className="new-post__preview-image-container">
          {/*<ReactCrop
            src={previewImage.src}
            crop={imageState.crop}
            onChange={onCropChange}
            onImageLoaded={onImageLoaded}
            onDragStart={onDragStart}
            style={{ width: '100%', height: '100%' }}
            ref={imageRef}
            imageStyle={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              filter: previewImage.filter,
            }}
            ruleOfThirds
          />*/}
          <FilerobotImageEditor
                      style={{ width: '100%', height: '100%', position: 'absolute'  }}
                      onBeforeSave={()=>{return false}}
	  source={previewImage.src ? previewImage.src :  baseFileUrl}
	  onSave={(editedImageObject, designState) => saveImage(editedImageObject)}
	  annotationsCommon={{
	    fill: '#ff0000'
	  }}
	  Text={{ text: 'something...' }}
    Crop={{
      presetsItems: [
        {
          titleKey: 'classicPotrait',
          descriptionKey: '4:3',
          ratio: 4 / 3,
        },
        {
          titleKey: 'classicLandscape',
          descriptionKey: '21:9',
          ratio: 21 / 9,
        },
      ],
    }}
	  tabsIds={[TABS.ADJUST, TABS.FINETUNE, TABS.FILTERS, TABS.RESIZE]} // or {['Adjust', 'Annotate', 'Watermark']}
	  defaultTabId={TABS.ADJUST} // or 'Annotate'
	  defaultToolId={TOOLS.CROP} // or 'Text'
        />
        </div>
      </div>
    </Fragment>
  );
};

export default NewPostEdit;
