import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
    key: 'THEME_STATE',
    storage: localStorage,
})

export enum ThemeFlg{
    light,
    dark
}

export const themeState = atom<ThemeFlg>({
    key:"THEME_STATE",
    default:ThemeFlg.light,
    effects_UNSTABLE:[persistAtom]
})
