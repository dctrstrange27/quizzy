import React, { useEffect, useState } from 'react'
import { BsSun,BsMoon } from 'react-icons/bs'
import { loadTheme, setTheme } from '../utils/theme'

const ToggleTheme = () => {

    const [theme,setVariationTheme] = useState("light")
    
    useEffect(()=>{
        setVariationTheme(loadTheme())
    },[])

    const handleTheme=()=>{
        let selectedTheme = theme == "light" ? "dark": "light"
        setTheme(selectedTheme)
        setVariationTheme(selectedTheme)
        console.log(theme)
    }

    return (
    <div onClick={()=>{handleTheme()}}>
         {theme == "light" ?  <BsSun className="w-5 h-5 cursor-pointer"></BsSun> :
          <BsMoon className="w-5 h-5 cursor-pointer"></BsMoon>         
         }
    </div>
  )
}

export default ToggleTheme