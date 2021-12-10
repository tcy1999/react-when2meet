import HourCell from './HourCell';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import { Dispatch, SetStateAction } from 'react';
import { cellCount } from './EventDisplay';

type TimeSelectorProps = {
  user: string,
  rows: Array<string>,
  cols: Array<string>,
  countMap: Map<string, cellCount>,
  callback: Dispatch<SetStateAction<Map<string, cellCount>>>;
}

// TODO: hover, 记住选择的格子(localStorage?firebase?),
// 给每个event单开界面(uuid?), 拖拽, 时区, ui (如重写responsible table), key, memo

const TimeSelector: React.FC<TimeSelectorProps> = function ({ user, rows, cols, countMap, callback }) {
  return (
    <div className='time-selector'>
      <div className='d-inline-flex'>
        Unavailable
        <div className="cellDisplay unselected marginleft"></div>
        <div className="cellDisplay selected marginright"></div>
        Available
      </div>
      <div className="row">Click calendar cells to toggle</div>
      <Table>
        <Thead>
          <Tr>
            <Th scope="col"></Th>
            {cols.map(
              (i) => <Th scope="col">{i}</Th>)
            }
          </Tr>
        </Thead>
        <Tbody>
          {
            rows.map((row) =>                 
            <Tr>
              <Th scope="row">{row.split(':')[1].includes("00") && row}</Th>
              {
              cols.map(
              (col) => <Td><HourCell row={row} col={col} user={user} select={
                countMap.get(`${col}-${row}`)!.available.has(user)
              } callback={callback}/></Td>)
              }
            </Tr>)
          }  
        </Tbody>
      </Table>
    </div>
  )
}

export default TimeSelector;