const ATMDeposit = ({ onChange, isDeposit, isValid }) => {
    const choice = ['Deposit', 'Cash Back'];
    console.log(`ATM isDeposit: ${isDeposit}`);
    return (
      <label className="label huge">
        <h3> {choice[Number(!isDeposit)]}</h3>
        <input id="number-input" type="number" width="200" onChange={onChange}></input>
        <input type="submit" disabled={!isValid} width="200" value="Submit" id="submit-input"></input>
      </label>
    );
  };

  
  
  const Account = () => {
    const [deposit, setDeposit] = React.useState(0);
    const [totalState, setTotalState] = React.useState(0);
    const [isDeposit, setIsDeposit] = React.useState(true);
    const [validTransaction, setValidTransaction] = React.useState(false);
    const [atmMode, setAtmMode] = React.useState('');
    const [greeting, setGreeting] = React.useState(true)
  
    let status = `Account Balance $ ${totalState} `;
    console.log(`Account Rendered with isDeposit: ${isDeposit}`);
    const handleChange = (event) => {
      console.log(`handleChange ${event.target.value}`);
      if (Number(event.target.value) <= 0){
        return setValidTransaction(false);
      }
      if (atmMode==='Cash Back' && Number(event.target.value) > totalState){
        return setValidTransaction(false);
      }
      else {
        setValidTransaction(true)
      }
      setDeposit(Number(event.target.value));
    };
    const handleSubmit = (event) => {
      let newTotal = isDeposit ? totalState + deposit : totalState - deposit;
      setTotalState(newTotal);
      setValidTransaction(false);
      event.preventDefault();
    };
    const handleModeSelect = (event) => {
      let operation = event.target.value;
      setAtmMode(operation);
      setValidTransaction(false);
      if (!operation) return;
      if (operation === 'Deposit') {
        setIsDeposit(true);
      };
      if (operation === 'Cash Back') {
        setIsDeposit(false);
      };
    }
    const Greeting = () => {

        return (
          <div id="greeting-page">
            <img src="bank icon.jpg" id="logo"></img>
            <h2 id="greeting"> We welcome you in our international bank of Poland!</h2>
            <img src="handshake.jpg" id="greeting-image"></img>
            <br></br>
            <button onClick={event => setGreeting(false)} id="continue-button">Continue to operations</button>
             
            
          </div>
        );
      };
      // ========================================
      //ReactDOM.render(<Greeting />, document.getElementById('root'));
  
    return (
        <div>
        {greeting && (<Greeting></Greeting>)}
      {!greeting && (<form onSubmit={handleSubmit} className="bank-form">
        <img src="bank icon.jpg" id="logo"></img>
        <h2 id="total">{status}</h2>
        <label>Select an action below to continue</label>
          <select onChange={(e) => handleModeSelect(e)} name="mode" id="mode-select">
            <option id="no-selection" value=""></option>
            <option id="deposit-selection" value="Deposit">Deposit</option>
            <option id="cashback-selection" value="Cash Back">Cash Back</option>
          </select>
        {atmMode && (<ATMDeposit onChange={handleChange} isDeposit={isDeposit} isValid={validTransaction}></ATMDeposit>)}
      </form>)}
      </div>
    );
  };
  // ========================================
  ReactDOM.render(<Account />, document.getElementById('root'));