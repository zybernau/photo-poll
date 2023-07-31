import { IonBackButton, IonButton, IonButtons, IonContent, IonGrid, IonHeader, IonImg, IonInput, IonItem, IonLabel, IonPage, IonRow, IonThumbnail, IonTitle, IonToolbar } from "@ionic/react";
import { useEffect, useState } from "react";
import './Photo.css'
import { Camera, GalleryImageOptions } from "@capacitor/camera";
import { Directory, Encoding, Filesystem, ReadFileOptions } from "@capacitor/filesystem";
import { PhotoProps, PhotoPropss, locationType } from "../pages/SelectPhotos";
import { useLocation } from "react-router";

interface PhotoLinkState {
  savePhotoFunction: Function
}
const Photo: React.FC<PhotoProps> = ({ photoFileName, alias, editMode, callSavePhoto }) => {
  const [imageSelected, setImageSelected] = useState(false);
  const [imageContents, setImageContents] = useState<string | undefined>();
  const [selectedFileName, setSelectedFileName] = useState('');
  const [chosenAlias, setChosenAlias] = useState('');
  const [id, setId] = useState('');

  // const SaveFunction = undefined;
  const [selectedImage, setSelectedImage] = useState<string | undefined>();

  // const locationValue = useLocation<locationType>();
  // const functionCall = locationValue.state.savePhotoFunction;

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

    let readFileOptions: ReadFileOptions = {
      path: imageSelResults.photos[0].path || ''
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
    console.log('in save');
    let photo = {
      fileName: selectedFileName,
      alias: chosenAlias,
      id: id,
      content: imageContents,
      url: selectedImage
    };
    if (callSavePhoto) {
      callSavePhoto(photo);
      // SaveFunction(photo);  
    }
    // if(functionCall) {
    //   functionCall(photo);
    // }
    // photo moved to select photos.
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton>Back</IonBackButton>
          </IonButtons>
          <IonTitle>Add photo</IonTitle>
        </IonToolbar>
      </IonHeader>
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
    </IonPage>

  );
};

export default Photo;