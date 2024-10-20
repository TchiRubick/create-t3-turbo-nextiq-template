import type { Content } from "./content";
import content from "./content.json";

export const name = "cms";

export const getSection = <T extends keyof Content>(section: T) =>
  (content as Content)[section];
