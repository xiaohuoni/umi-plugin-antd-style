import React from "react";
import { Theme } from "./context";

export function rootContainer(rawContainer) {
  let container = rawContainer;
  container = <Theme rootContainer={container} />;
  return container;
}