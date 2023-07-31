import { IonButton, IonContent, IonFooter, IonHeader, IonList, IonLoading, IonPage, IonRouterOutlet, IonTitle, IonToolbar, useIonAlert } from "@ionic/react";
import { useEffect, useState } from "react";
import { useRealmApp } from "../Realm";
import { useMongoDB } from "../rest/Mongo";
import { IonReactRouter } from "@ionic/react-router";
import { Route, useHistory } from "react-router";
import ProjectItem from "../components/ProjectItem";
import { Link } from "react-router-dom";
import ProjectSettings, { ProjectProps } from "./ProjectSettings";


export const Projects = () => {
    const [loading, setLoading] = useState(true);
    const [projects, setProjects] = useState<Array<any>>([]);
    const [project, setProject] = useState<ProjectProps>({ name: '', status: 'Open' });

    const app = useRealmApp();
    const history = useHistory();
    //   const [currentProject] = useState(app.currentUser?.customData .currentUser?.customData.memberOf[0]);
    const db = useMongoDB('photo-projects');

    const [presentAlert] = useIonAlert();

    const loadTasks = async () => {
        console.log(db.find)
        const projects = await db.find();
        setProjects(projects);
        console.log(projects);
        setLoading(false);
    };

    const clicked = (project: ProjectProps) => {
        console.log("on clicked in project.", project);
        setProject(project);
        history.push('/ProjectSettings', project);
    };


    useEffect(() => { loadTasks(); }, []);

    return (
        <IonPage>
            <IonReactRouter>
                <IonRouterOutlet>
                    {/* <Route path="/ProjectSettings">
                        <ProjectSettings project={project??{name:'-new-', status: 'Open'}} />
                    </Route> */}
                    {/* <Route exact path="/ProjectSettings" >
                        <ProjectSettings project={project ?? { name: '-new-', status: 'Open' }} />
                    </Route> */}
                    <Route exact path="/ProjectSettings" render={(props) => {
                        return <ProjectSettings project={project ?? { name: '-new-', status: 'Open' }} />;
                    }} />

                </IonRouterOutlet>
            </IonReactRouter>
            <IonContent>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle size="large">
                            Projects
                        </IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonList>
                    {loading ? <IonLoading isOpen={loading} /> : null}
                    {projects.map((project: any) => (
                        <ProjectItem key={project.name} project={project} onClickEvent={clicked} />
                    ))}
                </IonList>


            </IonContent>
            <IonFooter>
                <Link to="/ProjectSettings" >
                    <IonButton expand="full" >
                        Add Project
                    </IonButton>
                </Link>
            </IonFooter>
        </IonPage>
    );
}
export default Projects;