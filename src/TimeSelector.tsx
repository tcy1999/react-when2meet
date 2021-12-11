import HourCell from './HourCell';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import { Dispatch, SetStateAction } from 'react';

type TimeSelectorProps = {
  user: string,
  rows: Array<string>,
  cols: Array<string>,
  countMap: Map<string, Set<string>>,
  callback: Dispatch<SetStateAction<Map<string, Set<string>>>>,
}

// TODO: 改结构, listener,
// 拖拽, 不同时区, 检查输入, ui (如重写responsible table), 代码优化(performance, 结构)
// key, memo, accessibility, 选日子选项(weekday), more functions like sharing/priting

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
                countMap.get(`${col}-${row}`)!.has(user)
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