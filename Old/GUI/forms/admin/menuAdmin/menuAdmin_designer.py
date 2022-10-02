import tkinter as tk
from tkinter import VERTICAL, messagebox,ttk
from tkinter.font import BOLD
import util.generic as utl

class ScrollableFrame(ttk.Frame):
    def __init__(self, container, *args, **kwargs):
        super().__init__(container, *args, **kwargs)
        canvas = tk.Canvas(self)
        scrollbar = ttk.Scrollbar(self, orient="vertical", command=canvas.yview)
        self.scrollable_frame = ttk.Frame(canvas)

        self.scrollable_frame.bind(
            "<Configure>",
            lambda e: canvas.configure(
                scrollregion=canvas.bbox("all")
            )
        )

        canvas.create_window((0, 0), window=self.scrollable_frame, anchor="nw")

        canvas.configure(yscrollcommand=scrollbar.set)

        canvas.pack(side="left", fill="both", expand=True)
        scrollbar.pack(side="right", fill="y")


def addSidebarOptions(designer, options, base_separation):
    separation = 0
    counter = 0
    btns = []
    for option in options:
        btns.append(tk.Button(designer.sidebar, text=option, bg='#ffffff', font=("", 13, "bold"), bd=0,
                                            cursor="hand2", activebackground='#ffffff', command=lambda x=counter:designer.sidebarOptions(x)
        ))
        btns[counter].place(x=30, y=130+separation)
        separation+=base_separation
        counter+=1
    return btns


class MenuAdminDesigner:
    
    
    def __init__(self):
        self.window = tk.Tk()
        self.window.title('Admin Dashboard')
        self.window.geometry('800x500')       
        self.window.resizable(0, 0)
        #self.window.state('zoomed')
        self.window.config(background = '#eff5f6')
        utl.center_window(self.window,800,500)
       
        
        logo = utl.read_image("./imagenes/logo.png",(200,200))


        #--------------------------------------------------------------------------------------------
        #---------------------------------------- SIDEBAR -------------------------------------------
        #--------------------------------------------------------------------------------------------

        self.sidebar = tk.Frame(self.window, bg='#ffffff')
        self.sidebar.place(x=0, y=0, width=300, height=768)


        self.adminName = tk.Label(self.sidebar, text='Administrador',bg='#ffffff', font=("", 15, "bold"))
        self.adminName.place(x=30, y=50)



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


        self.wrapper = tk.LabelFrame(self.window)
        self.windowWrapper = tk.LabelFrame(self.window)

        self.canvas = tk.Canvas(self.wrapper)
        self.canvas.pack(side=tk.LEFT, fill="both")
        
        self.bodyFrame = tk.Frame(self.window, bg='#ffffff')
        self.bodyFrame.place(x=328, y=28, width=444, height=444)

        #scrollable_frame = ScrollableFrame(self.bodyFrame)
    
        #HACER QUE SE PUEDA HACER SCROLL https://blog.teclado.com/tkinter-scrollable-frames/


        # self.scrollbar = ttk.Scrollbar(self.wrapper, orient="vertical", command=self.canvas.yview)
        # self.scrollbar.pack(side=tk.RIGHT,fill="y")
        
        # self.canvas.configure(yscrollcommand=self.scrollbar.set)
        # self.canvas.bind('<Configure>', lambda e: self.canvas.configure(scrollregion = self.canvas.bbox('all')))


        # self.bodyFrame = tk.Frame(self.canvas)
        # self.bodyFrame.place(x=328, y=110, width=1010, height=548)


        # self.canvas.create_window((0,0), window=self.bodyFrame)

        # self.wrapper.place(x=328, y=110, width=1010, height=548)



        # for i in range(10):
        #     random_frame = tk.Frame(self.bodyFrame, bg= "#5C6BC0", width=700, height=120)
        #     random_frame.pack(pady=20, padx=(200, 0))
        #     tk.Label(random_frame, text='NOMBRE APELLIDO',bg='#C6CCF0', font=("", 15, "bold")).place(x=10, y=10)
        #     tk.Label(random_frame, text='ROL: PROFESIONAL',bg='#C6CCF0', font=("", 15, "bold")).place(x=10, y=65)
            
        #     tk.Button(random_frame, text="Ver", bg='#C6CCF0', font=("", 13, "bold"), bd=0, cursor="hand2", activebackground='#ffffff').place(x=600, y=10)
        #     tk.Button(random_frame, text="Editar", bg='#C6CCF0', font=("", 13, "bold"), bd=0, cursor="hand2", activebackground='#ffffff').place(x=600, y=65)
        
        
        self.window.mainloop()






    # ---------------------------------------------------------------------------------------------------------------------



    def listProfesionals(self, profesionals):
        self.bodyFrame = tk.Frame(self.window, bg='#ffffff')
        self.bodyFrame.place(x=328, y=28, width=444, height=444)

        base_separation = 120
        separation = base_separation
        #ID CUENTA = 5
        counter = 0
        for profesional in profesionals:
            profesionalFrame = tk.Frame(self.bodyFrame, bg= "#5C6BC0", width=422, height=100)
            profesionalFrame.place(x=10, y=10+(separation*counter))
            tk.Label(profesionalFrame, text=f"{profesional[1].split(' ')[0]} {profesional[2].split(' ')[0]}",bg='#C6CCF0', font=("", 15, "bold")).place(x=10, y=10)
            tk.Label(profesionalFrame, text='ROL: PROFESIONAL',bg='#C6CCF0', font=("", 15, "bold")).place(x=10, y=55)
            
            tk.Button(profesionalFrame, text="Ver", bg='#C6CCF0', font=("", 13, "bold"), bd=0, cursor="hand2", activebackground='#ffffff',
                     command=lambda x=profesional[5]:self.viewUser(x)).place(x=300, y=10)

            tk.Button(profesionalFrame, text="Editar", bg='#C6CCF0', font=("", 13, "bold"), bd=0, cursor="hand2", activebackground='#ffffff').place(x=300, y=55)
            counter += 1
            

    def listClients(self):
        self.bodyFrame = tk.Frame(self.window, bg='#ffffff')
        self.bodyFrame.place(x=328, y=28, width=444, height=444)