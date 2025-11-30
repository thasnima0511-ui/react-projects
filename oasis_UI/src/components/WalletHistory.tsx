import "../css/WalletHistory.css";
import { useState } from "react";
function WalletHistory() {
     const [showAll, setShowAll] = useState(false);
       const [balance, setBalance] = useState(100);
         const [showAddBalanceModal, setShowAddBalanceModal] = useState(false);
  const [newAmount, setNewAmount] = useState("");
       type Transaction = {
        id:number;
  type: string;
  status: string;
  amount: number;
};
const [transactions, setTransactions] = useState<Transaction[]>([
  {id:1, type: "Payment For Subscription", status:"completed",amount: 200 },
  { id:2,type: "Payment For Booking", status:"completed", amount: 100 },
    { id:3,type: "Payment For event", status:"completed", amount: 50 },
    { id:4,type: "Wallet Recharge", status:"completed", amount: 150 },
    { id:5,type: "Payment For Booking", status:"completed", amount: 300 },
    { id:6,type: "Payment For Subscription", status:"completed", amount: 700 }
]);
 const getImageUrl = (type: string): string => {
    console.log("Checking type:", `"${type}"`);
    if (type.includes("Payment For Subscription")) {
      return "/images/Subscription.PNG";
    } else if (type.includes("Payment For Booking")) {
      return "/images/booking.PNG";
    } else if (type.includes("Payment For event")) {
      return "/images/event1.PNG";
    } else {
      return "/images/recharge.PNG"; 
    }
  };
          const visibleTransactions = showAll ? transactions : transactions.slice(-5);  
          const handleAddBalance = () => {
  const amount = parseFloat(newAmount);
  if (!isNaN(amount) && amount > 0) {
    alert(`You entered ${amount} OMR`);
    setNewAmount("");
    setShowAddBalanceModal(false);
  } else {
    alert("Please enter a valid amount.");
  }
};
            
    return(
        <div className="wallet-history">
          <img src="/images/wallet1.png" className="wallet-image"/>
            <p className="wallet-text">Current Balance</p>
            <p className="wallet-text1"><b>{balance} OMR</b></p>
            <button className="wallet-button" onClick={() => setShowAddBalanceModal(true)}>Add Balance</button>
            <div className="wallet-transaction-header">
  <h3>Last Transaction</h3>
      <button
          className="wallet-see-all-btn"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "Show Less" : "See All"} <span className="arrow-head">›</span>
        </button>
</div>


 <div className="wallet-history1">
      {visibleTransactions.map(({ id,type, status, amount}) => (
        
        <div className="wallet-transaction-item" key={id}>
          <img src={getImageUrl(type)} alt={type} className="wallet-item-image" />
           {/* <img src={getImageUrl(type)} alt={type} className="wallet-image" /> */}

          <div className="wallet-item-details">
            <p className="wallet-item-type">{type}</p>
            <p className="wallet-item-status">{status}</p>
          </div>

          <p className="wallet-item-amount">{amount} OMR</p>
        </div>
      ))}
    </div>
       {showAddBalanceModal && (
        <div className="wallet-modal-overlay">
          <div className="wallet-content">
            <h5>Enter Amount</h5>
            <input
              type="number"
              placeholder="Enter amount"
              value={newAmount}
              onChange={(e) => setNewAmount(e.target.value)}
              className="wallet-amount-input"
            />
            <div className="wallet-modal-buttons">
              <button onClick={() => setShowAddBalanceModal(false)} className="wallet-cancel-btn">
                Cancel
              </button>
              <button onClick={handleAddBalance} className="wallet-pay-btn">
                Pay
              </button>
            </div>
          </div>
        </div>
      )}
        </div>
    );
}
export default WalletHistory;