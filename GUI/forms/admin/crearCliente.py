import tkinter as tk
from tkinter.font import BOLD

from forms.admin.crearCliente_designer import crearClientDesigner
from db.db import conect

class CrearCliente(crearClientDesigner):
        
    def registro(self):
        cursor = conect()
        rut = self.rut
        email = self.email
        nombre = self.nombre
        apellido = self.apellido
        telefono = self.telefono
        if not rut and not email and not nombre and not apellido and not telefono :
            
            if():
                self.window.destroy()
                
            pass
        else:
            tk.messagebox.showerror(title='Error', message='Hay campos vacio' )
       
        
    def __init__(self):
        super().__init__()