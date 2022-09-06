# Generated by Django 4.0.4 on 2022-06-18 20:12

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Categoria',
            fields=[
                ('idCategoria', models.AutoField(primary_key=True, serialize=False, verbose_name='Id Categoría')),
                ('nombre', models.CharField(max_length=30, verbose_name='Nombre Categoría')),
            ],
        ),
        migrations.CreateModel(
            name='Producto',
            fields=[
                ('idProducto', models.AutoField(primary_key=True, serialize=False, verbose_name='Id Producto')),
                ('nombre', models.CharField(max_length=30, verbose_name='Nombre Producto')),
                ('descripcion', models.CharField(max_length=100, verbose_name='Descripción del Producto')),
                ('precio', models.IntegerField(verbose_name='Precio')),
                ('stock', models.IntegerField(verbose_name='Stock')),
                ('imagen', models.ImageField(upload_to='', verbose_name='Imágen Producto')),
            ],
        ),
        migrations.CreateModel(
            name='Usuario',
            fields=[
                ('idUsuario', models.AutoField(primary_key=True, serialize=False, verbose_name='Id Usuario')),
                ('nombre', models.CharField(max_length=30, verbose_name='Nombre de Usuario')),
                ('correo', models.CharField(max_length=30, verbose_name='Correo')),
                ('password', models.CharField(max_length=10, verbose_name='Contraseña')),
                ('tipoUsuario', models.CharField(max_length=20, verbose_name='Tipo de Usuario')),
            ],
        ),
        migrations.CreateModel(
            name='Venta',
            fields=[
                ('idVenta', models.AutoField(primary_key=True, serialize=False, verbose_name='Id Venta')),
                ('despacho', models.CharField(max_length=50, verbose_name='Dirección de Despacho')),
                ('montoPagar', models.IntegerField(verbose_name='Monto a Pagar')),
                ('idProducto', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.producto')),
            ],
        ),
        migrations.CreateModel(
            name='SubCategoria',
            fields=[
                ('idSubCategoria', models.AutoField(primary_key=True, serialize=False, verbose_name='Id Sub-Categoría')),
                ('nombre', models.CharField(max_length=30, verbose_name='Nombre Sub Categoría')),
                ('idCategoria', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.categoria')),
            ],
        ),
        migrations.AddField(
            model_name='producto',
            name='idSubCategoria',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.subcategoria'),
        ),
        migrations.CreateModel(
            name='Donacion',
            fields=[
                ('idDonacion', models.AutoField(primary_key=True, serialize=False, verbose_name='Id Donación')),
                ('descuento', models.IntegerField(verbose_name='Descuento')),
                ('suscripcion', models.DateField(verbose_name='Tiempo de Suscripción')),
                ('idUsuario', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.usuario', unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Detalle',
            fields=[
                ('idDetalle', models.AutoField(primary_key=True, serialize=False, verbose_name='Id Detalle')),
                ('cantidad', models.IntegerField(verbose_name='Cantidad')),
                ('montoTotal', models.IntegerField(verbose_name='Monto Total')),
                ('idProducto', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.producto')),
                ('idVenta', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.venta')),
            ],
        ),
    ]
