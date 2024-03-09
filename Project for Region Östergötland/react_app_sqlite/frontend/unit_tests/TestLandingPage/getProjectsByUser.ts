
export type ImprovementWorkData = {
    title: string;
    checklist: [string, boolean][];
    projectId: number;
  };

  let improvementWorks: ImprovementWorkData[] = [];

  const setImprovementWorks = (newData: ImprovementWorkData[]) => {
    improvementWorks = newData;
    return improvementWorks;
  };

  export const fetchImprovementWorks = (data: any[]): ImprovementWorkData[] => {
    console.log("Received data:", data); // Add this line for debugging
    
      if (data.length === 0) {
        console.log("No improvement works found");
        return [];
      }
  
      const works: ImprovementWorkData[] = [];
      for (const project in data) {
        let checklist: [string, boolean][] = [];
        if (data[project].hasOwnProperty("Task")) {
          for (const task in data[project]["Task"]) {
            checklist.push([data[project][task]["taskName"], false]);
          }
        } 
        works.push({
          title: data[project]["title"],
          checklist: checklist,
          projectId: data[project]["projectId"],
        });
      }
  
      return setImprovementWorks(works);
    
  };
  

  
