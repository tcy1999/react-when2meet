import { useState, useRef } from "react";
import moment from 'moment-timezone';
import HourCellDisplay from './HourCellDisplay';
import HourCell from './HourCell';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';

export type cellCount = {
  key: string;
  unavailable: Array<string>;
  available: Array<string>;
};

export type EventProps = {
  eventName: string,
  timeZone: string,
  startDate: string,
  numDays: number,
  startTime: number,
  endTime: number
}

const range = (start:number, end:number, delta:number) => {
  return Array.from(
    {length: (end - start) / delta}, (v, k) => (k * delta) + start
  )
};

const generateHours = (start:number, end:number) => {
  return Array.from({length: end-start}, (_, i) => i).reduce((result:string[], hour:number) => {
    result.push(moment({hour}).format('h:mm A'));
    result.push(moment({hour, minute: 30}).format('h:mm A'));
    return result;
  }, []);
}

const EventDisplay: React.FC<EventProps> = function ({ eventName, startDate, numDays, timeZone, 
  startTime, endTime}) {
  const [user, setUser] = useState('');
  const inputEl = useRef(null);

  const cols = range(0, numDays, 1).map((i) => 
  moment(startDate).tz(timeZone).add(i, 'days').format('MMM DD'));
  const rows = generateHours(startTime, endTime);
  let initMap = [];
  for (const row of rows) {
    for (const col of cols) {
      initMap.push({key: `${col}-${row}`, unavailable: [], available: []})
    }
  }
  const [countMap, setCountMap] = useState<Array<cellCount>>(initMap);

  return (
    <div className="container">
      <h1>{eventName}</h1>
      <div className="row">
        <div className="col-md">
          {user ? 
          <div>
            <h2>{user}'s Availability</h2>
            <div id='time-selector'>
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
                      callback={setCountMap}></HourCell></Td>)
                      }
                    </Tr>)
                  }  
                </Tbody>
              </Table>
            </div>
          </div>
          :
          <div>
            <div className="col-md"><label htmlFor="user">Your name:</label></div>
            <div className="col-md"><input className="form-control" type="text" id="user" 
                ref={inputEl}/></div>
            <button className="col-md btn btn-outline-secondary" onClick={() => {
              setUser((inputEl as any).current.value)}}>Sign in</button>
          </div>
          }
        </div>
        <div className="col-md">
          <h2>Group's Availability</h2>
          <div id='time-selector'>
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
        </div>
      </div>
    </div>
  );
}

export default EventDisplay;
