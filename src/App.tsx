import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import EventDisplay from "./EventDisplay";
import Home from "./Home";
import moment from "moment";
import { EventProps } from "./EventDisplay";

export const DEFAULT_INPUT = {
  eventName: 'New Event',
  timeZone: 'America/New_York',
  startDate: moment(new Date()).format('YYYY-MM-DD'),
  numDays: 7,
  startTime: 8,
  endTime: 20
}

function App () {
  const [eventParams, setEventParams] = useState(DEFAULT_INPUT);
  let {eventName, timeZone, startDate, numDays, startTime, endTime} = eventParams;

  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home callback={(params:EventProps) => setEventParams(params)}/>}/>
          <Route path="/event" element={<EventDisplay eventName={eventName} timeZone={timeZone} 
          startDate={startDate} numDays={numDays} startTime={startTime} endTime={endTime}></EventDisplay>}/>
        </Routes>
      </Router>
  );
}

export default App;
