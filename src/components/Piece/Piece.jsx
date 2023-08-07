import React from 'react';
import './Piece.css'
export default function Piece(props) {
    const type = props.type
    const color = props.color
    // const onClick = props.onClick
    let pieceTypes = {
        'b': 'bishop',
        'k': 'king',
        'n': 'knight',
        'p': 'pawn',
        'q': 'queen',
        'r': 'rook'
    }
    let pieceName = pieceTypes[type];
    if (color === 'b') {
        pieceName += '-b'
    }
    else pieceName += '-w'
    const imageUrl = require(`../../assets/images/pieces/${pieceName}.svg`);
    let className = 'piece'
    if(props.selected === props.pos) {
        className += ' selected'
    }
    return (
        <img className={className} src={imageUrl} alt='bishop' onDragStart={(e) => e.preventDefault()}></img>
    )
}