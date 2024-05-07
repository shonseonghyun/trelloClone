import React, { useLayoutEffect } from 'react';
import { useRecoilState } from 'recoil';
import { ThemeFlg, themeState } from '../atoms/themeAtom';
import styled from 'styled-components';

const ThemeImg = styled.img`
  width:50px;
  heigth:50px;
`;

const Button = styled.button`
    border:none;
    background-color : transparent;
    cursor:pointer;
    `;


    
const ToggleThemeBtn = () => {
    const [theme,setTheme] = useRecoilState(themeState);
    const onClick = ()=>{
        setTheme((prevTheme)=>(prevTheme==ThemeFlg.light ? ThemeFlg.dark : ThemeFlg.light))
    
    }

    useLayoutEffect(() => {
        if (theme && [ThemeFlg.dark, ThemeFlg.light].includes(theme)) {
          setTheme(theme);
        }
      }, []);

    return (
     
        <div>
            <Button type="button" onClick={onClick}>
                {
                    theme ===ThemeFlg.dark
                    ?
                    <ThemeImg src={`${process.env.PUBLIC_URL}/lightTheme.png`} />
                    :
                    <ThemeImg src={`${process.env.PUBLIC_URL}/darkTheme.png`} />            
                }   
            </Button>
              
        </div>

        
    );
};

export default ToggleThemeBtn;