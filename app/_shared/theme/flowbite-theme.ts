import { FlowbiteAvatarTheme, FlowbiteModalTheme, FlowbiteNavbarTheme, FlowbiteSidebarTheme } from "flowbite-react"

export class FlowbiteTheme {
  public static readonly DATEPICKER = {
    root: {
      input: {
        field: {
          input: {
            base: 'bg-inherit'
          }
        }
      }
    }
  }

  public static readonly MODAL_FULLSIZE: FlowbiteModalTheme = {
    "root": {
      "base": "fixed top-0 right-0 left-0 z-50 h-modal h-screen overflow-y-auto overflow-x-hidden md:inset-0 md:h-full",
      "show": {
        "on": "flex bg-gray-900 bg-opacity-50 dark:bg-opacity-80",
        "off": "hidden"
      },
      "sizes": {
        "sm": "max-w-sm",
        "md": "max-w-md",
        "lg": "max-w-lg",
        "xl": "max-w-xl",
        "2xl": "max-w-2xl",
        "3xl": "max-w-3xl",
        "4xl": "max-w-4xl",
        "5xl": "max-w-5xl",
        "6xl": "max-w-6xl",
        "7xl": "max-w-7xl"
      },
      "positions": {
        "top-left": "items-start justify-start",
        "top-center": "items-start justify-center",
        "top-right": "items-start justify-end",
        "center-left": "items-center justify-start",
        "center": "items-center justify-center",
        "center-right": "items-center justify-end",
        "bottom-right": "items-end justify-end",
        "bottom-center": "items-end justify-center",
        "bottom-left": "items-end justify-start"
      }
    },
    "content": {
      "base": "relative h-full w-full p-4 md:h-auto",
      "inner": "relative rounded-lg bg-white shadow dark:bg-gray-700 flex flex-col max-h-[90vh] h-screen"
    },
    "body": {
      "base": "p-6 flex-1 overflow-auto",
      "popup": "pt-0"
    },
    "header": {
      "base": "flex items-start justify-between rounded-t dark:border-gray-600 border-b p-5",
      "popup": "p-2 border-b-0",
      "title": "text-xl font-medium text-gray-900 dark:text-white",
      "close": {
        "base": "ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white",
        "icon": "h-5 w-5"
      }
    },
    "footer": {
      "base": "flex items-center space-x-2 rounded-b border-gray-200 p-6 dark:border-gray-600",
      "popup": "border-t"
    }
  }

  public static readonly AVATAR: FlowbiteAvatarTheme = {
    "root": {
      "base": "flex justify-center items-center space-x-4 rounded",
      "bordered": "p-1 ring-2",
      "rounded": "rounded-full",
      "color": {
        "dark": "ring-gray-800 dark:ring-gray-800",
        "failure": "ring-red-500 dark:ring-red-700",
        "gray": "ring-gray-500 dark:ring-gray-400",
        "info": "ring-cyan-400 dark:ring-cyan-800",
        "light": "ring-gray-300 dark:ring-gray-500",
        "purple": "ring-purple-500 dark:ring-purple-600",
        "success": "ring-green-500 dark:ring-green-500",
        "warning": "ring-yellow-300 dark:ring-yellow-500",
        "pink": "ring-pink-500 dark:ring-pink-500"
      },
      "img": {
        "base": "rounded",
        "off": "relative overflow-hidden bg-gray-100 dark:bg-gray-600",
        "on": "object-cover",
        "placeholder": "absolute w-auto h-auto text-gray-400 -bottom-1"
      },
      "size": {
        "xs": "w-6 h-6",
        "sm": "w-8 h-8",
        "md": "w-10 h-10",
        "lg": "w-20 h-20",
        "xl": "w-36 h-36"
      },
      "stacked": "ring-2 ring-gray-300 dark:ring-gray-500",
      "statusPosition": {
        "bottom-left": "-bottom-1 -left-1",
        "bottom-center": "-bottom-1 center",
        "bottom-right": "-bottom-1 -right-1",
        "top-left": "-top-1 -left-1",
        "top-center": "-top-1 center",
        "top-right": "-top-1 -right-1",
        "center-right": "center -right-1",
        "center": "center center",
        "center-left": "center -left-1"
      },
      "status": {
        "away": "bg-yellow-400",
        "base": "absolute h-3.5 w-3.5 rounded-full border-2 border-white dark:border-gray-800",
        "busy": "bg-red-400",
        "offline": "bg-gray-400",
        "online": "bg-green-400"
      },
      "initials": {
        "text": "font-medium text-gray-600 dark:text-gray-300",
        "base": "inline-flex overflow-hidden relative justify-center items-center bg-gray-100 dark:bg-gray-600"
      }
    },
    "group": {
      "base": "flex -space-x-4"
    },
    "groupCounter": {
      "base": "relative flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-gray-700 rounded-full ring-2 ring-gray-300 hover:bg-gray-600 dark:ring-gray-500"
    }
  }

