import classes from "./InfoWindow.css";

const infoWindow = (props) => (
        <div className={classes.InfoWindow}>
          <div className={[classes.Content, classes[props.contentType]].join(" ")}>{props.children}</div>
        </div>
    );
  
export default infoWindow;