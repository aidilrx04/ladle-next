import React, { forwardRef } from "react";
import Image from "next/image";

function AppName({ className = "", ...rest }) {
  return (
    <div
      className={`brand justify-left flex items-end hover:cursor-pointer ${className}`}
      {...rest}
    >
      <Image
        src="/ladle.png"
        // layout="responsive"
        alt=""
        width={40}
        height={40}
      />
      <div className="flex text-xl">
        {"adle".split("").map((letter) => (
          <span
            key={Math.random()}
            className="brand-char mx-1 font-semibold uppercase"
          >
            {letter}
          </span>
        ))}
      </div>
    </div>
  );
}

// const AppName = forwardRef((props, ref) => <IAppName {...props} ref={ref} />);
// AppName.displayName = "AppName";
export default AppName;
