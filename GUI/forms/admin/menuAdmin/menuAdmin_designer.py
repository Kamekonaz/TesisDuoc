import tkinter as tk
from tkinter import VERTICAL, messagebox,ttk
from tkinter.font import BOLD
import util.generic as utl




def addSidebarOptions(designer, options, base_separation):
    separation = 0
    counter = 0
    btns = []
    for option in options:
        btns.append(tk.Button(designer.sidebar, text=option, bg='#ffffff', font=("", 13, "bold"), bd=0,
                                            cursor="hand2", activebackground='#ffffff', command=lambda x=counter:designer.sidebarOptions(x)
        ))
        btns[counter].place(x=80, y=291+separation)
        separation+=base_separation
        counter+=1
    return btns


class MenuAdminDesigner:
    
    
    def __init__(self):
        self.window = tk.Tk()
        self.window.title('Admin Dashboard')
        self.window.geometry('1366x768')       
        self.window.resizable(0, 0)
        #self.window.state('zoomed')
        self.window.config(background = '#eff5f6')
        utl.center_window(self.window,1366,768)
       
        
        logo = utl.read_image("./imagenes/logo.png",(200,200))


        #--------------------------------------------------------------------------------------------
        #---------------------------------------- SIDEBAR -------------------------------------------
        #--------------------------------------------------------------------------------------------

        self.sidebar = tk.Frame(self.window, bg='#ffffff')
        self.sidebar.place(x=0, y=0, width=300, height=768)


        self.adminName = tk.Label(self.sidebar, text='Administrador',bg='#ffffff', font=("", 15, "bold"))
        self.adminName.place(x=80, y=200)



        #---------------------------------------------------------------------------------------------------------
        #self.sidebarOption_Profesionales = tk.Button(self.sidebar, text="Profesionales", bg='#ffffff', font=("", 13, "bold"), bd=0,
        #                                cursor="hand2", activebackground='#ffffff')
        #self.sidebarOption_Profesionales.place(x=80, y=291)

        sidebar_options = [
            "Profesionales", 
            "Clientes",
            "Controlar Pagos",
            "Calcular Accidentabilidad",
            "Visualizar Actividades",
            "Notificar Atrasos",
            "Generar reporte cliente",
            "Generar reporte global"
            ]


        self.sidebarButtons = addSidebarOptions(self, sidebar_options, 40) # Opciones y espacio de separación entre cada una

        self.bodyFrame = tk.Frame(self.window, bg='#ffffff')
        self.bodyFrame.place(x=328, y=110, width=1010, height=548)

    
        #HACER QUE SE PUEDA HACER SCROLL https://blog.teclado.com/tkinter-scrollable-frames/

        self.scrollbar = tk.Scrollbar(self.bodyFrame, orient=VERTICAL)
        self.scrollbar.pack(side="right",fill="y")

        for i in range(10):
            random_frame = tk.Frame(self.bodyFrame, bg= "#5C6BC0", width=700, height=120)
            random_frame.pack(pady=20)
            tk.Label(random_frame, text='NOMBRE APELLIDO',bg='#C6CCF0', font=("", 15, "bold")).place(x=10, y=10)
            tk.Label(random_frame, text='ROL: PROFESIONAL',bg='#C6CCF0', font=("", 15, "bold")).place(x=10, y=65)
            
            tk.Button(random_frame, text="Borrar", bg='#C6CCF0', font=("", 13, "bold"), bd=0, cursor="hand2", activebackground='#ffffff').place(x=600, y=10)
            tk.Button(random_frame, text="Editar", bg='#C6CCF0', font=("", 13, "bold"), bd=0, cursor="hand2", activebackground='#ffffff').place(x=600, y=65)
        
        
        self.window.mainloop()






    # ---------------------------------------------------------------------------------------------------------------------



    def listProfesionals(self, profesionals):
        self.bodyFrame = tk.Frame(self.window, bg='#ffffff')
        self.bodyFrame.place(x=328, y=110, width=1010, height=548)


        #ID CUENTA = 5
        for profesional in profesionals:
            profesionalFrame = tk.Frame(self.bodyFrame, bg= "#5C6BC0", width=700, height=120)
            profesionalFrame.pack(pady=20)
            tk.Label(profesionalFrame, text=f"{profesional[1].split(' ')[0]} {profesional[2].split(' ')[0]}",bg='#C6CCF0', font=("", 15, "bold")).place(x=10, y=10)
            tk.Label(profesionalFrame, text='ROL: PROFESIONAL',bg='#C6CCF0', font=("", 15, "bold")).place(x=10, y=65)
            
            tk.Button(profesionalFrame, text="Borrar", bg='#C6CCF0', font=("", 13, "bold"), bd=0, cursor="hand2", activebackground='#ffffff',
                     command=lambda x=profesional[5]:self.deleteUser(x)).place(x=600, y=10)

            tk.Button(profesionalFrame, text="Editar", bg='#C6CCF0', font=("", 13, "bold"), bd=0, cursor="hand2", activebackground='#ffffff').place(x=600, y=65)
            

    def listClients(self):
        self.bodyFrame = tk.Frame(self.window, bg='#ffffff')
        self.bodyFrame.place(x=328, y=110, width=1010, height=548)