import tkinter as tk
from tkinter import messagebox,ttk
from tkinter.font import BOLD
import util.generic as utl

class App:
    def __init__(self):
        self.window = tk.Tk()
        self.window.title('Menu Administrador')
        self.window.geometry('800x500')
        self.window.resizable(width=0,height=0)
        utl.center_window(self.window,800,500)
       
        
    
        #Frame form
        frame_form = tk.Frame(self.window, bd=0,relief=tk.SOLID,padx=10,pady=10,bg='#F3E5AB')
        frame_form.pack(side="top", expand=tk.YES,fill=tk.BOTH)
        
        #Frame form Top
        Imglogo = utl.read_image("./imagenes/logo.png",(120,100))

        logo = tk.Label(frame_form,image=Imglogo,bg="#F3E5AB")
        logo.pack()
        logo.place(relx=0.01, rely=0.01)
        
        cerrar = tk.Button(frame_form,text="Cerrar secion",font=('Times',15,BOLD),bg="#3880FF",fg="white")
        cerrar.pack()
        cerrar.place(relx=0.80, rely=0.05)
      
        
        
        ImgCliente = utl.read_image("./imagenes/Cliente.png",(140,180))
        cliente = tk.Button(frame_form,image =ImgCliente,text="Cliente",font=('Times',15,BOLD),bg="#3880FF",fg="white",compound = 'top')
        cliente.pack()
        cliente.place(relx=0.1, rely=0.3)
        
        
        ImgEmpleado = utl.read_image("./imagenes/Empleado.png",(140,180))
        empleado = tk.Button(frame_form,image =ImgEmpleado,text="Empleado",font=('Times',15,BOLD),bg="#3880FF",fg="white",compound = 'top')
        empleado.pack()
        empleado.place(relx=0.4, rely=0.3)
        
        ImgGerente = utl.read_image("./imagenes/General.png",(140,180))
        general = tk.Button(frame_form,image =ImgGerente,text="General",font=('Times',15,BOLD),bg="#3880FF",fg="white",compound = 'top')
        general.pack(side='left',anchor='n',pady=135)
        general.place(relx=0.7, rely=0.3)
        self.window.mainloop()
        
App()