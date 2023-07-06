import { useState } from 'react';
import { IonButton, IonContent, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonNav, IonNavLink, IonPage, IonRouterOutlet, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import './ProjectSettings.css';
import { Link, Route } from 'react-router-dom';
import SelectPhotos, { PhotoObj } from './SelectPhotos';
import Photo from '../components/Photo';
import { IonReactRouter } from '@ionic/react-router';



const ProjectSettings: React.FC = () => {
  const [projectName, setProjectName] = useState<string | ''>('');
  const [photosSelected, setPhotosSelected] = useState<number | 0>(0);
  const [formValid, setFormValid] = useState<boolean | false>(false);

  const projectNameChange = (evnt: Event) => {
    const value = (evnt.target as HTMLInputElement).value;
    setProjectName(value);
  };

  const refreshFormValidity = () => {
    let validity = false;
    validity = (projectName && projectName.length > 0) && (photosSelected && photosSelected > 0) ? true : false;
    setFormValid(validity);
  }

  const photoUpdated = (Photos: PhotoObj[]) => {
    console.log('photos updated called in side component')
    let photosCount = Photos && Photos.length;
    setPhotosSelected(photosCount);
  }
  // const navigateToSelectPhotos = (e: Event) => {
  //   e.preventDefault();
  // };
  return (
    <IonPage>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path="/SelectPhotos">
            <SelectPhotos onPhotoUpdate={(photos: PhotoObj[]) => photoUpdated(photos)} />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
      <IonHeader>
        <IonToolbar>

          <IonTitle>Project Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="fade">
          <IonToolbar>
            <IonTitle size="large">Projects</IonTitle>
          </IonToolbar>
          <IonGrid>
            <IonRow>
              <IonItem>
                <IonInput labelPlacement="floating" label="Project Name" type="text"
                  onIonInput={(e) => { projectNameChange(e); }} placeholder="unique project name" />
              </IonItem>
            </IonRow>
            <IonRow>
              <IonItem>
                <IonLabel>
                  Photos Selected: {photosSelected}
                </IonLabel>
              </IonItem>
              <IonItem>

              
                <IonButton>
                  <Link to="/SelectPhotos">Select Photos</Link>
                </IonButton>

              </IonItem>
            </IonRow>
            <IonRow>
              <IonButton disabled={!formValid}>
                Save
              </IonButton>
            </IonRow>
          </IonGrid>
        </IonHeader>

      </IonContent>
    </IonPage>
  );
};

export default ProjectSettings;
