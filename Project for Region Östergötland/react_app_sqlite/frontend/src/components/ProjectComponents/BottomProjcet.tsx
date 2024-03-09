import React from 'react'
import LeftBottom from './LeftBottom'
import Tasks from './Tasks'
import { Task, User, Category } from "../../Types";
import OverviewFinished from './OverviewFinished';

type Props = {
  startDate: string
  setStartDate: (startDate: string) => void
  tasks: Task[]
  setTasks: (tasks: Task[]) => void
  loading: boolean
  getProject: () => void
  status : string 
  users: User[];
  setUsers: (users: User[]) => void;
  projectId: string;
  categories : Category[]; 
  handleCategories: (value: Category[]) => void;
};


const BottomProjcet = ({startDate, setStartDate, tasks, setTasks, loading, getProject, status, users, setUsers, projectId, categories, handleCategories}: Props) => {
  if (loading) {
    return <div>Loading...</div>;
  } else{
    return (
      <div style={{ marginTop: "10px", display: "flex", flexDirection: "row", height: "87%" }}>
        <LeftBottom startDate={startDate} setStartDate={setStartDate} status={status} users={users} setUsers={setUsers} projectId={projectId} />
        {status === "Finished" ? <OverviewFinished categories={categories} handleCategories={handleCategories} startDate={startDate}/> : <Tasks tasks={tasks} setTasks={setTasks} getProject={getProject} />}
      </div>
    );
  }


}

export default BottomProjcet