import React, { useState } from "react"

import "./styles.css"

export default function ConversationGuides(props) {
    const { text, imageKey, setDisplay } = props
    const [current, setCurrent] = useState(0)
    const source = "/images/" + imageKey + ".png"
    return (
        <div
            className="guide"
            onClick={() => {
                if (current + 1 < text.length) setCurrent(current + 1)
                else setDisplay(false)
            }}
        >
            <div className="bubble bubble-bottom-left">
                {text[current]}
                {current < text.length ? "..." : "."}
            </div>
            <img className="figure" src={source} alt="Figure" />
        </div>
    )
}
