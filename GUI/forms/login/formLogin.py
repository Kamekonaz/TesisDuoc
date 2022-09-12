import tkinter as tk
from tkinter.font import BOLD
from forms.login.formlogin_designer import FormLoginDesigner
from util.encoding_decoding import decrypt
from db.db import conect
from ..empleado.MenuEmpleado import MenuEmpleado
from ..admin.menuAdmin_designer import MenuAdminDesigner
from forms.admin.crearUsuario import crearUsuario
class FormLogin(FormLoginDesigner):
    
    def check(self):
        db = conect()
        usuario = self.user.get()
        usuario = usuario.lower()
        contrasena = self.password.get()
        contrasenabd = db.funcionCompuesta('pkg_login.fn_login_fetch_username',[usuario],str)
       
        if (contrasenabd != None):
            if decrypt(contrasenabd,contrasena):
                tipo = db.funcionCompuesta('pkg_login.fn_get_user_type',[usuario],int)
                if (tipo == 2):
                    self.window.destroy()
                    MenuEmpleado()
                elif (tipo==1):
                    self.window.destroy()
                    crearUsuario()
                else:
                    tk.messagebox.showerror(title='Error Tipo de Usuario', message='Usted no tiene acceso a esta aplicacion' )
                      
                
            else:
                tk.messagebox.showerror(title='Error Contraseña', message='No es correcto' )
        else:
            tk.messagebox.showerror(title='Error Usuario', message='Usuario no existe' )
        
        """if user['estado']:
            if (user['rol']=='admin'):
                self.window.destroy()
                tk.messagebox.showerror(title='Error', message='No existe usuario' )
            elif (user['rol']=='especialista'):
                self.window.destroy()
                pop()"""
      
        
    

    
        
    def __init__(self):
        super().__init__()
