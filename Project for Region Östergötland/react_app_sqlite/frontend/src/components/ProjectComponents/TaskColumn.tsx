import React from 'react'
import { Task, TaskStatus } from '../../Types'
import { VStack, Text, Box } from '@chakra-ui/react'
import TaskCard from './TaskCard'
import AddNewTaskModal from './AddNewTaskModal';


type Props = {
    tasks: Task[]
    setTasks: (tasks: Task[]) => void
    changeStatus: (id : number, status: TaskStatus) => void
    title: string
    color: string
    attributes: string[]
    addTask: string
    showButton: boolean
    bgColor?: string
    bgHeight?: string
    bgWidth?: string
    getProject : () => void 
    height : string
    dontShowArrows?: boolean
    borderRadius?: string
    tempTaskId: number
}


const TaskColumn = ({ tasks, changeStatus, setTasks, title, color, attributes, addTask, showButton, getProject, tempTaskId,
  height, bgColor = 'white', bgHeight = '525px', bgWidth = '18vw', borderRadius='5px', dontShowArrows}: Props) => {

    const getIfResult = () => {
      const currentUrl = window.location.href;
      if (currentUrl.endsWith("overblick")) {
        return true 
      }else{
        return false 
      }
    }

    const setTask = (updatedTask: Task) => {
        const updatedTasks = tasks.map((task) =>
          task.taskId === updatedTask.taskId ? { ...task, status: updatedTask.status } : task
        );
      
        setTasks(updatedTasks);
      };
    const handleButtonClick = () => {
        alert ("Here you will be able to add a task")
    }
  return (
    <div style={{ height: bgHeight, width: bgWidth, backgroundColor: bgColor, borderRadius: borderRadius }}>
          {/* <div style={{height: bgHeight, width: bgWidth, backgroundColor: bgColor, borderRadius: borderRadius}}></div> */}
        <VStack >
            <Text as={'b'} fontSize={'xl'} marginTop={4}>{title}</Text>

            <Box overflowY={'scroll'} width={'93%'} height={height} justifyContent={"center"}>
                
            {tasks.map((task) => {
              return <TaskCard getProject={getProject} tempTaskId={tempTaskId} changeStatus={changeStatus} taskID={task.taskId} task={task} setTask={setTask} color={color} attributes={attributes} dontShowArrows={dontShowArrows} key={"task"+task.taskId} outputResult={getIfResult()}  />
                    
                })}
       
            </Box>

            {showButton && <div style={{display: 'flex', width: "100%", justifyContent: 'right'}}>
                <AddNewTaskModal getProject = {getProject} tasks = {tasks} setTasks = {setTasks} />
            </div>}
            
        </VStack>
        

    </div>
  )
}

export default TaskColumn