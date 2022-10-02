from werkzeug.security import generate_password_hash, check_password_hash


def encryter(password):
    encrypter = generate_password_hash(password)
    return encrypter
def decrypt(encriptado,password):
    check = check_password_hash(encriptado,password)
    return check
