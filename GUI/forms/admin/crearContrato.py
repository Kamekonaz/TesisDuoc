import tkinter as tk
from tkinter.font import BOLD

from forms.admin.crearContrato_designer import crearContratoDesigner
from db.db import conect

class RegistroContrato(crearContratoDesigner):
        
    def registroContrato(self):
        cursor = conect()
        fechaInicio = self.fechaInicio
        fechaFinal = self.fechaFinal
        estado = self.estado
       
        if not fechaInicio and not fechaFinal and not estado :
            
            if():
                self.window.destroy()
                
            pass
        else:
            tk.messagebox.showerror(title='Error', message='Hay campos vacio' )
       
        
    def __init__(self):
        super().__init__()