import tkinter as tk
from tkinter import messagebox,ttk
from tkinter.font import BOLD
import util.generic as utl

class MenuEmpleado:
    def __init__(self):
        self.window = tk.Tk()
        self.window.title('Menu Empleado')
        self.window.geometry('800x500')
        self.window.resizable(width=0,height=0)
        utl.center_window(self.window,800,500)
       
        
    
        #Frame form
        frame_form = tk.Frame(self.window, bd=0,relief=tk.SOLID,padx=10,pady=10,bg='#E6EEFF')
        frame_form.pack(side="top", expand=tk.YES,fill=tk.BOTH)
        
        #Frame form Top
        Imglogo = utl.read_image("./imagenes/logo.png",(120,100))

        logo = tk.Label(frame_form,image=Imglogo,bg="#E6EEFF")
        logo.pack()
        logo.place(relx=0.01, rely=0.01)
        
        cerrar = tk.Button(frame_form,text="Cerrar sección",font=('Times',15,BOLD),bg="#5C92FF",fg="white")
        cerrar.pack()
        cerrar.place(relx=0.80, rely=0.05)
      
        
        
        ImgActividad = utl.read_image("./imagenes/Actividad.png",(140,180))
        actividad = tk.Button(frame_form,image =ImgActividad,text="Actividad",font=('Times',15,BOLD),bg="#5C92FF",fg="white",compound = 'top')
        actividad.pack()
        actividad.place(relx=0.1, rely=0.3)
        
        ImgVisita = utl.read_image("./imagenes/Visita.png",(140,180))
        visita = tk.Button(frame_form,image =ImgVisita,text="Planilla Visita",font=('Times',15,BOLD),bg="#5C92FF",fg="white",compound = 'top')
        visita.pack()
        visita.place(relx=0.4, rely=0.3)
        
        ImgMejora = utl.read_image("./imagenes/Mejora.png",(140,180))
        mejora = tk.Button(frame_form,image =ImgMejora,text="Plan de Mejora",font=('Times',15,BOLD),bg="#5C92FF",fg="white",compound = 'top')
        mejora.pack(side='left',anchor='n',pady=135)
        mejora.place(relx=0.7, rely=0.3)
        self.window.mainloop()
