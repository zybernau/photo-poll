import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { settingsOutline, newspaperOutline } from 'ionicons/icons';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import ProjectSettings from './pages/ProjectSettings';
import Settings from './pages/Settings';
import SelectPhotos, { PhotoObj } from './pages/SelectPhotos';
import Photo from './components/Photo';

setupIonicReact();
const photoUpdated = (photos: PhotoObj[]) => {
  console.log('triggered in app .js');
}

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      {/* <IonRouterOutlet> */}

        {/* <Route path="/SelectPhotos">
            <SelectPhotos onPhotoUpdate={(photos: PhotoObj[]) => photoUpdated(photos)} />
          </Route>
          <Route path="/AddPhoto">
            <Photo alias='' photoFileName='' editMode={false} callSavePhoto={() => {console.log('fucked off !!! ')}} />
          </Route> */}
        {/* <Route exact path="/ProjectSettings">
          <ProjectSettings />
        </Route>
        <Route path="/Settings">
          <Settings />
        </Route>
        <Route exact path="/">
          <Redirect to="/ProjectSettings" />
        </Route> */}
      {/* </IonRouterOutlet> */}
      <IonTabs>
        <IonRouterOutlet>
          <Route path="/SelectPhotos" component={SelectPhotos} />
          <Route path="/AddPhoto" component={Photo} />
          <Route exact path="/ProjectSettings">
            <ProjectSettings />
          </Route>
          <Route path="/Settings">
            <Settings />
          </Route>
          <Route exact path="/">
            <Redirect to="/ProjectSettings" />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="ProjectSettings" href="/ProjectSettings">
            <IonIcon aria-hidden="true" icon={newspaperOutline}></IonIcon>
            <IonLabel>Project</IonLabel>
          </IonTabButton>
          {/* <IonTabButton tab="SelectPhotos" href="/SelectPhotos">
            <IonIcon aria-hidden="true" icon={imageOutline} />
            <IonLabel>Phots</IonLabel>
          </IonTabButton> */}
          <IonTabButton tab="Settings" href="/Settings">
            <IonIcon aria-hidden="true" icon={settingsOutline} />
            <IonLabel>Settings</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
