import React, { useState } from "react"
import Confetti from "react-dom-confetti"
import "./styles.css"

export default function Gift(props) {
    const { giftNo, helicopter, status, setCurrent, current, setBlocked, setDisplay } = props
    const source = helicopter ? "/images/seta.png" : "/images/mistery.png"
    const alignment = giftNo % 2 === 0 ? "center" : giftNo % 3 === 0 ? "end" : "start"
    const [isExploding, setIsExploding] = useState(false)
    return (
        <div
            className="container"
            style={{
                filter: status ? "" : "grayscale(80%)",
                alignSelf: alignment
            }}
            onClick={() => {
                if (current === giftNo) {
                    if (status) {
                        setCurrent(giftNo + 1)
                        setIsExploding(true)
                        setDisplay(true)
                        setBlocked((data) => ({
                            ...data,
                            [giftNo]: true
                        }))
                    }
                    if (helicopter) {
                    }
                } else if (current > giftNo) {
                    alert("Pero si este ya lo has abierto, qué buscas aquí?")
                }
            }}
        >
            <img className="image" src={source} alt="Gift" />
            <div className="centered">{giftNo}</div>
            <Confetti active={isExploding} />
        </div>
    )
}
