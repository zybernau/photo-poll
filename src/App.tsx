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
import { podiumOutline , imageOutline, settingsOutline} from 'ionicons/icons';
import SelectPhotos from './pages/SelectPhotos';
import PhotoSettings from './pages/ProjectSettings';
import PhotoPoll from './pages/PhotoPoll';

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

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/SelectPhotos">
            <SelectPhotos />
          </Route>
          <Route exact path="/ProjectSettings">
            <ProjectSettings />
          </Route>
          <Route path="/PhotoPoll">
            <PhotoPoll />
          </Route>
          <Route exact path="/">
            <Redirect to="/ProjectSettings" />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="ProjectSettings" href="/ProjectSettings">
            <IonIcon aria-hidden="true" icon={settingsOutline}></IonIcon>
            <IonLabel>Project</IonLabel>
          </IonTabButton>
          <IonTabButton tab="SelectPhotos" href="/SelectPhotos">
            <IonIcon aria-hidden="true" icon={imageOutline} />
            <IonLabel>Phots</IonLabel>
          </IonTabButton>
          <IonTabButton tab="PhotoPoll" href="/PhotoPoll">
            <IonIcon aria-hidden="true" icon={podiumOutline} />
            <IonLabel>Poll</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
