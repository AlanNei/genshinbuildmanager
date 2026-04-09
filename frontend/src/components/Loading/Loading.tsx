import "./Loading.css";
import { Trefoil } from 'ldrs/react'
import 'ldrs/react/Trefoil.css'

function Loading() {
  return (
    <div className="loading">
    <Trefoil
        size="40"
        stroke="4"
        strokeLength="0.15"
        bgOpacity="0.1"
        speed="1.4"
        color="var(--color-secondary)" 
    />
    </div>
  );
}

export default Loading;