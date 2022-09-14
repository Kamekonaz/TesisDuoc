import tkinter as tk
from tkinter.font import BOLD

from forms.admin.crearEmpresa_designer import crearEmpresaDesigner
from db.db import conect
from forms.admin.crearContrato import CrearContrato

class crearEmpresa(crearEmpresaDesigner):
        
    def registro(self):
        db = conect()
        rut = self.rut.get()
        
        ubicacion = self.ubicacion.get()
        nombre = self.nombre.get()
        razonSocial = self.razonSocial.get()
        telefono = int(self.telefono.get())
        rutCliente = self.rutCliente.get()
        #procedure pcr_create_business(f_rut varchar, f_ubicacion varchar, f_razon_social varchar, f_telefono number,  f_nombre varchar, f_rut_usuario varchar);
        datos = [rut,ubicacion,razonSocial,telefono,nombre,rutCliente]
        #if not rut and not email and not nombre and not apellido and not telefono :
        
        db.procedimientoAlmacenado('pkg_register.pcr_create_business',datos)
        self.window.destroy()
        CrearContrato()
    def __init__(self):
        super().__init__()