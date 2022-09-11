import tkinter as tk
from tkinter import messagebox,ttk
from tkinter.font import BOLD
import util.generic as utl

class AClienteDesing:
    def __init__(self):
        self.window = tk.Tk()
        self.window.title('Menu Cliente')
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
        
        crearCliente = tk.Button(frame_form,text="Crear Cliente",font=('Times',15,BOLD),bg="white",fg="black",borderwidth=2,relief="solid")
        crearCliente.pack()
        crearCliente.place(relx=0.79, rely=0.04,height=40)
      
        self.window.mainloop()

        