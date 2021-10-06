const Paste = ({ getListInfo, list, openModal, name, session, setList, setStep }) => {
    return (
        <div className="login_twitter landing">
          <h1>Paste the Twitter list URL</h1>
          <p>
            This will block the author of the list, and anyone who subscribes to
            the list too. Be sure you want to do this and confirm it is the list displayed below.
          </p>
          {name ? <p>List Name: {name}</p> : null}
          <input
            type="text"
            value={list}
            onChange={(e) => getListInfo(e.target.value)}
            className="twitter_input"
            placeholder="https://twitter.com/twitter/status/1234..."
          />
          <div className="progress_buttons custom_bottom_margin">
            <button onClick={() => {setStep(1); setList("")}}>Go back</button>
            {!session && list == '' ? (
              <button className="add_positivity disabled_button" disabled>
                Next step
              </button>
            ) : (
              <button onClick={openModal} className="megablock_button">
                Block!
              </button>
            )}
          </div>
        </div>
      );    
}

export default Paste