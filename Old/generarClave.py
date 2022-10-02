from werkzeug.security import generate_password_hash, check_password_hash




clave = input("Ingrese su clave>>")
claveEncriptada = generate_password_hash(clave)
print(F"La clave es '{clave}' y su clave Encriptada es:\n{claveEncriptada}")

    
    
