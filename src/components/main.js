import Layout from 'antd/es/layout/layout';
import Setting from './setting';
import Contents from './contents';
import React, { useEffect, useState } from "react";
import {getSettings} from "../utils/settingsUtils";

const Main = () => {
  
  const [backgroundColor,setBackgroundColor] = useState("");
  const [state, setState] = useState("");
  const [timeWork, setTimeWork] = useState(0);
  const [shortBreak, setShortBreak] = useState(0);
  const [longBreak, setLongBreak] = useState(0);

  useEffect(() => {
    const onLoad = async () => {
      const setting = getSettings();
      setBackgroundColor(setting.backgroundColor);
      setState(setting.state);
      setTimeWork(setting.timeWork);
      setShortBreak(setting.shortBreak);
      setLongBreak(setting.longBreak);
    };
    onLoad();
  }, []);

  return(
    <Layout style={{height: "100vh"}}>  
        <Setting 
          setBackgroundColor = {setBackgroundColor} 
          backgroundColor={backgroundColor} 
          state={state}
          setTimeWork={setTimeWork}
          setShortBreak={setShortBreak}
          setLongBreak={setLongBreak}/>
        <Contents 
          backgroundColor = {backgroundColor} 
          state = {state}
          setState = {setState}
          timeWork = {timeWork}
          shortBreak = {shortBreak}
          longBreak = {longBreak} />
    </Layout>
  )
}

export default Main;