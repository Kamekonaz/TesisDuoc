import tkinter as tk
from tkinter import messagebox,ttk
from tkinter.font import BOLD
import util.generic as utl
from tkcalendar import DateEntry
class crearContratoDesigner:
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
        
       
        
       
        
        title = tk.Label(frame_form,text="Datos del Contrato",font=('Times',25,BOLD),bg="white")
        title.pack(fill='both',side="left")
        title.place(relx=0.40, rely=0.02)
        
        label_fechaInicio = tk.Label(frame_form,text="Fecha Inicio",font=('Times',14),fg="#666a88",bg="white")
        label_fechaInicio.pack()
        label_fechaInicio.place(relx=0.24, rely=0.15)
        self.fechaInicio = DateEntry(frame_form,selectmode='day',font=('Times',14))
        self.fechaInicio.pack()
        self.fechaInicio.place(relx=0.33, rely=0.15,relwidth=0.07,relheight=0.04)
        
        
        label_fechaFinal = tk.Label(frame_form,text="Fecha Final",font=('Times',14),fg="#666a88",bg="white")
        label_fechaFinal.pack()
        label_fechaFinal.place(relx=0.24, rely=0.25)
        self.fechaFinal = DateEntry(frame_form,selectmode='day',font=('Times',14))
        self.fechaFinal.pack()
        self.fechaFinal.place(relx=0.33, rely=0.25,relwidth=0.07,relheight=0.04)
        
        label_estado = tk.Label(frame_form,text="Estado",font=('Times',14),fg="#666a88",bg="white",anchor="w")
        label_estado.pack()
        label_estado.place(relx=0.24, rely=0.35)
        self.estado = ttk.Entry(frame_form,font=('Times',14))
        self.estado.pack()
        self.estado.place(relx=0.33, rely=0.35, relwidth=0.25)
        
        
        
        
        
        siguente = tk.Button(frame_form,text="Siguiente",font=('Times',15,BOLD),fg="white",bg="black")
        siguente.pack()
        siguente.place(relx=0.70, rely=0.75)
        
        self.window.mainloop()
