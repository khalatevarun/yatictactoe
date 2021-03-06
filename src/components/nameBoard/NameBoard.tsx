import './nameBoard.css';

import { useState } from 'react';

import { initializeGame } from '../../redux/actions/gameActions';
import { useAppDispatch } from '../../redux/store/hooks';

const NameBoard = () => {
  const dispatch = useAppDispatch();
  const [player1Name, setPlayer1Name] = useState('');
  const [player2Name, setPlayer2Name] = useState('');
  const [undoMovesPerPlayer, setUndoMovesPerPlayer] = useState(2);
  const [errorMessage, setErrorMessage] = useState('');

  const fieldOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setErrorMessage('');
    const { name, value } = e.target;
    switch (name) {
      case 'player1-name':
        setPlayer1Name(value.trim());
        break;
      case 'player2-name':
        setPlayer2Name(value.trim());
        break;
      case 'undomoves-perplayer':
          setUndoMovesPerPlayer(Number(value));
        break;
     
    }
  };

  const formOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(player1Name.toLowerCase() === player2Name.toLowerCase()){
      // players cant have same name
      setErrorMessage("Both players can't have the same. Please enter unique names.");
      return;
    }
    else if(undoMovesPerPlayer > 10 || undoMovesPerPlayer < 0){
      // undo mover per player can be only between 0 - 10.
      setErrorMessage("Please enter undo mover per player between 0 - 5.");
      return;
    }
    // else if (player1Name !== '' && player2Name !== '') {
    //   dispatch(initializeGame({
    //     players:{
    //         player1: player1Name,
    //         player2: player2Name
    //             },
    //     undoMovesPerPlayer:undoMovesPerPlayer,
    //   }));
    // }
    // else{
    //   return;
    // }
    else{
        dispatch(initializeGame({
        players:{
            player1: player1Name,
            player2: player2Name
                },
        undoMovesPerPlayer:undoMovesPerPlayer,
      }));
    }
  };

  return (
    <div className='name-board-container'>
        <div className='name-board-inner-container'>
          <h3 className='modal-heading'>
            Get Onboarded
          </h3>
          <form onSubmit={formOnSubmit} className="name-board-form">
            <div className='name-board-field-container'>
              <label
                htmlFor='player1-name' 
                className={`name-board-text-field-label${player1Name === '' ? '' : ' value-filled'}`}
              >
                Player 1 Name
              </label>
              <input 
                type='text' 
                id='player1-name' 
                name='player1-name' 
                value={player1Name} 
                onChange={fieldOnchange} autoFocus
              />
            </div>
            <div className='name-board-field-container'>
              <label 
                htmlFor='player2-name' 
                className={`name-board-text-field-label${player2Name === '' ? '' : ' value-filled'}`}
              >
                Player 2 Name
              </label>
              <input 
                type='text' 
                id='player2-name' 
                name='player2-name' 
                value={player2Name} 
                onChange={fieldOnchange}
              />
            </div>
            <div className='name-board-field-container'>
              <label 
                htmlFor='undomoves-perplayer' 
                className={`name-board-text-field-label value-filled`}
              >
                Undo Moves Per Player
              </label>
              <input 
                type='number'
               
                id='undomoves-perplayer' 
                name='undomoves-perplayer' 
                value={undoMovesPerPlayer} 
                onChange={fieldOnchange}
              />
            </div>
            <small className='name-board-text-error'>{errorMessage}</small>
            
            <div className='name-board-field-container'>
              <input 
                type='submit' 
                className='primary-button name-board-submit-button' 
                aria-label='Play' 
                value='Play' 
                disabled={player1Name === '' || player2Name === ''} 
              />
            </div>
          </form>
        </div>          
    </div>
  )
};

export default NameBoard;
