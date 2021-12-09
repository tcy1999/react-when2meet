import { useState, useRef } from "react";
import moment from 'moment-timezone';
import TimeSelector from "./TimeSelector";
import TimeDisplayer from "./TimeDisplayer";
import update from 'immutability-helper';

export type cellCount = {
  unavailable: Set<string>;
  available: Set<string>;
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
  const [users, setUsers] = useState(new Set());
  const [currentUser, setCurrentUser] = useState('');
  const inputEl = useRef(null);

  const cols = range(0, numDays, 1).map((i) => 
  moment(startDate).tz(timeZone).add(i, 'days').format('MMM DD'));
  const rows = generateHours(startTime, endTime);
  let initMap = new Map();
  for (const row of rows) {
    for (const col of cols) {
      initMap.set(`${col}-${row}`, {unavailable: users, available: new Set()});
    }
  }
  const [countMap, setCountMap] = useState<Map<string, cellCount>>(initMap);

  return (
    <div className="container">
      <h1>{eventName}</h1>
      <div className="row">
        <div className="col-md">
          {currentUser ? 
          <div>
            <h2>{currentUser}'s Availability
              <button className="btn btn-outline-secondary marginleft" onClick={() => {
                setCurrentUser('');
              }}>Sign out</button>
            </h2>
            <TimeSelector user={currentUser} rows={rows} cols={cols} countMap={countMap} callback={setCountMap}/>
          </div>
          :
          <div className="col-md">
            <div className="row">
              <label className="col-md-3" htmlFor="user">Your name:</label>
              <div className="col-md-5">
                <input className="form-control" type="text" id="user" 
                  ref={inputEl}/>
              </div>
            </div>
            <div className="row margintop">
              <div className="offset-md-3 col-md-5">
                <button className="btn btn-outline-secondary w-100" onClick={() => {
                setCurrentUser((inputEl as any).current.value);
                setUsers(update(users, {$add: [(inputEl as any).current.value]}));
                }}>Sign in</button>
              </div>
            </div>
          </div>
          }
        </div>
        <div className="col-md">
          <h2>Group's Availability</h2>
          <TimeDisplayer userNum={users.size} rows={rows} cols={cols} countMap={countMap}/>
        </div>
      </div>
    </div>
  );
}

export default EventDisplay;
