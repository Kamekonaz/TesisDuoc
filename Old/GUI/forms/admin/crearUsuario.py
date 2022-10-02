import tkinter as tk
from tkinter.font import BOLD

from forms.admin.crearUsuario_designer import crearUsuarioDesigner
from forms.admin.crearCliente import crearCliente
from db.db import conect
from util.encoding_decoding import encryter
class crearUsuario(crearUsuarioDesigner):
        
    def registroUsuario(self):
        db = conect()
        user = self.user.get()
        password = self.password.get()
        password2 = self.password2.get()
        if( len(user) != 0 and len(password) != 0 and len(password2) != 0 ):
            if (password == password2):
                contrasena = encryter(password)
                tipoCuenta = 3
                dato = [user,contrasena,tipoCuenta]
            #pcr_create_account(f_username varchar, f_password varchar, f_id_tipo number, v_salida out number) 
                salida = db.procedimientoAlmacenado('pkg_register.pcr_create_account', dato)
            
                tk.messagebox.showerror(title='Error', message='Se ha creado')
                self.window.destroy()
                crearCliente()
            else:
                tk.messagebox.showerror(title='Error', message='La contraseña no coinciden' )
               
        else:
            tk.messagebox.showerror(title='Error', message='Campo vacio' )
       
        
    def __init__(self):
        super().__init__()

