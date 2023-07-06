import { OverlayEventDetail } from '@ionic/core';
import { IonBackButton, IonButton, IonButtons, IonContent, IonGrid, IonHeader, IonImg, IonItem, IonLabel, IonModal, IonNav, IonNavLink, IonPage, IonRouterOutlet, IonRow, IonThumbnail, IonTitle, IonToolbar } from '@ionic/react';
import { useRef, useState } from 'react';
import Photo from '../components/Photo';
import './SelectPhotos.css';
import { Link, Route } from 'react-router-dom';
import { IonReactRouter } from '@ionic/react-router';
import safeJsonStringify from 'safe-json-stringify';

export interface PhotoProps {
  photoFileName: string;
  alias: string;
  editMode: boolean;
  callSavePhoto: Function;
}
export interface PhotoPropss {
  photoFileName: string;
  alias: string;
  editMode: boolean;
  callSavePhoto: string;
}
export interface PhotoObj {
  fileName: string,
  alias: string,
  id: string,
  content: string,
  url: string
}

export interface SelectPhotoProps {
  onPhotoUpdate: Function;
}
const SelectPhotos: React.FC<SelectPhotoProps> = (onPhotoUpdate) => {
  const modal = useRef<HTMLIonModalElement>(null);

  const [selectedPhoto, setSelectedPhoto] = useState<PhotoProps>();
  const [modalSelectedPhoto, setModalSelectedPhoto] = useState<PhotoProps>();

  const [photos, setPhotos] = useState<PhotoObj[]>([]);
  const [photoCount, setPhotoCount] = useState<Number>(0);

  const getPhotosFromSession = () => {

  }

  const confirm = () => {
    modal.current?.dismiss(modalSelectedPhoto, 'confirm');
  };

  const onWillDismiss = (ev: CustomEvent<OverlayEventDetail>) => {
    if (ev.detail.role === 'confirm') {
      setSelectedPhoto(ev.detail.data);
    }
  };

  const savePhoto = (photo: PhotoObj) => {
    // console.log(photo); 
    photos.push(photo);
    setPhotos(photos);
    // onPhotoUpdate(photos);
    // console.log("photos count", photos.length);
    setPhotoCount(photos.length);
    // 
    // history.go(-1);
  }
  // const linkProps: PhotoProps = { alias: 'some' };
  // console.log(linkProps);
  return (
    <IonPage>

      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton>Back</IonBackButton>
          </IonButtons>
          <IonTitle>Select Photos</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid>
          <IonRow>
            <IonItem>
              <IonItem>
                <IonLabel>
                  Photos added: {photoCount.toString()}
                </IonLabel>
              </IonItem>
            </IonItem>
            <IonNavLink routerDirection="root" component={() => <Photo photoFileName={"somefilename"} alias={"somealias"} editMode={false} callSavePhoto={savePhoto}   />}>
              <IonButton>Add Photo</IonButton>
            </IonNavLink>
            {/* <IonButton>
              Add Photo
            </IonButton> */}
          </IonRow>
          <IonRow>
            {photos.length > 0 && photos.map(
              (photo) => {
                console.log("photos is ", photo);
                return (
                  <IonItem id={`id_${photo.alias}_${photo.url}`}>
                    <IonThumbnail>
                      <IonImg src={photo.url} alt="preview image" />
                    </IonThumbnail>
                    <IonLabel>
                      {photo.alias}
                    </IonLabel>
                  </IonItem>
                )
              }
            )}
          </IonRow>

        </IonGrid>

      </IonContent>
    </IonPage>
  );
};

export default SelectPhotos;
