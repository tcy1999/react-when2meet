import { Dispatch, SetStateAction } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import moment from 'moment-timezone';
import { range } from './EventDisplay';
import HourCellDisplay, { getColor } from './HourCellDisplay';

type TimeDisplayerProps = {
  startDate: string,
  timeZone: string,
  users?: Set<string>,
  rows: Array<string>,
  cols: Array<string>,
  countMap: Map<string, Set<string>>
  callback: Dispatch<SetStateAction<boolean>>;
}

const TimeDisplayer: React.FC<TimeDisplayerProps> = function ({ startDate, timeZone, users, rows, cols, 
  countMap, callback }) {
  const userNum = users!.size;
  return (
    <div className='time-selector' onMouseEnter={() => {
      callback(false)}}  onMouseLeave={() => {callback(true)}}>
      {userNum > 0 && <div className='d-inline-flex w-100 justify-content-center'>
        {`0/${userNum} Available`}
          <div className="w-100 d-inline-flex marginleft marginright" style={{border: "1px solid #ccc", 
          maxWidth: 100}}>
            {range(0, userNum + 1, 1).map(i => 
              <div 
              style={{width: `${100/userNum}%`, backgroundColor:getColor(i, userNum)}}>
              </div>
            )}
          </div>
       {`${userNum}/${userNum} Available`}
      </div>}
      <div className="row">Mouse hover the calendar to see who is available</div>
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
              <Th scope="row">{row.split(':')[1].includes("00") && row}</Th>
              {
                cols.map(
                (col, i) => <Td><HourCellDisplay date={moment(`${startDate} ${row}`, 
                "YYYY-MM-DD h:mm A").add(i, "days").tz(timeZone).format('llll z')} users={users} 
                available={countMap.get(`${col}-${row}`)} /></Td>)
              }
            </Tr>)
          }  
        </Tbody>
      </Table>
  </div>
  )
}

export default TimeDisplayer;
