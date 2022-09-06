import tkinter as tk
from tkinter import messagebox,ttk
from tkinter.font import BOLD
import util.generic as utl


class FormLoginDesigner:
    
   
    def check(self):
        pass
    def isUser(self):
        pass
    def isPassword(self):
        pass
    def __init__(self):
        self.window = tk.Tk()
        self.window.title('Inicio de seccion')
        self.window.geometry('800x500')
        self.window.resizable(width=0,height=0)
        utl.center_window(self.window,800,500)
       
        
        logo = utl.read_image("./imagenes/logo.png",(200,200))
        
        #Frame Logo
        frame_logo = tk.Frame(self.window, bd=0,width=300,relief=tk.SOLID,padx=10,pady=10,bg='#3a7ff6')
        frame_logo.pack(side="left", expand=tk.NO,fill=tk.BOTH)
        label = tk.Label(frame_logo,image=logo,bg='#3a7ff6')
        label.place(x=0,y=0,relwidth=1,relheight=1)
        
        #Frame form
        frame_form = tk.Frame(self.window, bd=0,width=300,relief=tk.SOLID,padx=10,pady=10,bg='white')
        frame_form.pack(side="right", expand=tk.YES,fill=tk.BOTH)
        
        #Frame form Top
        frame_form_top = tk.Frame(frame_form,height=50,bd=0,relief=tk.SOLID,bg='black')
        frame_form_top.pack(side="top",fill=tk.X)
        title = tk.Label(frame_form_top,text="Inicio de seccion",font=('Times',30),fg="#666a88",bg='#fcfcfc',pady=50)
        title.pack(expand=tk.YES,fill=tk.BOTH)
        
        #Frame form fill
        frame_form_fill = tk.Frame(frame_form,height=50,bd=0,relief=tk.SOLID,bg='white')
        frame_form_fill.pack(side="bottom",expand=tk.YES,fill=tk.BOTH)
        
        label_user = tk.Label(frame_form_fill,text="Usuario",font=('Times',14),fg="#666a88",bg="white",anchor="w")
        label_user.pack(fill=tk.X,padx=20,pady=5)
        self.user = ttk.Entry(frame_form_fill,font=('Times',14))
        self.user.pack(fill=tk.X,padx=20,pady=10)
        
        label_password = tk.Label(frame_form_fill,text="Password",font=('Times',14),fg="#666a88",bg="white",anchor="w")
        label_password.pack(fill=tk.X,padx=20,pady=5)
        self.password = ttk.Entry(frame_form_fill,font=('Times',14))
        self.password.pack(fill=tk.X,padx=20,pady=10)
        self.password.config(show="\u2022")
        
        inicio = tk.Button(frame_form_fill,text="Iniciar seccion", command=lambda:self.check(),font=('Times',15,BOLD),fg="#fff",bg="#3a7ff6")
        inicio.pack(fill=tk.X,padx=20,pady=20)
        
        
        self.window.mainloop()
