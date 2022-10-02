from tkinter import PhotoImage
from PIL import Image,ImageTk

#Dimencionar las imagenes
def read_image(path,size):
    return ImageTk.PhotoImage(Image.open(path).resize(size, Image.ANTIALIAS))
#Centar la ventana
def center_window(window,apk_width,apk_height):
    window_width = window.winfo_screenwidth()
    window_height = window.winfo_screenheight()
    x = int((window_width/2)-(apk_width/2))
    y = int((window_height/2)-(apk_height/2))
    return window.geometry(f"{apk_width}x{apk_height}+{x}+{y}")
