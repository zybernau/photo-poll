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

export interface locationType {
  savePhotoFunction: Function;
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
    modal.current?.dismiss();
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
            {/* <IonNavLink routerDirection="root" component={() => <Photo photoFileName={"somefilename"} alias={"somealias"} editMode={false} callSavePhoto={savePhoto}   />}>
              <IonButton>Add Photo</IonButton>
            </IonNavLink> */}

            {/* <IonButton> */}
            {/* <Link to="/AddPhoto"  > Add Photo</Link> */}
            {/* <Link to={{ pathname: "/AddPhoto", state: { savePhotoFunction: savePhoto } }} > Add Photo !!!</Link> */}
            {/* <Link to="/AddPhoto" component={() => <Photo photoFileName={"somefilename"} alias={"somealias"} editMode={false} callSavePhoto={savePhoto}   />} > Add Photo !!!</Link> */}

            {/* </IonButton> */}
            <IonButton id="open-modal" expand="block">
              Add Photo
            </IonButton>

            {/* state={{ from: "occupation" } */}
            {/* <IonButton>
              Add Photo
            </IonButton> */}

            <IonModal ref={modal} trigger="open-modal" onWillDismiss={(ev) => onWillDismiss(ev)}>
              {/* <IonHeader>
                <IonToolbar>
                  <IonButtons slot="start">
                    <IonButton onClick={() => modal.current?.dismiss()}>Cancel</IonButton>
                  </IonButtons>
                  <IonTitle>Welcome</IonTitle>
                  <IonButtons slot="end">
                    <IonButton strong={true} onClick={() => confirm()}>
                      Confirm
                    </IonButton>
                  </IonButtons>
                </IonToolbar>
              </IonHeader> */}
              <Photo photoFileName={"somefilename"} alias={"somealias"} editMode={false} callSavePhoto={savePhoto} />
            </IonModal>
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
