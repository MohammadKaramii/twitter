import { atom } from "recoil";
import { UserTypes } from "@/types";

export const userState = atom<UserTypes | null>({
  key: "userState",
  default: null,
});
