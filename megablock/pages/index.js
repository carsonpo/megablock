import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useSession, signin, signout } from "next-auth/client";
import { useState } from "react";

export default function Home() {
  const [step, setStep] = useState(0);
  const [s, ss] = useState(0);
  const [session, loading] = useSession();
  function renderContent() {
    switch (step) {
      case 0:
        return (
          <div className="login_twitter">
            <h1>Login via Twitter</h1>
            <p>
              First up, we need to make sure that you're not a{" "}
              <span role="img" aria-label="Robot">
                🤖
              </span>
              . Get started by signing in with Twitter—we won't ever post on
              your behalf.
            </p>
            {!session ? (
              // Manual redirection
              <button
                onClick={() =>
                  signin("twitter", {
                    callbackUrl:
                      "https://megablock-git-master.carsonpo.vercel.app/?callback=true",
                  })
                }
                className="twitter_signin"
              >
                <img src="/twitter-256.png" alt="Twitter logo" />
                <span>Login with Twitter</span>
              </button>
            ) : (
              <div className="profile">
                <img src={session.user.image} alt="Profile picture" />
                <div>
                  <span>{session.user.name}</span>
                  <button
                    onClick={() =>
                      signout({
                        callbackUrl:
                          "https://megablock-git-master.carsonpo.vercel.app/",
                      })
                    }
                  >
                    Sign out
                  </button>
                </div>
              </div>
            )}
            <div className="progress_buttons">
              <button onClick={() => setStep(0)}>Go back</button>
              {/*TODO: Make button unclickable and gray if not authenticated */}
              {!session ? (
                <button className="add_positivity disabled_button" disabled>
                  Next step
                </button>
              ) : (
                <button onClick={() => setStep(1)} className="add_positivity">
                  Next step
                </button>
              )}
            </div>
          </div>
        );
    }
  }
  return (
    <div className="root">
      <Head>
        <title>MegaBlock</title>
      </Head>
      <div className="content">{renderContent()}</div>
      <style jsx global>
        {`
          .twitter_signin {
            background-color: #0097ed;
            border: none;
            color: #fff;
            font-weight: 500;
            font-size: 17px;
            width: 220px;
            padding: 10px 0px;
            border-radius: 5px;
            margin: 20px 0px;
            transition: 50ms ease-in-out;
            text-decoration: none;
            display: inline-block;
          }
          .twitter_signin:hover {
            opacity: 0.7;
          }
          .twitter_signin > img {
            height: 20px;
            vertical-align: middle;
            float: left;
            padding-left: 10px;
          }
          .twitter_signin > span {
            vertical-align: middle;
          }
          .root {
            width: 100vw;
            height: 100vh;
            display: flex;
          }
          .content {
            align-items: center;
            justify-content: center;
            margin: auto;
          }
          .progress_buttons > button {
            display: inline-block;
            margin: 10px;
            font-size: 17px;
            padding: 11px 17.5px;
            border-radius: 6px;
            border: none;
            transition: 50ms ease-in-out;
          }
          .progress_buttons > button:nth-child(1):hover {
            opacity: 0.7;
          }
          .progress_buttons > button:focus {
            outline: none;
          }
        `}
      </style>
    </div>
  );
}
