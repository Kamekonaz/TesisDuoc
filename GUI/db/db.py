import cx_Oracle

class conect():
    def __init__(self):
        self.clave = str(123)
        try:
            self.conexion = cx_Oracle.connect(user='ESTUDIANTE', password=self.clave, dsn="localhost:1521/orcl",encoding='UTF-8')
        except Exception as ex:
            print (ex)
            print("Error")
        else:
            print('Conexcion establecida')
    def sentenciaSimple(self,sentencia):
        cursor = self.conexion.cursor()
        cursor.execute(sentencia)
    def sentenciaCompuesta(self,sentencia):
        cursor = self.conexion.cursor()
        cursor.execute(sentencia)
        datos = cursor.fetchall()
        cursor.close()
        return datos
    def close(self):
        self.conexion.close()
    def commint(self):
        self.conexion.commint()


if __name__ =='__main__':
    nexo = conect()
    datos = nexo.sentenciaCompuesta("select usuario_empleado from empleado where usuario_empleado ='duesa'")
    print(datos)
    for fila in nexo.sentenciaCompuesta('select * from empleado'):
        print(fila)
