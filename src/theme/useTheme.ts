import { useCallback, useState } from "react";
import { ThemeFlg, themeState } from "../atoms/themeAtom";
import { useRecoilState } from "recoil";

function  useTheme(){
    // const [theme,setTheme] = useState<ThemeFlg>(ThemeFlg.light);
    const [theme,setTheme] = useRecoilState(themeState);

    const onChangeTheme = useCallback(()=>{
        setTheme((prevTheme)=>(prevTheme==ThemeFlg.light ? ThemeFlg.dark : ThemeFlg.light))
    },[])

    return {
        theme,
        onChangeTheme
    }
}

export default useTheme;