import { useState } from 'react';
import { IonButton, IonContent, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import './ProjectSettings.css';
import { Link } from 'react-router-dom';



const ProjectSettings: React.FC = () => {
  const [projectName, setProjectName] = useState<string | undefined>();
  const [photosSelected, setPhotosSelected] = useState<string | undefined> ();

  const projectNameChange = (evnt : Event) => {
    const value = (evnt.target as HTMLInputElement).value;
    setProjectName(value);
  };

  // const navigateToSelectPhotos = (e: Event) => {
  //   e.preventDefault();
  // };
  return (
    <IonPage>
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
                  <Link className='link-button' to="/SelectPhotos">Select Photos</Link>
              </IonButton>
            </IonItem>
          </IonRow>
          <IonRow>
            <IonButton>
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
