import styles from "./Field.module.css";

function Field(props) {
  return (
    <div
      ref={props.divRef}
      className={styles.Field}
      onMouseEnter={props.ready}
      onMouseLeave={props.cancel}
      onClick={props.accept}
    />
  );
}

export default Field;
