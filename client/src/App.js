import { useEffect, useState } from "react";
import styles from "./App.module.css";
import Soccer from "./componnets/Soccer";
import Wizard from "./componnets/Wizard";

function App() {
  const [connection, setConnection] = useState();

  const connect = (config) => setConnection(config);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:6969");
    socket.addEventListener("open", () => {
      socket.send(
        JSON.stringify({
          lolxd: "nani",
          type: "move",
          data: {
            x: 5,
            y: 10,
          },
          what: "aezakmi",
        }),
      );
    });
  }, []);

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
