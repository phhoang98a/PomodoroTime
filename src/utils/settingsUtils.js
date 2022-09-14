
let settings = {
  backgroundColor: "#C74646",
  state: "WORK",
  timeWork: 25,
  shortBreak: 5,
  longBreak: 10,  
};

const updateSettings = (newSettings)=>{
  settings = { ...settings, ...newSettings };
}

const getSettings = ()=>{
  return settings;
}

export{
  getSettings,
  updateSettings
}