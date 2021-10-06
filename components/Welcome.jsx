const Welcome = ({ setStep }) => {
  return (
    <div className="landing">
      <h1>
        <span>Listless</span> lets you block harassing list.
      </h1>
      <p>
        Trolls use lists to harass and supress. This site lets you block
        all of the of the users that subscribe to a list.
      </p>
      <p>
        Adapted from{" "}
        <a
          href="https://megablock.xyz"
          target="_blank"
          rel="noopener noreferrer"
        >
          MegaBlock
        </a>
        .
      </p>
      <button className="get_started_button" onClick={() => setStep(1)}>
        Get Started
      </button>
    </div>
  );
}

export default Welcome