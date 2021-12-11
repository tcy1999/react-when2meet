import {useCallback, useState, Dispatch, SetStateAction} from 'react';
import classNames from "classnames";
import update from 'immutability-helper';
import { getDataModel } from './DataModel';

type HourCellProps =  {
  row: string,
  col: string,
  user: string,
  select: boolean,
  callback: Dispatch<SetStateAction<Map<string, Set<string>>>>,
}

const HourCell: React.FC<HourCellProps> = function ({row, col, user, select, callback}){
  const [selected, setSelected] = useState(select);
  const dataModel = getDataModel();
  const handleClick = useCallback((row:string, col:string, user: string, selected:boolean) => {
    callback(prevMap => {
      const key = `${col}-${row}`;
      if (selected) {
        dataModel.addItem(`${col}-${row}`, user);
        return update(prevMap, {[key]: {$add: [user]}});
      } else {
        dataModel.deleteItem(`${col}-${row}`, user);
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