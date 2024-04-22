import React, {useEffect, useRef} from "react";


const ProgressBar = React.forwardRef(
  function ProgressBar({progress, setView},topRef) {

    const ref = useRef(null);

    useEffect(() => {
      setView?.(ref.current);

      return () => {
        setView?.(null);
      }
    }, []);

    return (
      <div className={"progress-bar"} ref={ref}>
        <div className={"progress-bar__block"} ref={ref}>
          <span className="progress-bar__line"
                style={{
                  width: `${progress}%`
                }}
          />
        </div>
      </div>
    );
  });
export default ProgressBar;
ProgressBar.propTypes = {};

