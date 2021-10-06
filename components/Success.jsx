const Success = () => {
    return (
        <div className="login_twitter landing">
          <h1>Success</h1>
          <p>We 🅱️locked that user and everyone who liked the post!</p>
          <img className="gif" src="https://i.pinimg.com/originals/47/12/89/471289cde2490c80f60d5e85bcdfb6da.gif" alt="MegaBlock Nuke" />
          <div className="progress_buttons">
            <button onClick={() => {setStep(0); setList("");}}>Back Home</button>
          </div>
        </div>
    );    
}

export default Success