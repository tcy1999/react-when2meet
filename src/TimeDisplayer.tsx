import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import { cellCount } from './TimeSelector';
import HourCellDisplay from './HourCellDisplay';

type TimeDisplayerProps = {
    rows: Array<string>,
    cols: Array<string>,
    countMap: Array<cellCount>
}

const TimeDisplayer: React.FC<TimeDisplayerProps> = function ({ rows, cols, countMap }) {
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
                (col) => <Td>{countMap[countMap.findIndex((elem)=>elem.key === `${col}-${row}`)].
                available.length}</Td>)
              }
            </Tr>)
          }  
        </Tbody>
      </Table>
  </div>
  )
}

export default TimeDisplayer;
