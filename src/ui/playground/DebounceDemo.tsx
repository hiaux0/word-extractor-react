import { useDebouncedCallback } from "@/hooks/useDebouncedCallback";
import { useState } from "react";

export const DebounceDemo = () => {
  const [value, setValue] = useState("");
  const [delay, setDelay] = useState(500);

  // Custom dependency (e.g., change the delay dynamically)
  const debouncedOnChange = useDebouncedCallback(
    (newValue: string) => {
      console.log("Debounced value:", newValue);
    },
    [delay], // Add `delay` to the dependency list
    delay,
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    debouncedOnChange(e.target.value);
  };

  return (
    <div>
      <input value={value} onChange={handleChange} />
      <button onClick={() => setDelay(1000)}>Increase Delay</button>
    </div>
  );
};
