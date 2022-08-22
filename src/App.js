import React, { useEffect, useCallback, useState } from "react";
import { Container, Nav } from "react-bootstrap";
import { login, logout as destroy, accountBalance } from "./utils/near";
import Wallet from "./components/Wallet";
import { Notification } from "./components/utils/Notifications";
import Cover from "./components/utils/Cover";
import coverImg from "./assets/img/Election.jpg";
import "./App.css";
import CandidatesandVoters from "./components/votingPlatform/CandidatesandVoters";

const App = () => {
  const account = window.walletConnection.account();
  const [balance, setBalance] = useState("0");
  const getBalance = useCallback(async () => {
    if (account.accountId) {
      setBalance(await accountBalance());
    }
  });

  useEffect(() => {
    getBalance();
  }, [getBalance]);

  return (
      <>
        <Notification />
        {account.accountId ? (
            <Container fluid="md">
              <Nav className="justify-content-end pt-3 pb-5">
                <Nav.Item>
                  <Wallet
                      address={account.accountId}
                      amount={balance}
                      symbol="NEAR"
                      destroy={destroy}
                  />
                </Nav.Item>
              </Nav>
              <main><CandidatesandVoters accountId={account.accountId} /></main>
            </Container>
        ) : (
            <Cover name="Election Platform" login={login} coverImg={coverImg} />
        )}
      </>
  );
};

export default App;