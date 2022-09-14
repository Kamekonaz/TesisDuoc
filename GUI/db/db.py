import cx_Oracle
cx_Oracle.init_oracle_client(lib_dir=r"C:\instantclient_21_6")
class conect():
    def __init__(self):
        self.clave = "GURO"
        try:
            self.conexion = cx_Oracle.connect(user='GURO', password=self.clave, dsn="localhost:1521/xe",encoding='UTF-8')
        except Exception as ex:
            print (ex)
            print("Error")
        else:
            print('Conexcion establecida')
    def crearCursor(self):
        cursor = self.conexion.cursor()
        return cursor
    def cerrarCursor(self, cursor):
        cursor.close()
    def sentenciaCompuesta(self,sentencia):
        cursor = self.conexion.cursor()
        cursor.execute(sentencia)
        datos = cursor.fetchall()
        cursor.close()
        return datos
    def funcionCompuesta(self, nombre_funcion, parametros, tipo_retorno):
        cursor = self.conexion.cursor()
        datos = cursor.callfunc(nombre_funcion, tipo_retorno, parametros)
        cursor.close()
        return datos
    def procedimientoAlmacenado(self, nombre_funcion, parametros):
        cursor = self.conexion.cursor()
        cursor.callproc(nombre_funcion, parametros)
        self.conexion.commit()
        cursor.close()
        
    def procedimientoAlmacenadoOutNumber(self, nombre_funcion, parametros):
        cursor = self.conexion.cursor()
        salida = cursor.var(cx_Oracle.NUMBER)
        parametros.append(salida)
        cursor.callproc(nombre_funcion, parametros)
        cursor.close()
        return parametros[-1]


    def close(self):
        self.conexion.close()
    def commint(self):
        self.conexion.commint()

"""
if __name__ =='__main__':
    nexo = conect()
    datos = nexo.sentenciaCompuesta("select usuario_empleado from empleado where usuario_empleado ='duesa'")
    print(datos)
    for fila in nexo.sentenciaCompuesta('select * from empleado'):
        print(fila)"""
