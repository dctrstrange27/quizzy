module.exports = {
  content: ["./src/**/*.{html,js,tsx}"],
  darkMode: 'class',
  theme: {
    screens: {
      "sss": '360px',
      "ss": '578px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      '3xl': '1920px',
    },
    colors: {
      //light theme
      b1:"#041B2D",
      b2:"#004e9a",
      b3:"428cd4",  
      p1:"#ff9cda",
      p2:"#ea4492",

      //gray
      five: "#18191a",
      four: "#232425",
      three: "#242526",
      two: "#242526",
      one: "#77797d",
      //orange
      Ofive: "#ff7900",
      Ofour: "#d56300",
      Othree: "#9b4800",
      Otwo: "#512600",
      Oone: "#77797d",
      //white
      white5: "#fff",

      //black 
      black5: "#000",

      P_bg: "#f7f9fb",
      Light_normal: '#383838',
      Light_shadow: '#2626262c',
      Dark_nav_bg: "#242526",
      Light_nav_bg: "#e9e7e7",
      Tabs_bg: "#abadb2",
      Aside_icon: "#8a340b",
      product_bg: "#f2f0eee6",
      product_lbl_bg: "#fffafad3",
      dark_del_btn: "#C90915",
      light_del_btn: "#de5a63",

    },

    extend: {
      fontFamily: {
        dm_mono: "'DM Mono', monospace",
        pop: "'Poppins', sans-serif",
        nuni: "'Nunito', sans-serif",
        nsans: "'Nunito Sans', sans-serif",
        mulish: "'Mulish', sans-serif",
        pacifico: 'Pacifico',
        tilt: 'Tilt Warp',
        grot: 'Darker Grotesque'
      },
      backgroundImage: {
        'dark-text-logo': "url('./img/dark-text-logo.png')",
        'light-text-logo': "url('./img/light-text-logo.png')",
        'light-tab-bg': "url('./img/light-tab-bg.png')",
        'dark-tab-bg': "url('./img/dark-tab-bg.png')",
        'sigup-pic': "url('./img/picture.jpg')",
      }

    },
  },
  
}