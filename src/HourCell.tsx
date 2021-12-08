import {useCallback, useState, Dispatch, SetStateAction} from 'react';
import classNames from "classnames";
import update from 'immutability-helper';
import { cellCount } from './EventDisplay';

type HourCellProps =  {
  row: string;
  col: string;
  user: string;
  callback: Dispatch<SetStateAction<Array<cellCount>>>;
}

const HourCell: React.FC<HourCellProps> = function ({row, col, user, callback}){
  const [selected, setSelected] = useState(false);
  const handleClick = useCallback((row:string, col:string, user: string, selected:boolean) => {
    callback(prevMap => {
      const key = `${col}-${row}`;
      const idx = prevMap.findIndex((elem)=>elem.key === key);
      if (selected) {
          const unavailableIdx = prevMap[idx].unavailable.findIndex(elem=>elem===user);
          return update(prevMap, {[idx]: {available: {$push: [user]}, 
              unavailable: {$splice: [[unavailableIdx, 1]]}}});
      } else {
          const availableIdx = prevMap[idx].available.findIndex(elem=>elem===user);
          return update(prevMap, {[idx]: {unavailable: {$push: [user]}, 
              available: {$splice: [[availableIdx, 1]]}}});
      }
    });
  }, [callback]);
  
  return (
    <div className={classNames(selected ? 'selected' : 'unselected', 'cell')} 
    onClick={() => {
      setSelected(!selected);
      handleClick(row, col, user, !selected); 
    }}>
    </div>
  )
}

export default HourCell;