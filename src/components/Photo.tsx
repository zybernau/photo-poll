import { IonButton, IonContent, IonGrid, IonImg, IonInput, IonItem, IonLabel, IonRow, IonThumbnail } from "@ionic/react";
import { useState } from "react";
import './Photo.css'
import { Camera, GalleryImageOptions } from "@capacitor/camera";
import { Directory, Encoding, Filesystem, ReadFileOptions } from "@capacitor/filesystem";
import { PhotoProps } from "../pages/SelectPhotos";


const Photo: React.FC<PhotoProps> = ({ photoFileName, alias, editMode, callSavePhoto }) => {
  const [imageSelected, setImageSelected] = useState(false);
  const [imageContents, setImageContents] = useState<string | undefined>();
  const [selectedFileName, setSelectedFileName] = useState('');
  const [chosenAlias, setChosenAlias] = useState('');
  const [id, setId] = useState('');


  const [selectedImage, setSelectedImage] = useState<string | undefined>();

  const openImagePicker = async () => {
    const options: GalleryImageOptions = {
      quality: 90,
      limit: 1,
      width: 300,
      height: 500,
      presentationStyle: 'popover'
    };
    const imageSelResults = await Camera.pickImages(options);

    if (imageSelResults.photos.length > 0) {
      // console.log('imageSelResults', imageSelResults);
      setSelectedImage(imageSelResults.photos[0].webPath);
    }

    let readFileOptions : ReadFileOptions = {
      path:imageSelResults.photos[0].path || ''
    }

    const imageContents = await Filesystem.readFile(readFileOptions);
    // console.log('image contents to write', imageContents);
    setImageContents(imageContents.data);
  };

  const aliasFieldChange = (evnt: Event) => {
    const value = (evnt.target as HTMLInputElement).value;
    setChosenAlias(value);
  };

  const idFieldChange = (evnt: Event) => {
    const value = (evnt.target as HTMLInputElement).value;
    setId(value);
  };

  const save = () => {
    let photo = {
      fileName: selectedFileName,
      alias: chosenAlias,
      id: id,
      content: imageContents,
      url: selectedImage
    };
    callSavePhoto(photo);
    // photo moved to select photos.
  }
  return (
    <div className="add-photo">
      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow>
            <IonItem>
              <IonInput labelPlacement="floating" label="Filename" type="text" placeholder="Chosen File Name" />
            </IonItem>
          </IonRow>
          <IonRow>
            <IonItem>
              <IonButton disabled={imageSelected} onClick={openImagePicker}>pick a image</IonButton>
            </IonItem>
          </IonRow>
          <IonRow>
            <IonItem>
              <IonInput labelPlacement="floating" label="Alias" type="text" onIonInput={(e) => { aliasFieldChange(e); }} placeholder="Single charecter Alias (public)" />
            </IonItem>
          </IonRow>
          <IonRow>
            <IonItem>
              <IonInput labelPlacement="floating" label="ID" type="text" onIonInput={(e) => { idFieldChange(e); }} placeholder="ID for the photo(private)" />
            </IonItem>
          </IonRow>
          <IonRow>
            <IonItem>
              <IonThumbnail>
                <IonImg src={selectedImage} alt="preview image" />
              </IonThumbnail>
              
            </IonItem>
          </IonRow>
          <IonRow>
            <IonItem>
            <IonButton onClick={(e) => save()}>
              Save
            </IonButton>
            </IonItem>
          </IonRow>
        </IonGrid>
      </IonContent>
    </div>
  );
};

const EditModePhoto: React.FC<PhotoProps> = ({ photoFileName, alias, editMode }) => {
  return (
    <div className="edit-photo">
      <IonContent fullscreen={true} className="ion-padding">
        <IonItem>
          <IonLabel position="stacked">Filename</IonLabel>
          <IonInput type="text" placeholder="pick the file??" value={photoFileName} />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Alias</IonLabel>
          <IonInput type="text" value={alias} placeholder="Alias for the photo" />
        </IonItem>
        <IonItem>
          <IonThumbnail>
            <img alt={alias} src={photoFileName} />
          </IonThumbnail>
        </IonItem>
      </IonContent>
    </div>
  )
}

export default Photo;