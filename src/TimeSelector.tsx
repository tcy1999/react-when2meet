import HourCell from './HourCell';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import { Dispatch, SetStateAction } from 'react';

type TimeSelectorProps = {
  user: string,
  rows: Array<string>,
  cols: Array<string>,
  callback: Dispatch<SetStateAction<Array<cellCount>>>;
}

// TODO: 展示不同用户选择的格子（渐变色），记住选择的格子(localStorage?firebase?)，给每个event单开界面(uuid?), 拖拽, 检查结果
export type cellCount = {
  key: string;
  unavailable: Array<string>;
  available: Array<string>;
};

const TimeSelector: React.FC<TimeSelectorProps> = function ({ user, rows, cols, callback }) {
  return (
    <div className='time-selector'>
      <Table className='mytable'>
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
              <Th scope="row">{row}</Th>
              {
              cols.map(
              (col) => <Td><HourCell row={row} col={col} user={user}
              callback={callback}></HourCell></Td>)
              }
            </Tr>)
          }  
        </Tbody>
      </Table>
    </div>
  )
}

export default TimeSelector;