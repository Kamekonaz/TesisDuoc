import tkinter as tk
from tkinter.font import BOLD

from forms.admin.crearUsuario_designer import crearUsuarioDesigner
from db.db import conect
from util.encoding_decoding import encryter
class crearUsuario(crearUsuarioDesigner):
        
    def registroUsuario(self):
        db = conect()
        user = self.user
        password = self.password
        password2 = self.password2
        if (password == password2):
            contrasena = encryter(password)
            dato = [user,contrasena]
            Usuario = db.procedimientoAlmacenado('pkg_login.fn_login_fetch_username',dato)
            tk.messagebox.showerror(title='Error', message='Se ha creado' )
        else:
            tk.messagebox.showerror(title='Error', message='La contraseña no coinciden' )
               
        
       
        
    def __init__(self):
        super().__init__()

