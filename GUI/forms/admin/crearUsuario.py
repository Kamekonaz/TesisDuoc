import tkinter as tk
from tkinter.font import BOLD

from forms.admin.crearCliente_designer import crearClientDesigner
from db.db import conect

class RegistroCliente(crearClientDesigner):
        
    def registroUsuario(self):
        user = self.user
        password = self.password
        password2 = self.password2
        if not user and not password and not password2:
            if (password != password2):
                tk.messagebox.showerror(title='Error', message='La contraseña no coinciden' )
            else:
               pass
        else:
            tk.messagebox.showerror(title='Error', message='Hay campos vacio' )
            pass
       
        
    def __init__(self):
        super().__init__()