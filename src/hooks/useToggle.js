import { useState } from "react";

export default function useToggle(defaultValue) {
    const [value, setValue] = useState(defaultValue);

    function toggleValue(value) {
        setValue( currentValue => typeof value === "boolean" ? value : !currentValue );
    }
    return [value, toggleValue]
}

// check if the value we pass is boolean, then use value, otherwise swap the current value