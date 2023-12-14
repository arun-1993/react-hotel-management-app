import { useEffect, useRef } from "react";

export function useOutsideClick(eventHandler, listenOnCapture = true) {
    const ref = useRef();

    useEffect(
        function () {
            function handleClick(e) {
                if (ref.current && !ref.current.contains(e.target)) {
                    eventHandler();
                }
            }

            document.addEventListener("click", handleClick, listenOnCapture);

            return () =>
                document.removeEventListener(
                    "click",
                    handleClick,
                    listenOnCapture
                );
        },
        [eventHandler, listenOnCapture]
    );

    return ref;
}
