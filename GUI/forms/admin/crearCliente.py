import tkinter as tk
from tkinter.font import BOLD
from forms.admin.crearCliente_designer import crearClienteDesigner
from forms.admin.crearEmpresa import crearEmpresa
from db.db import conect

class crearCliente(crearClienteDesigner):
        
    def registro(self):
        db = conect()
        rut = self.rut.get()
        email = self.email.get()
        nombre = self.nombre.get()
        apellido = self.apellido.get()
        telefono = self.telefono.get()
        usuario = self.usuario.get()
        
        if (len(rut) != 0 and len(email) != 0 and  len(nombre) != 0 and  len(apellido) != 0 and  len(telefono) != 0 and len(usuario)!=0 ):
            idCuenta  = db.funcionCompuesta('pkg_register.fn_get_account_id',[usuario],int)
            datos = [rut,nombre,apellido,email,telefono,idCuenta]
            db.procedimientoAlmacenado('pkg_register.pcr_create_user',datos)
            self.window.destroy()
            crearEmpresa()
        
        
        else:
            tk.messagebox.showerror(title='Error', message='Hay campos vacio' )
       
        
    def __init__(self):
        super().__init__()