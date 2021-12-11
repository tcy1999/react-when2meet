import {useCallback, useState, Dispatch, SetStateAction} from 'react';
import classNames from "classnames";
import update from 'immutability-helper';

type HourCellProps =  {
  row: string;
  col: string;
  user: string;
  select: boolean;
  callback: Dispatch<SetStateAction<Map<string, Set<string>>>>;
}

const HourCell: React.FC<HourCellProps> = function ({row, col, user, select, callback}){
  const [selected, setSelected] = useState(select);
  const handleClick = useCallback((row:string, col:string, user: string, selected:boolean) => {
    callback(prevMap => {
      const key = `${col}-${row}`;
      if (selected) {
        return update(prevMap, {[key]: {$add: [user]}});
      } else {
        return update(prevMap, {[key]: {$remove: [user]}});
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