import { render } from 'react-dom';

type HourCellDisplayProps =  {
  date: string,
  users: Set<string>,
  available: Set<string> | undefined,
}

const START_COLOR ={ r: 255, g: 255, b: 255 }

const END_COLOR = { r: 17, g: 103, b: 177 }

const DIFF_COLOR = {
  r: END_COLOR.r - START_COLOR.r,
  g: END_COLOR.g - START_COLOR.g,
  b: END_COLOR.b - START_COLOR.b,
}

export const getColor = function(count: number, userNum:number) {
  const percent = count / userNum;
  return `rgb(${Math.round(START_COLOR.r + percent*DIFF_COLOR.r)}, ${Math.round(START_COLOR.g + 
    percent*DIFF_COLOR.g)}, ${Math.round(START_COLOR.b + percent*DIFF_COLOR.b)})`;
}

const HourCellDisplay: React.FC<HourCellDisplayProps> = function ({users, date, available}){
  return (
    <div className="cellDisplay" style={{backgroundColor:getColor(available!.size, users.size)}}
    onMouseEnter={() => {
      if(document.getElementById('placeholder'))
        render(<><h2>{date}</h2>
        <div className='row justify-content-center'>
          <div className='col-md-4'>
            Available
            {Array.from(available!.values()).map(i => <div>{i}</div>)}
          </div>
          <div className='col-md-4'>
            Unavailable
            {Array.from(users.values()).filter(x => !available!.has(x)).map(i => <div>{i}</div>)}
          </div>
        </div>
        </>, document.getElementById('placeholder'));
    }}>
    </div>
  )
}

export default HourCellDisplay;