// icon:add-circle | Ionicons https://ionicons.com/ | Ionic Framework
import * as React from "react";

export function AddEntryButton(props) {
  return (
        <button type="submit" >
            <div className="flex flex-row gap-2 justify-center text-lg text-white font-mono bg-indigo-600 p-2 rounded-lg">
                <div className="self-center">
                    <svg
                      viewBox="0 0 512 512"
                      fill="currentColor"
                      height="1rem"
                      width="1rem"
                      {...props}
                    >
                    <path
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={32}
                        d="M256 112v288M400 256H112"
                    />
                    </svg>
                </div>
                {props.label}
            </div>
        </button>
  );
}

