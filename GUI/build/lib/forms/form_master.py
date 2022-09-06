import tkinter as tk
from tkinter.font import BOLD
import util.generic as utl

class MasterPanel:
    def __init__(self):
        self.window = tk.Tk()
        self.window.title("Panel Maestro")
        w, h = self.window.winfo_screenwidth(),self.window.winfo_screenheight()
        self.window.geometry("%dx%d+0+0"%(w,h))
        self.window.resizable(width=0,height=0)
        
        logo = utl.read_image("./imagenes/logo.jpg",(200,200))
        label = tk.Label(self.window, image=logo,bg='#3a7ff6')
        label.place(x=0,y=0,relwidth=1,relheight=1)
        self.window.mainloop()
MasterPanel()