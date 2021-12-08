import { useState } from 'react';
import classNames from "classnames";

type HourCellDisplayProps =  {
    user: string;
    count: number;
}

const HourCellDisplay: React.FC<HourCellDisplayProps> = function ({user, count}){
    const [hover, setHover] = useState(false);
    
    return (
    <div>
        {count}
    </div>
    )
}

export default HourCellDisplay;