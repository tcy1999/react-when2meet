import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import { cellCount } from './EventDisplay';
import HourCellDisplay from './HourCellDisplay';

type TimeDisplayerProps = {
  userNum: number,
  rows: Array<string>,
  cols: Array<string>,
  countMap: Map<string, cellCount>
}

const TimeDisplayer: React.FC<TimeDisplayerProps> = function ({ userNum, rows, cols, countMap }) {
  return (
    <div className='time-selector'>
      <Table className='mytable'>
        <Thead>
          <Tr>
            <Th scope="col"></Th>
              {cols.map((i) => <Th scope="col">{i}</Th>)}
          </Tr>
        </Thead>
        <Tbody>
          {
            rows.map((row) =>                 
            <Tr>
              <Th scope="row">{row}</Th>
              {
                cols.map(
                (col) => <Td><HourCellDisplay userNum={userNum} 
                count={countMap.get(`${col}-${row}`)!.available.size}/></Td>)
              }
            </Tr>)
          }  
        </Tbody>
      </Table>
  </div>
  )
}

export default TimeDisplayer;
