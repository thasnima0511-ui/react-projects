import React from "react";
import "../css/WalletBankCard.css";
import { useState } from "react";

const WalletBankCard: React.FC = () => {
 const [selected, setSelected] = useState(true);

  const toggleSelection = () => {
    setSelected(!selected);
  };

  return (
    <div className="wallet-bank-card">
      <div className="wallet-bank-left">
        <img src="/images/walletBankCard.png" alt="icon" className="wallet-bank-icon" />
      </div>
      <div className="wallet-bank-right">
        <div className="wallet-bank-option" onClick={toggleSelection}>
      <div className="wallet-bank-top">
        <img src="/images/masterCard.png" alt="Card Icon" className="wallet-bank-image" />
        {selected && (
          <span className="wallet-bank-tick">✔</span>
        )}
      </div>
      <div className="wallet-bank-label">Bank Card</div>
    </div>
      </div>
    </div>
  );
};

export default WalletBankCard;
