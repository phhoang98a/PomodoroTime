import React, { useEffect, useState } from 'react';
import "./style.less"
import { updateSettings, getSettings } from "../utils/settingsUtils";
import PropTypes from "prop-types";
import { SettingOutlined } from "@ant-design/icons";
import { Radio, Modal, Form, InputNumber } from 'antd';

const SettingModal = ({open, setOpen, setTimeWork, setShortBreak, setLongBreak}) =>{
  const [timeWorkSetting, setTimeWorkSetting] = useState(0);
  const [shortBreakSetting, setShortBreakSetting] = useState(0);
  const [longBreakSetting, setLongBreakSetting] = useState(0);

  useEffect(()=>{
    const {timeWork, shortBreak, longBreak} = getSettings();
    setTimeWorkSetting(timeWork);
    setLongBreakSetting(longBreak);
    setShortBreakSetting(shortBreak);
  }, [open])

  const Save = () =>{
    setTimeWork(timeWorkSetting);
    setLongBreak(longBreakSetting);
    setShortBreak(shortBreakSetting);
    updateSettings({timeWork:timeWorkSetting, shortBreak:shortBreakSetting, longBreak:longBreakSetting});
    setOpen(false);
  };

  return (
    <Modal title="ENTER CUSTOMER TIMER" open={open} onOk={Save} okText="Save"
      okButtonProps={{style: {borderRadius: "15px", backgroundColor: "#cf433b", color: "#ffa900"}}} 
      cancelButtonProps={{style: {display: "none"}}} onCancel={()=>{setOpen(false)}}>
      <Form.Item label="Pomodoro">
        <InputNumber type="number" value={timeWorkSetting} onChange={(value)=>setTimeWorkSetting(value)} min={1} max={60} parser={(value) => value.replaceAll(",", "").replaceAll(".","")} />
      </Form.Item>
      <Form.Item label="Short break">
        <InputNumber type="number" value={shortBreakSetting} onChange={(value)=>setShortBreakSetting(value)} min={1} max={60} parser={(value) => value.replaceAll(",", "").replaceAll(".","")} />
      </Form.Item>
      <Form.Item label="Long break">
        <InputNumber type="number" value={longBreakSetting} onChange={(value)=>setLongBreakSetting(value)} min={1} max={60} parser={(value) => value.replaceAll(",", "").replaceAll(".","")} />
      </Form.Item>
    </Modal>
  )
}


const Setting = ({setBackgroundColor, backgroundColor, state, setTimeWork, setShortBreak, setLongBreak }) =>{
  const [open, setOpen] = useState(false)

  const onChange = (e) =>{
      updateSettings({backgroundColor:e.target.value});
      setBackgroundColor(e.target.value);
  };

  return (
    <>
      <div style={{ backgroundColor: backgroundColor }}>
        <div style={{
          backgroundColor: "#221F1F", width: "15%", marginLeft: "auto", marginRight: "auto", marginTop: "10px",
          borderTopLeftRadius: "5px", borderTopRightRadius: "5px", textAlign: "center"
        }}>
          <Radio.Group onChange={onChange} defaultValue="#C74646" style={{marginTop: "10px", marginBottom: "10px" }}>
            <Radio.Button className="button" value="#C74646" style={{ backgroundColor: "#C74646" }}></Radio.Button>
            <Radio.Button className="button" value="#CD6487" style={{ backgroundColor: "#CD6487" }}></Radio.Button>
            <Radio.Button className="button" value="#6A88DA" style={{ backgroundColor: "#6A88DA" }}></Radio.Button>
            <Radio.Button className="button" value="#F4A460" style={{ backgroundColor: "#F4A460" }}></Radio.Button>
          </Radio.Group>
          <SettingOutlined onClick={()=>{setOpen(true)}} style={{ fontSize: "18px", color: "white" }} spin />
        </div>
        <div style={{
          backgroundColor: "#373030", width: "15%", marginLeft: "auto", marginRight: "auto", textAlign: "center",
          paddingTop: "4px", paddingBottom: "4px", borderBottomLeftRadius: "5px", borderBottomRightRadius: "5px", color: "#da4c56"
        }}>
          {state}
        </div>
      </div>
      <SettingModal 
        open = {open}
        setOpen = {setOpen}
        setTimeWork = {setTimeWork}
        setShortBreak = {setShortBreak}
        setLongBreak = {setLongBreak}    
      />
    </>
  )

}

Setting.prototype = {
  setBackgroundColor: PropTypes.func.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  setTimeWork: PropTypes.func.isRequired,
  setShortBreak: PropTypes.func.isRequired,
  setLongBreak: PropTypes.func.isRequired,
};

SettingModal.prototype = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  setTimeWork: PropTypes.func.isRequired,
  setShortBreak: PropTypes.func.isRequired,
  setLongBreak: PropTypes.func.isRequired,
};

export default Setting;