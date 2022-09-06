import tkinter as tk
from tkinter.font import BOLD
import util.generic as utl

class Admin:
    def __init__(self):
        self.window = tk.Tk()
        self.window.title("Panel Maestro")
        w, h = self.window.winfo_screenwidth(),self.window.winfo_screenheight()
        self.window.geometry("%dx%d+0+0"%(w,h))
        self.window.resizable(width=0,height=0) 
        self.window.mainloop()
