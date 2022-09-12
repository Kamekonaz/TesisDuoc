from ast import Break
from pickle import GLOBAL
import tkinter as tk
from tkinter.font import BOLD
from forms.login.formlogin_designer import FormLoginDesigner
from util.encoding_decoding import decrypt
from db.db import conect
from .menuAdmin_designer import MenuAdminDesigner

from forms.admin.crearUsuario import crearUsuario


previousButton = None

def changeButtonFocus(clickedButton):
    normalBG = "#ffffff"
    focusBG = "#B9B9B9"
    if previousButton: previousButton.config(bg=normalBG)
    clickedButton.config(bg=focusBG)
    return clickedButton


class MenuAdmin(MenuAdminDesigner):
    
    def sidebarOptions(self, option):
        global previousButton
        db = conect()
        match option:
            # Profesionales
            case 0:
                previousButton = changeButtonFocus(self.sidebarButtons[0])
                profesionales = db.crearCursor()
                db.procedimientoAlmacenado('pkg_list.pcr_list_by_usertype', [2, profesionales])

                profesionales_list = []
                for profesional in profesionales:
                    profesionales_list.append(profesional)
                    print(profesional)
                db.cerrarCursor(profesionales)

                self.listProfesionals(profesionales_list)
            # Clientes
            case 1:
                previousButton = changeButtonFocus(self.sidebarButtons[1])
                self.listClients()
            # Controlar Pagos
            case 2:
                previousButton = changeButtonFocus(self.sidebarButtons[2])
    
            # Calcular Accidentabilidad
            case 3:
                previousButton = changeButtonFocus(self.sidebarButtons[3])

            # Visualizar Actividades
            case 4:
                previousButton = changeButtonFocus(self.sidebarButtons[4])
    
            # Notificar Atrasos
            case 5:
                previousButton = changeButtonFocus(self.sidebarButtons[5])

            # Generar reporte cliente
            case 6:
                previousButton = changeButtonFocus(self.sidebarButtons[6])
    
            # Generar reporte global
            case 7:
                previousButton = changeButtonFocus(self.sidebarButtons[7])
      
        
    
    def deleteUser(self, userID):
        print(f"Borrando al usuario de id {userID}")
        
    def __init__(self):
        super().__init__()
