<?php

namespace App\Http\Controllers;

use SoapClient;
use SoapFault;

class CountryFlagController extends Controller
{
  static public function getFlag($countryISOCode)
  {
    // Declaración e inicialización de la variable que retornaremos
    $flagUrl = "";

    // Constructor. Le damos el WSDL del servicio.
    $client = new SoapClient('http://webservices.oorsprong.org/websamples.countryinfo/CountryInfoService.wso?WSDL');

    // Parámetros de la petición
    $params = [
      'sCountryISOCode' => $countryISOCode,
    ];

    try {
      // Llamada SOAP.
      $result = $client->__soapCall('CountryFlag', [$params]);

      // El resultado se guarda en CountryFlagResult
      $flagUrl = $result->CountryFlagResult;
    } catch (SoapFault $fault) {
      // Si algo salió mal, acá se puede colocar el manejo del error.
      // Como no es crucial, no se requiere nada.
      
    }

    // Retornamos la bandera o string vacio
    return $flagUrl;
  }
}
