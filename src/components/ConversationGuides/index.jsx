import React, { useState } from "react"
import { saveAs } from "file-saver"

import "./styles.css"
import Ryanair from "../../assets/Ryanair.pdf"
import Imola from "../../assets/imola.pdf"
import Cards from "../../assets/cardsagainst.pdf"

export default function ConversationGuides(props) {
    const { text, imageKey, setDisplay, current, setWelcome = null } = props
    const [currentText, setCurrentText] = useState(0)
    const source = "/images/" + imageKey + ".png"
    return (
        <div
            className="guide"
            onClick={() => {
                if (setWelcome !== null) setWelcome(false)
                else {
                    if (currentText + 1 < text.length) {
                        setCurrentText(currentText + 1)
                    } else {
                        setDisplay(false)
                        if (current === 20) saveAs(Ryanair, "Bologna.pdf")
                        else if (current === 21) {
                            const audio = new Audio("/f1.mp3")
                            audio.play()
                            saveAs(Imola, "Imola.pdf")
                        } else if (current === 17) saveAs(Cards, "cards.pdf")
                    }
                }
            }}
        >
            <div className="bubble bubble-bottom-left">
                {text[currentText]}
                <span className="dots">{currentText < text.length - 1 ? "..." : "."}</span>
            </div>
            <img className="figure" src={source} alt="Figure" />
        </div>
    )
}
