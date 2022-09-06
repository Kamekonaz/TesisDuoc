import tkinter as tk
from tkinter.font import BOLD

from forms.login.formlogin_designer import FormLoginDesigner
from util.encoding_decoding import decrypt
from db.db import conect
from ..empleado.MenuEmpleado import pop
class FormLogin(FormLoginDesigner):
    
    def check(self):
        user = self.isPassword()
        if user['estado']:
            if (user['rol']=='admin'):
                self.window.destroy()
                pop()
            elif (user['rol']=='especialista'):
                self.window.destroy()
                pop()
        else:
             pass
        
    def isUser(self):
        cursor = conect()
        usuario = self.user.get()
        query = ("select usuario_empleado from empleado where usuario_empleado = '%s'"% usuario)
        dato = cursor.sentenciaCompuesta(query)
        if (len(dato) < 1):
            status = False
            tk.messagebox.showerror(title='Error', message='No existe usuario' )
        else:
            status = True
        json = {"estado":status}
        return json

    def isPassword(self):
        cursor = conect()
        usuario = self.user.get()
        contrasela = self.password.get()
        query = ("select password,rol from empleado where usuario_empleado = '%s'"% usuario)
        dato = cursor.sentenciaCompuesta(query)
        for i in dato:
            dato = i[0]
            rol = i[1]
        
        if decrypt(dato,contrasela):
            status = True
        else:
            status = False
            tk.messagebox.showerror(title='Error', message='Contraseña Incorrecta' )
        json = {"estado":status,"rol":rol}
        cursor.close()
        return json
        
    def __init__(self):
        super().__init__()
