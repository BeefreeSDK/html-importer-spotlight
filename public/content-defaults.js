const contentDefaults = {
  button: {
    label: "Click Here",
    href: "#",
    width: "35%",
    styles: {
      color: "#ffffff",
      fontSize: '16px',
      fontFamily: "'Inter', Arial, sans-serif",
      backgroundColor: "#6a0dad",
      borderBottom: "0px solid transparent",
      borderLeft: "0px solid transparent",
      borderRadius: "4px",
      borderRight: "0px solid transparent",
      borderTop: "0px solid transparent",
      lineHeight: "150%",
      maxWidth: "100%",
      paddingBottom: "10px",
      paddingLeft: "20px",
      paddingRight: "20px",
      paddingTop: "10px"
    },
    blockOptions: {
      paddingBottom: "15px",
      paddingLeft: "15px",
      paddingRight: "15px",
      paddingTop: "15px",
      textAlign: "center",
    }
  },
  menu: {
    styles: {
      linkColor: "#6a0dad",
      fontSize: "14px",
      letterSpacing: "0px",
      fontWeight: '500',
    }
  },
  carousel: {
    blockOptions: {
      paddingBottom: "20px",
      paddingLeft: "20px",
      paddingRight: "20px",
      paddingTop: "20px",
    }
  },
  divider: {
    width: '80%',
    line: "2px solid #9c4dcc",
    align: "center",
    blockOptions: {
      paddingBottom: "20px",
      paddingLeft: "20px",
      paddingRight: "20px",
      paddingTop: "20px",
    }
  },
  form: {
    styles: {
      fontSize: "14px",
      fontFamily: "'Inter', Arial, sans-serif",
      fontWeight: '400',
    },
    labelsOptions: {
      color: "#333333",
      lineHeight: "150%",
      fontWeight: "500",
      fontStyle: "normal",
      align: "left",
      position: "top"
    },
    fieldsOptions: {
      color: "#333333",
      backgroundColor: "#ffffff",
      outlineColor: "#6a0dad",
      borderRadius: "4px",
      borderTop: "1px solid #d6b8e6",
      borderRight: "1px solid #d6b8e6",
      borderBottom: "1px solid #d6b8e6",
      borderLeft: "1px solid #d6b8e6",
      paddingBottom: "8px",
      paddingLeft: "10px",
      paddingRight: "10px",
      paddingTop: "8px",
    },
    buttonsOptions: {
      color: "#ffffff",
      backgroundColor: "#6a0dad",
      borderRadius: "4px",
      borderTop: "0px solid transparent",
      borderRight: "0px solid transparent",
      borderBottom: "0px solid transparent",
      borderLeft: "0px solid transparent",
      lineHeight: "150%",
      align: "center",
      width: "100%",
      maxWidth: "100%",
      paddingBottom: "10px",
      paddingLeft: "20px",
      paddingRight: "20px",
      paddingTop: "10px",
      marginBottom: "10px",
      margingLeft: "0px",
      marginRight: "0px",
      marginTop: "10px",
    }
  },
  title: {
    defaultHeadingLevel: 'h2',
    blockOptions: {
      align: 'center',
      paddingTop: '15px',
      paddingRight: '15px',
      paddingBottom: '15px',
      paddingLeft: '15px',
    }
  },
  icons: {
    items: [
      {
        image: "./favicon.png",
        textPosition: "right",
        text: "BeeFree",
        alt: "BeeFree Logo",
        title: "BeeFree",
        href: "https://beefree.io",
        target: "_blank",
        width: "32px",
        height: "32px",
      }
    ],
    styles: {
      color: "#333333",
      fontSize: "14px",
      fontFamily: "'Inter', Arial, sans-serif",
      fontWeight: '500',
    },
    blockOptions: {
      align: "center",
      paddingBottom: "15px",
      paddingLeft: "15px",
      paddingRight: "15px",
      paddingTop: "15px",
      itemSpacing: "20px"
    },
    iconSpacing: {
      paddingBottom: "8px",
      paddingLeft: "8px",
      paddingRight: "8px",
      paddingTop: "8px",
    }
  },
  image: {
    alt: "Email Image",
    href: "",
    src: "./favicon.png",
    width: "100%",
    blockOptions: {
      paddingBottom: "15px",
      paddingLeft: "15px",
      paddingRight: "15px",
      paddingTop: "15px",
      align: "center",
    }
  },
  list: {
    styles: {
      color: '#333333',
      fontSize: '14px',
      fontFamily: "'Inter', Arial, sans-serif",
      fontWeight: '400',
      lineHeight: '150%',
      textAlign: 'left',
      direction: 'ltr',
      letterSpacing: '0px',
      linkColor: '#6a0dad',
      liSpacing: '8px',
      liIndent: '30px',
      listType: 'ul',
      listStyleType: 'disc',
      startListFrom: '1',
    },
    blockOptions: {
      paddingTop: '15px',
      paddingRight: '15px',
      paddingBottom: '15px',
      paddingLeft: '15px',
    }
  },
  social: {
    icons: [
      {
        type: 'facebook',
        name: 'Facebook',
        image: {
          prefix: 'https://www.facebook.com/',
          alt: 'Facebook',
          src: `https://img.icons8.com/color/48/000000/facebook-new.png`,
          title: 'Facebook',
          href: 'https://www.facebook.com/'
        },
        text: ''
      }
    ],
    blockOptions: {
      paddingBottom: "20px",
      paddingLeft: "20px",
      paddingRight: "20px",
      paddingTop: "20px",
      textAlign: "center",
      height: 48,
      width: 48,
      iconWidth: 32
    }
  },
  video: {
    blockOptions: {
      paddingBottom: "20px",
      paddingLeft: "20px",
      paddingRight: "20px",
      paddingTop: "20px",
    }
  },
  paragraph: {
    styles: {
      color: '#333333',
      fontSize: '14px',
      fontFamily: "'Inter', Arial, sans-serif",
      fontWeight: '400',
      lineHeight: '150%',
      textAlign: 'left',
      direction: 'ltr',
      letterSpacing: '0px',
      linkColor: '#6a0dad',
      paragraphSpacing: '16px',
    },
    blockOptions: {
      paddingTop: '15px',
      paddingRight: '15px',
      paddingBottom: '15px',
      paddingLeft: '15px',
    }
  },
  general: {
    backgroundColor: "#f5f5f5",
    contentAreaBackgroundColor: "#ffffff",
    defaultFont: "'Inter', Arial, sans-serif",
    linkColor: "#6a0dad"
  },
  row: {
    styles: {
      backgroundColor: "transparent",
      contentAreaBackgroundColor: "#ffffff",
      verticalAlign: "top",
      columnsBorderRadius: "4px",
      columnsSpacing: "15px",
      columnsStackOnMobile: true,
      columnsReverseStackOnMobile: false,
      columnsPaddingLeft: "15px",
      columnsPaddingRight: "15px",
      columnsPaddingTop: "15px",
      columnsPaddingBottom: "15px",
      columnsBackgroundColor: "#ffffff",
      paddingLeft: "15px",
      paddingRight: "15px",
      paddingTop: "15px",
      paddingBottom: "15px",
    }
  }
}