class ApiRequest{}          //Con tipo de request y parametro
                            //Deberá de tener un método que de info para construir...

class Receta{}              //Abstracta, de esta no se monta, lista los atributos y métodos a implementar

class TarjetaReceta{}       //Tendrá los atributos que van en la tarjeta y un método
                            //Para montar el HTML de la tarjeta "mini"
                            //Hereda de Receta

class RecetaDetallada{}     //Tendrá los atributos de la tarjeta normales y el resto para generar una vista
                            //Tendrá un método para montar el HTML de la vision detallada

function addHTML()          //Una funcion que tomara el html resultante de una de las clases
                            //Y los incrustará en el HTML

function getInputText()     //Recoger el texto del input

