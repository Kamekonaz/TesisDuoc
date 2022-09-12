import tkinter as tk
from tkinter.font import BOLD

from forms.admin.crearCliente_designer import crearClienteDesigner
from db.db import conect

class crearCliente(crearClienteDesigner):
        
    def registro(self):
        db = conect()
        rut = self.rut
        email = self.email
        nombre = self.nombre
        apellido = self.apellido
        telefono = self.telefono
        #idCuenta  = db.funcionCompuesta('pkg_login.fn_login_fetch_username',[],str)
        datos = [rut,nombre,apellido,email,telefono]
        #if not rut and not email and not nombre and not apellido and not telefono :
        
        salida = db.procedimientoAlmacenado('pkg_login.pcr_create_user',datos)
        print(salida)
        #else:
            #tk.messagebox.showerror(title='Error', message='Hay campos vacio' )
       
        
    def __init__(self):
        super().__init__()