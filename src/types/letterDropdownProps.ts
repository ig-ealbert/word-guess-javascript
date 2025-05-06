import React from "react";

export type letterDropdownProps = {
  clickHandler: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  guessed: string[];
  value: string;
};
