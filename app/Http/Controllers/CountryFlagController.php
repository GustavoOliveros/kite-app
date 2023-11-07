<?php

namespace App\Http\Controllers;

use SoapClient;
use SoapFault;

class CountryFlagController extends Controller
{
  static public function getFlag($countryISOCode)
  {
    $flagUrl = "";

    $client = new SoapClient('http://webservices.oorsprong.org/websamples.countryinfo/CountryInfoService.wso?WSDL');

    // Define the parameters for the "CountryFlag" operation.
    $params = [
      'sCountryISOCode' => $countryISOCode,
    ];

    try {
      // Call the "CountryFlag" operation.
      $result = $client->__soapCall('CountryFlag', [$params]);

      // The $result should contain a link to a picture of the country flag.
      // You can access it using $result->CountryFlagResult.
      $flagUrl = $result->CountryFlagResult;
    } catch (SoapFault $fault) {
      
    }


    return $flagUrl;
  }
}
