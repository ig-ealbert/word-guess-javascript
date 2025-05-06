"use client";
import { letterDropdownProps } from "@/types/letterDropdownProps";

export default function LetterDropdown(props: letterDropdownProps) {
  const letters = "abcdefghijklmnopqrstuvwxyz";
  return (
    <>
      <select id="guess" value={props.value} onChange={props.clickHandler}>
        <option value="" disabled hidden>
          --select--
        </option>
        {Array.from(letters).map((letter) => (
          <option
            key={letter}
            value={letter}
            disabled={props.guessed.includes(letter)}
          >
            {letter}
          </option>
        ))}
      </select>
    </>
  );
}
