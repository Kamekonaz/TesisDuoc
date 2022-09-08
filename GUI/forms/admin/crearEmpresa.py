import tkinter as tk
from tkinter.font import BOLD

from forms.admin.crearEmpresa_designer import crearEmpresaDesigner
from db.db import conect

class RegistroEmpresa(crearEmpresaDesigner):
        
    def registro(self):
        cursor = conect()
        rut = self.rut
        nombre = self.email
        ubicacion = self.nombre
        razonSocial = self.razonSocial
        telefono = self.telefono
        if not rut and not nombre and not ubicacion and not razonSocial and not telefono :
            
            if():
                self.window.destroy()
                
            pass
        else:
            tk.messagebox.showerror(title='Error', message='Hay campos vacio' )
       
        
    def __init__(self):
        super().__init__()