  public static readonly NAVBAR: FlowbiteNavbarTheme = {
    "root": {
      "base": "bg-white px-2 py-2.5 border-b border-gray-200 dark:border-gray-700 dark:bg-gray-800 sm:px-4",
      "rounded": {
        "on": "rounded",
        "off": ""
      },
      "bordered": {
        "on": "border",
        "off": ""
      },
      "inner": {
        "base": "flex flex-wrap items-center justify-between",
        "fluid": {
          "on": "",
          "off": ""
        }
      }
    },
    "brand": {
      "base": "flex items-center"
    },
    "collapse": {
      "base": "w-full md:block md:w-auto",
      "list": "mt-4 flex flex-col md:mt-0 md:flex-row md:space-x-8 md:text-sm md:font-medium",
      "hidden": {
        "on": "hidden",
        "off": ""
      }
    },
    "link": {
      "base": "block py-2 pr-4 pl-3 md:p-0",
      "active": {
        "on": "bg-cyan-700 text-white dark:text-white md:bg-transparent md:text-cyan-700",
        "off": "border-b border-gray-100  text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:hover:bg-transparent md:hover:text-cyan-700 md:dark:hover:bg-transparent md:dark:hover:text-white"
      },
      "disabled": {
        "on": "text-gray-400 hover:cursor-not-allowed dark:text-gray-600",
        "off": ""
      }
    },
    "toggle": {
      "base": "inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden",
      "icon": "h-6 w-6 shrink-0"
    }
  }

  public static readonly SIDEBAR: FlowbiteSidebarTheme = {
    "root": {
      "base": "h-screen border-r border-gray-200 dark:border-gray-700",
      "collapsed": {
        "on": "w-16",
        "off": "w-64"
      },
      "inner": "h-screen overflow-x-hidden py-4 px-3"
    },
    "collapse": {
      "button": "group flex w-full items-center rounded-lg p-2 text-base font-normal text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700",
      "icon": {
        "base": "h-6 w-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white",
        "open": {
          "off": "",
          "on": "text-gray-900"
        }
      },
      "label": {
        "base": "ml-3 flex-1 whitespace-nowrap text-left",
        "icon": {
          "base": "h-6 w-6 transition ease-in-out delay-0",
          "open": {
            "on": "rotate-180",
            "off": ""
          }
        }
      },
      "list": "space-y-2 py-2"
    },
    "cta": {
      "base": "mt-6 rounded-lg p-4 bg-gray-100 dark:bg-gray-700",
      "color": {
        "blue": "bg-cyan-50 dark:bg-cyan-900",
        "dark": "bg-dark-50 dark:bg-dark-900",
        "failure": "bg-red-50 dark:bg-red-900",
        "gray": "bg-alternative-50 dark:bg-alternative-900",
        "green": "bg-green-50 dark:bg-green-900",
        "light": "bg-light-50 dark:bg-light-900",
        "red": "bg-red-50 dark:bg-red-900",
        "purple": "bg-purple-50 dark:bg-purple-900",
        "success": "bg-green-50 dark:bg-green-900",
        "yellow": "bg-yellow-50 dark:bg-yellow-900",
        "warning": "bg-yellow-50 dark:bg-yellow-900"
      }
    },
    "item": {
      "base": "flex items-center justify-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700",
      "active": "bg-gray-100 dark:bg-gray-700",
      "collapsed": {
        "insideCollapse": "group w-full pl-8 transition duration-75",
        "noIcon": "font-bold"
      },
      "content": {
        "base": "px-3 flex-1 whitespace-nowrap"
      },
      "icon": {
        "base": "h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white",
        "active": "text-gray-700 dark:text-gray-100"
      },
      "label": "",
      "listItem": ""
    },
    "items": {
      "base": ""
    },
    "itemGroup": {
      "base": "mt-4 space-y-2 border-t border-gray-200 pt-4 first:mt-0 first:border-t-0 first:pt-0 dark:border-gray-700"
    },
    "logo": {
      "base": "mb-5 flex items-center pl-2.5",
      "collapsed": {
        "on": "hidden",
        "off": "self-center whitespace-nowrap text-xl font-semibold dark:text-white"
      },
      "img": "mr-3 h-6 sm:h-7"
    }
  }
}