import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { Radio, Image, Checkbox } from 'antd';
import { updateSettings } from "../utils/settingsUtils";
import workImage from "../image/work.svg"
import shortBreakImage from "../image/short-break.svg"
import longBreakImage from "../image/long-break.svg"
import { CaretRightOutlined, PauseOutlined, UndoOutlined } from "@ant-design/icons";
import workAudio from "../music/alarm.mp3";
import tracks from "../utils/tracks";

const Contents = ({backgroundColor, state, setState, timeWork, shortBreak, longBreak})=>{

  const [counter, setCounter] = useState(0);
  const [done, setDone] = useState(false);
  const [isPause, setIsPause] = useState(true);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);
  const audioForWork = useRef(new Audio(workAudio));

  const audioLists = useRef(new Audio(tracks[trackIndex].audioSrc));

  useEffect(()=>{
    updateTime(state);
  },[state, timeWork, shortBreak, longBreak]);

  useEffect(()=>{
    updateTime(state);
  },[]);

  useEffect(()=>{
    audioLists.current.addEventListener('ended', () => {
      toNextTrack();
    });
  });

  useEffect(()=>{
    console.log("VAONMES");
    audioLists.current.pause();
    if (isMusicPlaying) audioLists.current.play();
  },[trackIndex]);

  useEffect(()=>{
    isMusicPlaying == true ? audioLists.current.play() : audioLists.current.pause(); 
  },[isMusicPlaying]);

  useEffect(()=>{
    if (counter==0){
      setDone(true);
      if (state != "WORK")
        setIsMusicPlaying(false);
      audioForWork.current.currentTime =0
      audioForWork.current.play();
    }
      
    const timer = isPause == false && counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  },[counter, isPause])

  const toNextTrack = () =>{
    if (trackIndex< tracks.length-1){
      setTrackIndex(trackIndex+1);
      audioLists.current = new Audio(tracks[trackIndex+1].audioSrc);
    }
    else {
      setTrackIndex(0);
      audioLists.current = new Audio(tracks[0].audioSrc);
    }
  }

  const updateTime = (state)=>{
    if (state=="WORK")
      setCounter(timeWork*60);
    else if (state=="SHORT BREAK")
      setCounter(shortBreak*60);
    else
      setCounter(longBreak*60)
  };

  const onChangeState = (e) =>{
    updateSettings({state:e.target.value});
    setState(e.target.value);
    updateTime(e.target.value);
    audioForWork.current.pause();
    setIsMusicPlaying(false);
    if (e.target.value != "WORK"){
      setTrackIndex(0);
      audioLists.current.pause();
      audioLists.current = new Audio(tracks[0].audioSrc);
    }
  };

  return (
    <div style={{backgroundColor: backgroundColor, height:"100vh"}}>
      <div style={{marginLeft: "auto", marginRight: "auto", width:"50%"}}>
        <Radio.Group onChange={onChangeState} value={state} size="large" style={{ marginTop: "50px", marginBottom: "20px", marginLeft: "auto", marginRight: "auto", display: "table" }}>
          <Radio.Button className="buttonContent" value="WORK" >POMODORO</Radio.Button>
          <Radio.Button className="buttonContent" value="SHORT BREAK" >SHORT BREAK</Radio.Button>
          <Radio.Button className="buttonContent" value="LONG BREAK" >LONG BREAK</Radio.Button>
        </Radio.Group>
      </div>
      <div>
        {state == "WORK" ?  <Image src={workImage} preview={false} width="300px"/>:  state=="SHORT BREAK" ?  <Image src={shortBreakImage} preview={false} width="300px"/> 
            :  <Image src={longBreakImage} preview={false} width="300px"/>}
      </div>
      <div style={{marginLeft: "auto", marginRight: "auto", marginTop: "20px", color: "#ffece4", width:"50%", textAlign:"center", fontWeight: "bold", fontSize: "95px"}}>
        {Math.floor(counter/60)}:{counter % 60}
      </div>
      <div style={{marginLeft: "auto", marginRight: "auto", width:"50%", textAlign:"center"}}>
        <UndoOutlined style={{fontSize: "60px", marginRight: "12px", color: "#ffece4"}} onClick={()=>{setIsPause(true); updateTime(state);}}/>
        <CaretRightOutlined style={{fontSize: "60px", color: "#ffece4"}} onClick={()=>setIsPause(false)} />
        <PauseOutlined style={{fontSize: "60px", color: "#ffece4"}} onClick={()=>setIsPause(true)}/>
      </div>
      <div style={{marginLeft: "auto", marginRight: "auto", width:"50%", textAlign:"center", marginTop:"10px"}}>
        {state !="WORK" && <Checkbox checked={isMusicPlaying} onChange={(e)=>setIsMusicPlaying(e.target.checked)} style={{color:"#ffece4", fontWeight: "bold"}}>PLAY MUSIC</Checkbox>}
      </div>
    </div>
  )
}

Contents.prototype = {
  backgroundColor: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  setState: PropTypes.func.isRequired,
  timeWork: PropTypes.number.isRequired,
  shortBreak: PropTypes.number.isRequired,
  longBreak: PropTypes.number.isRequired,
};

export default Contents;