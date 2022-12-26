import pic from "./images/pic.gif"
import "./App.css"
import Countdown from "react-countdown"

const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
        // Render a completed state
        return <div>Eureka</div>
    } else {
        return (
            <div style={{ fontFamily: "fantasy" }}>
                <span>{days} day</span> <span>{hours} hrs</span> <span>{minutes} min</span> <span>{seconds} sec</span>
            </div>
        )
    }
}

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={pic} className="App-logo" alt="logo" />
                <p>The adventure's day is coming... stay tuned</p>
                <Countdown date={new Date("2023-01-09T00:00:00")} renderer={renderer} />
            </header>
        </div>
    )
}

export default App
