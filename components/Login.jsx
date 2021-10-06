const Login = ({ handleLogin, session, setStep }) => {
  return (
      <div className="login_twitter landing">
        <h1>Login via Twitter</h1>
        <p>Get started by signing in with Twitter.</p>
        <p>
          We won't use your account in any other way than to block the people you ask us to.
        </p>
        {!session ? (
          // Manual redirection
          <button onClick={handleLogin} className="twitter_signin">
            <img src="/twitter-256.png" alt="Twitter logo" />
            <span>Login with Twitter</span>
          </button>
        ) : (
          <div className="profile">
            <img
              src={`https://twivatar.glitch.me/@${session.screen_name}`}
              alt="Profile picture"
            />
            <div>
              <span>{session.screen_name}</span>
              <button onClick={handleSignOut}>Sign out</button>
            </div>
          </div>
        )}
        <div className="progress_buttons">
          <button onClick={() => setStep(0)}>Go back</button>
          {!session ? (
            <button className="add_positivity disabled_button" disabled>
              Next step
            </button>
          ) : (
            <button onClick={() => setStep(2)} className="add_positivity">
              Next step
            </button>
          )}
        </div>
      </div>  
  )
}

export default Login