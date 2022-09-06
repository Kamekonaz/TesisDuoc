import tkinter as tk
from tkinter import messagebox,ttk
from tkinter.font import BOLD
import util.generic as utl

class crearClientDesigner:
    def __init__(self):
        self.window = tk.Tk()
        self.window.title('Crear Cliente')
        self.window.state('zoomed')
        self.window.resizable(width=0,height=0)
        #Header
        header = tk.Frame(self.window, bd=0,relief=tk.SOLID,bg='#E6EEFF',height=100,highlightbackground="black", highlightthickness=1)
        header.pack(fill=tk.BOTH)
        Imglogo = utl.read_image("./imagenes/logo.png",(70,70))

        logo = tk.Label(header,image=Imglogo,bg="#E6EEFF")
        logo.pack()
        logo.place(relx=0.03, rely=0.1)
        
        btnCliente = tk.Button(header,text="Gestion Cliente",font=('Times',15,BOLD),bg="#E6EEFF",fg="black",borderwidth=1,relief="solid")
        btnCliente.pack()
        btnCliente.place(relx=0.79, rely=0.3,height=40)
        
        
        #Frame form
        frame_form = tk.Frame(self.window, bd=0,relief=tk.SOLID,padx=10,pady=10,bg='white')
        frame_form.pack(side="top", expand=tk.YES,fill=tk.BOTH)
        
       
        
       
        
        title = tk.Label(frame_form,text="Datos del Representarte",font=('Times',25,BOLD),bg="white")
        title.pack(fill='both',side="left")
        title.place(relx=0.40, rely=0.02)
        
        label_rut = tk.Label(frame_form,text="Rut",font=('Times',14),fg="#666a88",bg="white")
        label_rut.pack()
        label_rut.place(relx=0.24, rely=0.15)
        self.rut = ttk.Entry(frame_form,font=('Times',14))
        self.rut.pack()
        self.rut.place(relx=0.33, rely=0.15,relwidth=0.07)
        
        
        label_email = tk.Label(frame_form,text="Email",font=('Times',14),fg="#666a88",bg="white",anchor="w")
        label_email.pack()
        label_email.place(relx=0.24, rely=0.25)
        self.email = ttk.Entry(frame_form,font=('Times',14))
        self.email.pack()
        self.email.place(relx=0.33, rely=0.25, relwidth=0.25)
        
        label_nombre = tk.Label(frame_form,text="Nombre",font=('Times',14),fg="#666a88",bg="white",anchor="w")
        label_nombre.pack()
        label_nombre.place(relx=0.24, rely=0.35)
        self.nombre = ttk.Entry(frame_form,font=('Times',14))
        self.nombre.pack()
        self.nombre.place(relx=0.33, rely=0.35, relwidth=0.25)
        
        label_apellido = tk.Label(frame_form,text="Apellido",font=('Times',14),fg="#666a88",bg="white",anchor="w")
        label_apellido.pack()
        label_apellido.place(relx=0.24, rely=0.45)
        self.apellido = ttk.Entry(frame_form,font=('Times',14))
        self.apellido.pack()
        self.apellido.place(relx=0.33, rely=0.45, relwidth=0.25)
        
        label_telefono = tk.Label(frame_form,text="telefono",font=('Times',14),fg="#666a88",bg="white",anchor="w")
        label_telefono.pack()
        label_telefono.place(relx=0.24, rely=0.55)
        self.telefono = ttk.Entry(frame_form,font=('Times',14))
        self.telefono.pack()
        self.telefono.place(relx=0.33, rely=0.55, relwidth=0.08)
        
        
        
        
        siguente = tk.Button(frame_form,text="Siguiente",font=('Times',15,BOLD),fg="white",bg="black")
        siguente.pack()
        siguente.place(relx=0.70, rely=0.75)
        
        self.window.mainloop()

        
