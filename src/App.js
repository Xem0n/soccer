import { useState } from "react";
import styles from "./App.module.css";
import Soccer from "./componnets/Soccer";
import Wizard from "./componnets/Wizard";

function App() {
  const [connection, setConnection] = useState();

  const connect = (config) => setConnection(config);

  return (
    <div className={styles.App}>
      {connection ? (
        <Soccer config={connection} />
      ) : (
        <Wizard connect={connect} />
      )}
    </div>
  );
}

export default App;
