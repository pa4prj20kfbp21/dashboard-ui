import { useEffect, useState } from "react";
import Requests from "../Utils/Requests";

import "./PopUpCommonInfo.css";


/*
  InfoId or Info as props.
  
  InfoId being the Id of ObjectData.
    Displays the Data field of ObjectData, also takes to account empty field.

  Info can be the JSON list of displayed data.
*/
function PopUpCommonInfo(props){
  const [information, setInformation] = useState([]);

  useEffect(async () => {
    if(props.infoId){
      const getImageData = await Requests.fetchObjectInfo(props.infoId);
      const data = getImageData.ok ? await getImageData.json() : {};
      const neededData = data.Data || {};

      try{
        const keys = Object.keys(neededData);
        let newInfo = [];
        let i = 0;
        for (const key of keys) newInfo.push(<h4 key={i++}>{`${key}: ${neededData[key]}`}</h4>);
        setInformation(newInfo);
      }catch(err){
        setInformation([]);
      }
    }else if(props.info){
      try{
        let dataString = [];
        let i = 0;
        const keys = Object.keys(props.info);
        for (const key of keys) dataString.push(<h4 key={i++}>{`${key}: ${props.info[key]}`}</h4>);
        setInformation(dataString);
      }catch(err){
        setInformation([]);
      }
    }
  }, []);

  return (
    <div className="PopUpCommonInfo">
      <h4>Press the info button again to close!</h4>
      {information}
    </div>
  );
}

export default PopUpCommonInfo;