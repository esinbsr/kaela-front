import { useState } from 'react';
import { IoAccessibilitySharp } from 'react-icons/io5';
import { MdTextDecrease, MdTextIncrease } from 'react-icons/md';
import '../../assets/styles/components/_accessibility.scss';

const Accessibility = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dyslexicFont, setDyslexicFont] = useState(false);
  const [lineSpacing, setLineSpacing] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const changeTextSize = (size) => {
    document.documentElement.style.fontSize = size;
  };

  const changeFont = () => {
    setDyslexicFont(!dyslexicFont);
    document.body.classList.toggle('dyslexic-font');
  };

  const changeLineSpacing = () => {
    setLineSpacing(!lineSpacing);
    document.body.classList.toggle('increased-line-height');
  };

  return (
    <>
      <button onClick={toggleModal} aria-label="Open accessibility options" className='accessibility-btn'>
      <IoAccessibilitySharp/>
      </button>

      {isModalOpen && (
        <div className="accessibility">
          <div 
            role="dialog" 
            aria-labelledby="modal-title" 
            aria-describedby="modal-description"
            aria-modal="true" 
            className="accessibility-modal" 
          >
            <h2 id="modal-title">Accessibility Options</h2>
            <p id="modal-description">Select the accessibility options to adjust as per your needs.</p>

            <div className="option-group">
              <label>Text Size:</label>
              <div className="btn-group">
                <button onClick={() => changeTextSize('1.2rem')}><MdTextIncrease /></button>
                <button onClick={() => changeTextSize('1rem')}>Normal</button>
                <button onClick={() => changeTextSize('0.8rem')}><MdTextDecrease /></button>
              </div>
            </div>

            <div className="option-group">
              <label>Line Spacing:</label>
              <button onClick={changeLineSpacing}>
                {lineSpacing ? 'Disable increased line spacing' : 'Increase line spacing'}
              </button>
            </div>

            <div className="option-group">
              <label>Readable Font:</label>
              <button onClick={changeFont}>
                {dyslexicFont ? 'Disable readable font' : 'Enable readable font'}
              </button>
            </div>

            <button onClick={toggleModal}>Close</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Accessibility;