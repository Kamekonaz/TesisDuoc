import tkinter as tk
from tkinter.font import BOLD

from forms.login.formlogin_designer import FormLoginDesigner
from util.encoding_decoding import decrypt
from db.db import conect
from ..empleado.MenuEmpleado import pop
class FormLogin(FormLoginDesigner):
    
    def check(self):
        cursor = conect()
        usuario = self.user.get()
        contrasena = self.password.get()
        if decrypt(self,contrasena):
            status = True
        else:
            status = False
        cursor.close()
        """if user['estado']:
            if (user['rol']=='admin'):
                self.window.destroy()
                tk.messagebox.showerror(title='Error', message='No existe usuario' )
            elif (user['rol']=='especialista'):
                self.window.destroy()
                pop()"""
      
        
    

    
        
    def __init__(self):
        super().__init__()
