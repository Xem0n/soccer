import { useState } from "react";
import styles from "./Wizard.module.css";

function Wizard(props) {
  const [config, setConfig] = useState({
    ip: "",
    port: 6969,
    name: "",
    color: "#000",
  });

  const updateIp = (e) => setConfig({ ...config, ip: e.target.value });
  const updatePort = (e) => setConfig({ ...config, port: e.target.value });
  const updateName = (e) => setConfig({ ...config, name: e.target.value });
  const updateColor = (e) => setConfig({ ...config, color: e.target.value });

  const verifyPort = (e) => {
    if (
      e.key !== "Backspace" &&
      (!/[0-9]/.test(e.key) || e.target.value / 10000 > 1)
    ) {
      e.preventDefault();
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    props.connect(config);
  };

  return (
    <form onSubmit={onSubmit} className={styles.Wizard}>
      <h1>Connect & Play</h1>

      <div className={styles["Input-Group"]}>
        <label htmlFor="ip">Enter server's IP</label>
        <input type="text" id="ip" value={config.ip} onChange={updateIp} />
      </div>

      <div className={styles["Input-Group"]}>
        <label htmlFor="port">Enter server's port</label>
        <input
          type="number"
          id="port"
          min="0"
          max="99999"
          value={config.port}
          onChange={updatePort}
          onKeyDown={verifyPort}
        />
      </div>

      <div className={styles["Input-Group"]}>
        <label htmlFor="name">Enter your name</label>
        <input
          type="text"
          id="name"
          value={config.name}
          onChange={updateName}
        />
      </div>

      <div className={styles["Input-Group"]}>
        <label htmlFor="color">Choose your color</label>
        <input
          type="color"
          id="color"
          value={config.color}
          onChange={updateColor}
        />
      </div>

      <input type="submit" value="Connect" className={styles.Submit} />
    </form>
  );
}

export default Wizard;
