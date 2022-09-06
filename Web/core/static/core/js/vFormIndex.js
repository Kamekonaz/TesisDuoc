function vNombreP()
{
    var nombreP = document.getElementById("nombreP").value;
    if (nombreP < 3 || nombreP > 15)
    {
        document.getElementById("texto_nombreP").innerHTML = "Su nombre no es correcto";
        document.getElementById("texto_nombreP").style.color = "red";
        document.getElementById("flag_nombreP").value = "1";
    }else{
        document.getElementById("texto_nombreP").innerHTML = "Su nombre es correcto";
        document.getElementById("texto_nombreP").style.color = "green";
        document.getElementById("flag_nombreP").value = "0";
    }

    var v1 = document.getElementById("flag_nombreP").value;
    var v2 = document.getElementById("flag_apellidoP").value;
    var v3 = document.getElementById("flag_numP").value;
    var v4 = document.getElementById("flag_consulta").value;

    if (v1 == "1" && v2 == "1"){

        document.getElementById("enviar").disabled = false;
    }else{
        document.getElementById("enviar").disabled = true;
    }
}

function vApellidoP()
{
    var apelliidoP = document.getElementById("apellidoP").value;
    if (apellidoP < 4 || apellidoP > 25)
    {
        document.getElementById("texto_apellidoP").innerHTML = "Su apellido no es correcto";
        document.getElementById("texto_apellidoP").style.color = "red";
        document.getElementById("flag_apellidoP").value = "1";
    }else{
        document.getElementById("texto_apelldidoP").innerHTML = "Su apellido es correcto";
        document.getElementById("texto_apellidoP").style.color = "green";
        document.getElementById("flag_apellidoP").value = "0";
    }

    var v1 = document.getElementById("flag_nombreP").value;
    var v2 = document.getElementById("flag_apellidoP").value;
    var v3 = document.getElementById("flag_numP").value;
    var v4 = document.getElementById("flag_consulta").value;

    if (v1 == "1" && v2 == "1"){

        document.getElementById("enviar").disabled = false;
    }else{
        document.getElementById("enviar").disabled = true;
    }
}