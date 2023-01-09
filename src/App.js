import { useEffect, useState } from "react"
import Confetti from "react-confetti"
import { gifts } from "./gifts"
import "./App.css"
import Gift from "./components/Gift"
import ConversationGuides from "./components/ConversationGuides"

function App() {
    const styles = {
        backgroundImage: `url(${process.env.PUBLIC_URL + "/bg.jpg"})`,
        maxWidth: "100%",
        fontSize: "2rem",
        backgroundSize: "cover",
        padding: "0rem 2rem",
        paddingTop: "3rem"
    }
    const audio = new Audio("/mario.mp3")

    const start = () => {
        audio.play()
    }
    const [welcome, setWelcome] = useState(() => {
        const saved = localStorage.getItem("welcome")
        const initialValue = JSON.parse(saved)
        if (initialValue !== null) return initialValue
        else return true
    })
    const [display, setDisplay] = useState(welcome ? true : false)
    const [current, setCurrent] = useState(2)
    const [blocked, setBlocked] = useState(() => {
        const saved = localStorage.getItem("status")
        const initialValue = JSON.parse(saved)
        return initialValue || new Array(20).fill(false)
    })

    useEffect(() => {
        if (!welcome && !display && current === 2) {
            setCurrent(3)
            setBlocked((data) => ({ ...data, 2: true }))
        }
    }, [welcome, current, display])

    useEffect(() => {
        setBlocked((data) => ({ ...data, 0: true, 1: true }))
    }, [])

    useEffect(() => {
        localStorage.setItem("status", JSON.stringify(blocked))
    }, [blocked])

    useEffect(() => {
        localStorage.setItem("welcome", JSON.stringify(welcome))
    }, [welcome])
    return (
        <div className="App" style={styles}>
            <h2 className="text">Adventure's day is here!</h2>
            {[...Array(21).keys()].slice(1).map((x, i) => {
                return (
                    <Gift
                        giftNo={i + 1}
                        key={i}
                        helicopter={[6, 16, 19, 20].includes(i + 1)}
                        status={blocked[i]}
                        setCurrent={setCurrent}
                        current={current}
                        setBlocked={setBlocked}
                        setDisplay={setDisplay}
                    />
                )
            })}
            <img className="finish" src="/images/endingMario.png" alt="Finish" onClick={start} />
            {welcome && (
                <ConversationGuides
                    text={gifts[current - 2].text}
                    current={current}
                    imageKey={gifts[current - 2].imageKey}
                    setWelcome={setWelcome}
                    setBlocked={setBlocked}
                />
            )}
            {display && !welcome && (
                <ConversationGuides
                    text={gifts[current - 1].text}
                    current={current}
                    imageKey={gifts[current - 1].imageKey}
                    setDisplay={setDisplay}
                    setBlocked={setBlocked}
                />
            )}
            {current >= 20 && <Confetti width={"100px"} height={"100px"} />}
        </div>
    )
}

export default App
