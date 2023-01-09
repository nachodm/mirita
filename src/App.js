import { gifts } from "./gifts"
import "./App.css"
import Gift from "./components/Gift"
import { useEffect, useState } from "react"
import ConversationGuides from "./components/ConversationGuides"
import Countdown from "react-countdown"

function App() {
    const styles = {
        backgroundImage: `url(${process.env.PUBLIC_URL + "/bg.jpg"})`,
        maxWidth: "100%",
        fontSize: "2rem",
        backgroundSize: "cover",
        padding: "0rem 2rem",
        paddingTop: "3rem"
    }

    const renderer = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
            // Render a completed state
            return
        } else {
            return (
                <div className="text">
                    <span>{hours} h</span> <span>{minutes} m</span> <span>{seconds} s</span>
                </div>
            )
        }
    }
    const audio = new Audio("/mario.mp3")

    const start = () => {
        audio.play()
    }
    const [display, setDisplay] = useState(true)
    const [current, setCurrent] = useState(2)
    const [blocked, setBlocked] = useState(() => {
        const saved = localStorage.getItem("status")
        const initialValue = JSON.parse(saved)
        return initialValue || new Array(20).fill(false)
    })

    useEffect(() => {
        setBlocked((data) => ({ ...data, 0: true, 1: true }))
    }, [])

    useEffect(() => {
        localStorage.setItem("status", JSON.stringify(blocked))
    }, [blocked])

    return (
        <div className="App" style={styles}>
            <h2 className="text">Adventure's day is here!</h2>
            <Countdown date={new Date("2023-01-09T16:00:00")} renderer={renderer} />
            {[...Array(21).keys()].slice(1).map((x, i) => {
                return <Gift giftNo={i + 1} key={i} helicopter={[6, 19, 20].includes(i + 1)} status={blocked[i]} current={current} setCurrent={setCurrent} />
            })}
            <img className="finish" src="/images/endingMario.png" alt="Finish" onClick={start} />
            {/*display && <ConversationGuides text={gifts[current].text} imageKey={gifts[current].imageKey} setDisplay={setDisplay} />*/}
        </div>
    )
}

export default App
