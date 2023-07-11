

export const loadTheme =()=>{
   const theme = localStorage.getItem("theme")
   if(theme == "dark"){
    document.documentElement.classList.add("dark")
    document.documentElement.classList.remove("light")
   }else{
    document.documentElement.classList.add("light")
    document.documentElement.classList.remove("dark")
   }
    return theme
}


export const setTheme=(theme)=>{
 localStorage.theme = theme
    if(theme == 'light'){
        document.documentElement.classList.add("light")
        document.documentElement.classList.remove("dark")
    }else{
        document.documentElement.classList.add("dark")
        document.documentElement.classList.remove("light")
    }
}


