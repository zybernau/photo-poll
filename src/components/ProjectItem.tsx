import { IonChip, IonItem, IonItemSliding, IonLabel } from "@ionic/react";
import { ProjectProps } from "../pages/ProjectSettings";

// export type ProjectItemProps = {
//     name: string;
//     status: 'Open' | 'Complete'

// };

const ProjectItem = ({project, onClickEvent } : {project: ProjectProps, onClickEvent:Function}) => {

    return (
        <IonItemSliding onClick={ (event) => onClickEvent(project)}>
            <IonItem>
                <IonLabel>
                    {project.name}
                </IonLabel>
                <IonChip color={project.status === 'Open'? "danger" : "success"}>
                    {project.status === 'Open'? "in progress" : "Completed"}
                </IonChip>
            </IonItem>
        </IonItemSliding>
    );
};

export default ProjectItem;