import tkinter as tk
from tkinter import messagebox,ttk
from tkinter.font import BOLD
import util.generic as utl

class crearUsuarioDesigner:
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
        
       
        
       
        
        title = tk.Label(frame_form,text="Crear Usuario",font=('Times',25,BOLD),bg="white")
        title.pack(fill='both',side="left")
        title.place(relx=0.40, rely=0.02)
        
        label_user = tk.Label(frame_form,text="Usuario",font=('Times',20),fg="#666a88",bg="white")
        label_user.pack()
        label_user.place(relx=0.45, rely=0.20)
        self.user = ttk.Entry(frame_form,font=('Times',14))
        self.user.pack()
        self.user.place(relx=0.28, rely=0.27,relwidth=0.4)
        
        label_password = tk.Label(frame_form,text="Contraseña",font=('Times',20),fg="#666a88",bg="white")
        label_password.pack()
        label_password.place(relx=0.45, rely=0.38)
        self.password = ttk.Entry(frame_form,font=('Times',14))
        self.password.pack()
        self.password.place(relx=0.28, rely=0.45,relwidth=0.4)
        
       
        
        
        atras = tk.Button(frame_form,text="Atras",font=('Times',15,BOLD),fg="white",bg="black")
        atras.pack()
        atras.place(relx=0.15, rely=0.75)
        
        fin = tk.Button(frame_form,text="Finalizar",font=('Times',15,BOLD),fg="white",bg="black")
        fin.pack()
        fin.place(relx=0.70, rely=0.75)
        
        self.window.mainloop()
