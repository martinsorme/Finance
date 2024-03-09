import { Project } from "../../src/Types";

export const validSubmitProject = (projects: Project[], projectId: number) => {

        if (projects[projectId].title === "" || projects[projectId].importance === "" || projects[projectId].difference === "" || projects[projectId].method === "" ) {
            return false;
        } else if (projects[projectId].creator_id === 0 && projects[projectId].categories.length === 0) {
            alert('Vänligen välj en teamleader och fyll i minst en kategori.');
            return;
        } else if (projects[projectId].creator_id === 0) {
            alert('Vänligen välj en teamleader.');
            return;
        } else  if (projects[projectId].categories.length === 0) {
            alert('Vänligen välj minst en kategori.');
            return;
        } else {
            return true;
        }
};