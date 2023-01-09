import React from "react"

import "./styles.css"

export default function Gift(props) {
    const { giftNo, helicopter, status, setCurrent } = props
    const source = helicopter ? "/images/seta.png" : "/images/mistery.png"
    const alignment = giftNo % 2 === 0 ? "center" : giftNo % 3 === 0 ? "end" : "start"

    return (
        <div
            className="container"
            style={{
                filter: status ? "" : "grayscale(80%)",
                alignSelf: alignment
            }}
            onClick={() => setCurrent(giftNo)}
        >
            <img className="image" src={source} alt="Gift" />
            <div className="centered">{giftNo}</div>
        </div>
    )
}
