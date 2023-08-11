import * as React from 'react';
import './Chessboard.css';
import { Chess } from 'chess.js'
import { useState } from 'react';
import Piece from '../Piece/Piece';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';


const Chessboard = () => {

    const [selected, setSelected] = useState(null);
    const [promotion, setPromotion] = useState(null);
    const [chess] = useState(new Chess());
    const cellArray = []
    // const cellArray = useRef([]).current //使用useRef后程序无法正常工作； 改为上面的写法或者去掉Popover组件后正常，为什么？


    function handleClick(e, pos) {
        e.preventDefault();
        console.log(selected)
        if (selected == null) {
            if (chess.get(pos)) {
                setSelected(pos)
            }
        }
        else {
            let moves = chess.moves({ square: selected, verbose: true });
            let legal = moves.find(move => move.to === pos);
            if (legal && legal.flags.includes('p')) {
                setPromotion(legal)
                return;
            }
            if (legal) {
                chess.move(legal.san)
            }
            setSelected(null)
        }

    }

    function handlePromotion(target) {
        if (target == null) {
            setPromotion(null);
            return;
        }
        chess.move({ from: promotion.from, to: promotion.to, promotion: target })
        setSelected(null)
        setPromotion(null)
    }

    let board = chess.board()

    for (let i = 0; i < 8; i++) {
        cellArray[i] = Array(8);
        for (let j = 0; j < 8; j++) {
            let piece = board[i][j];
            let pos = String.fromCharCode('a'.charCodeAt(0) + j) + (8 - i)
            let className = 'cell'
            className += (i + j) % 2 === 0 ? ' whitecell' : ' blackcell'
            let cell =
                <div id={pos} key={pos} className={className} onClick={(e) => handleClick(e, pos)}>
                    {
                        piece &&
                        <Piece key={piece.color === 'w' ? piece.type.toUpperCase() : piece.type} type={piece.type} color={piece.color} pos={pos} selected={selected} />
                    }
                    {
                        selected && chess.moves({ square: selected, verbose: true }).find(move => move.to === pos) &&
                        <div className='circle'></div>
                    }
                </div>
            cellArray[i][j] = cell
        }
    }

    return (
        <div>
            <div className="chessboard" key="chessboard">
                {cellArray}
                <Popover
                    open={promotion != null}
                    onClose={() => handlePromotion(null)}
                    anchorEl={promotion && document.getElementById(promotion.to)}
                >
                    <div className='grid-container'>
                        <Button className='grid-item' onClick={() => handlePromotion('q')}>queen</Button>
                        <Button className='grid-item' onClick={() => handlePromotion('r')}>rook</Button>
                        <Button className='grid-item' onClick={() => handlePromotion('b')}>bishop</Button>
                        <Button className='grid-item' onClick={() => handlePromotion('n')}>knight</Button>
                    </div>
                </Popover>
            </div>
        </div>
    );
};

export default Chessboard;