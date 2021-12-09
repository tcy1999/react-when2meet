import { useState } from 'react';

type HourCellDisplayProps =  {
  userNum: number;
  count: number;
}

const START_COLOR ={
  r: 255,
  g: 255,
  b: 255
}

const END_COLOR = {
  r: 17,
  g: 103,
  b: 177
}

const DIFF_COLOR = {
  r: END_COLOR.r - START_COLOR.r,
  g: END_COLOR.g - START_COLOR.g,
  b: END_COLOR.b - START_COLOR.b,
}

const getColor = function(count: number, userNum:number) {
  const percent = count / userNum;
  return `rgb(${Math.round(START_COLOR.r + percent*DIFF_COLOR.r)}, ${Math.round(START_COLOR.g + 
    percent*DIFF_COLOR.g)}, ${Math.round(START_COLOR.b + percent*DIFF_COLOR.b)})`;
}

const HourCellDisplay: React.FC<HourCellDisplayProps> = function ({userNum, count}){
    const [hover, setHover] = useState(false);

    return (
      <div className="cellDisplay" style={{backgroundColor:getColor(count, userNum)}}>
      </div>
    )
}

export default HourCellDisplay;