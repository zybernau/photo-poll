import { OverlayEventDetail } from '@ionic/core';
import { IonButton, IonButtons, IonContent, IonGrid, IonHeader, IonImg, IonItem, IonLabel, IonModal, IonPage, IonRow, IonThumbnail, IonTitle, IonToolbar } from '@ionic/react';
import { useRef, useState } from 'react';
import Photo from '../components/Photo';
import './SelectPhotos.css';

export interface PhotoProps {
  photoFileName: string;
  alias: string;
  editMode: boolean;
  callSavePhoto: Function;
}
interface PhotoObj {
  fileName: string,
  alias: string,
  id: string,
  content: string,
  url: string
}
const SelectPhotos: React.FC = () => {
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
    // console.log("photos count", photos.length);
    setPhotoCount(photos.length);
    modal.current?.dismiss();
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Select Photos</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large"> Select Photos</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonItem className='photo-container'>
          <IonItem>
            <IonLabel>
              Photos added: {photoCount.toString()}
            </IonLabel>
          </IonItem>
          
          <IonButton id="open-modal" >Add Photo</IonButton>
        </IonItem>
        <IonGrid>
          <IonRow>
            {photos.length > 0 && photos.map(
              (photo) => {
                console.log("photos is " , photo);
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
        <IonModal ref={modal} trigger="open-modal" onWillDismiss={(ev) => onWillDismiss(ev)}>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton onClick={() => modal.current?.dismiss()}>Cancel</IonButton>
              </IonButtons>
              <IonTitle>Add Photo</IonTitle>
              <IonButtons slot="end">
                {/* <IonButton strong={true} onClick={() => confirm()}>
                  Confirm
                </IonButton> */}
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className='ion-padding'>
            <Photo  alias='' photoFileName='' editMode={false} callSavePhoto={savePhoto} />
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default SelectPhotos ;
