// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  url: 'http://localhost:4300/',
  //apii: 'http://localhost:9090/',
  Orbus:'http://196.207.202.51:8080/',
  apii: 'http://10.3.80.98:8081/immatriculationbackend/',
  apiiTest: 'http://192.168.2.150:8080/immatriculationbackend/',
  // apiDemande: 'http://10.3.20.63:2021',
  apiDemande: 'http://192.168.0.49:2021',
  //jbpm:'https://192.168.2.98:8081/business-central/',

  //jbpm:'http://10.3.80.98:8080/business-central/',
  jbpm:'http://10.3.20.62:8082/business-central/',
  jbpmdoc: 'http://192.168.137.1:8082/'
  //jbpmdoc: 'http://10.3.80.98:8080/'
  //jbpmdoc: 'https://192.168.2.98:8081/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
