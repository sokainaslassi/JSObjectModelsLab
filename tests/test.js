(function () {
    'use strict';

    /* global test,equal,module,start,stop,window,$,ok,expect */


    /*---------------------------------*/
    /*     PART ONE: SIMPLE MODULE     */
    /*---------------------------------*/
    module('SpeedCheck Module', {
        beforeEach: function() {

        }
    });

    // TODO: Vérifier que la création d'objets SpeedCheck est Possible

    test('Test de vérification que la création d\'objets "SpeedCheck" est Possible', function() {

    	expect(6);

	var speed0 = window.createSpeedCheck();
	var speed1 = window.createSpeedCheckFR();
	var speed2 = window.createSpeedCheckBE();

    	ok(typeof window.createSpeedCheck() !== "undefined", 'Fonction "createSpeedCheck"')
    	ok(typeof speed0 === 'object', 'La fonction "createSpeedCheck" retourne un objet.')

      	ok(typeof window.createSpeedCheckFR() !== "undefined", 'Fonction "createSpeedCheckFR"')
      	ok(typeof speed1 === 'object', 'La fonction "createSpeedCheckFR" retourne un objet.')
	
      	ok(typeof window.createSpeedCheckBE() !== "undefined", 'Fonction "createSpeedCheckBE"')
      	ok(typeof speed2 === 'object', 'La fonction "createSpeedCheckBE" retourne un objet.')
    });

    // TODO: Vérifier que les objets créés directement avec creatSpeedCheck ne sont pas utilisables :
    // speed0 = creatSpeedCheck();
    // speed0.speed = 42; // SHOULD throw a SpeedCheckError.
    // speed0.licencePlate = '3-DFE-456'; // SOULD throw a SpeedCheckError.

    test('Test de vérification que les objets créés directement avec "createSpeedCheck" ne sont pas utilisables', function() {

      	expect(2);
      	var speed0 = window.createSpeedCheck();
	
      	try { 
		speed0.speed = 42; 
	} catch(e) { 
		ok(e.message, 'SHOULD throw a SpeedCheckError.') 
	}

      	try { 
		speed0.licencePlate = '3-DFE-456'; 
	} catch(e) { 
		ok(e.message, 'SHOULD throw a SpeedCheckError.')
	}
    });

    // TODO: Vérifier que TOUTES les fonctionnalités de createSpeedCheckFR sont correctes (effects de bords, valeurs négatives, etc.) pour tous les attributs (speed et licencePlate)

    test('Test de vérification que TOUTES les fonctionnalités de "createSpeedCheckFR" sont correctes pour tous les attributs', function() {

    	expect(9);
      	var speed0 = window.createSpeedCheckFR();

      	equal(speed0.speed, 0, 'Speed null');

      	try {
        	speed0.speed = -10;
      	} catch(e) {
      		ok(e.name, 'SpeedCheckError');
      		ok(e.message, 'Vitesse négative. Vous roulez a contre sens?');
      	}

      	speed0.speed = 130;
      	equal(speed0.infraction , false, 'Vitesse = '+ speed0.speed +' << Pas d\'infraction >>');	

      	speed0.speed = 140;
      	ok(speed0.infraction , 'Vitesse = '+ speed0.speed +' << Infraction !!! >>');

      	equal(speed0.licencePlate, '???' , 'Liscence Plate par defaut');

      	try {
        	speed0.licencePlate = '3-DFE-456';
      	} catch(e) {
      		ok(e.name, 'SpeedCheckError');
      		ok(e.message, 'Plaque non reconnue. Vous avez de la chance.');
      	}

      	speed0.licencePlate = 'DE123FG';
      	ok(speed0.licencePlate, 'Plaque reconnue');
    });

    // TODO: Vérifier que TOUTES les fonctionnalités de createSpeedCheckBE sont correctes (effects de bords, valeurs négatives, etc.) pour tous les attributs (speed et licencePlate)

    test('Test de vérification que TOUTES les fonctionnalités de "createSpeedCheckBE" sont correctes pour tous les attributs', function() {

      	expect(9);
      	var speed0 = window.createSpeedCheckBE();

      	equal(speed0.speed, 0, 'Speed null');

      	try {
        	speed0.speed = -10;
      	} catch(e) {
		ok(e.name, 'SpeedCheckError');
      		ok(e.message, 'Vitesse négative. Vous roulez a contre sens?');
      	}

      	speed0.speed = 120;
      	equal(speed0.infraction , false, 'Vitesse = '+ speed0.speed +' << Pas d\'infraction >>');

      	speed0.speed = 130;
      	ok(speed0.infraction ,'Vitesse = '+ speed0.speed +' << Infraction !!! >>');

      	equal(speed0.licencePlate, '???', 'Liscence Plate par defaut');

      	try {
        	speed0.licencePlate = 'DE123FG';
      	} catch(e){
		ok(e.name, 'SpeedCheckError');
      		ok(e.message, 'Plaque non reconnue. Vous avez de la chance.');
      	}
      
      	speed0.licencePlate = '3-DFE-456';
      	ok(speed0.licencePlate,'Plaque reconnue');
    });

    // TODO: Vérifier que la fonction toString() fonctionne bien.
    //  - chaine de caractère attentue pour une infracion (e.g. licencePlate === 'WD366MD' et  speed === 135):
    //      "Véhicule WD366MD roule à 135 km/h. Infraction!"
    //  - chaine de caractère attendue pour sans infraction (e.g. licencePlate === 'WD366MD' et  speed === 105):
    //      "Véhicule WD366MD roule à 105 km/h. Ça va, circulez..."

    test('Test de vérification que la fonction toString fonctionne bien ', function() {

      	expect(4);
      	var speed0 = window.createSpeedCheckFR();
      	var speed1 = window.createSpeedCheckBE();

      	speed0.speed = 130;
	equal(speed0.infraction , false, 'Vitesse = '+ speed0.speed +' << Pas d\'infraction >>')

      	speed1.speed = 130;
	ok(speed1.infraction , 'Vitesse = '+ speed1.speed +' << Infraction !!! >>')

      	speed0.licencePlate = 'DE123FG'
	ok(speed0.toString(), 'Véhicule '+ speed0.licencePlate +' roule à 130 km/h. Ça va, circulez...')

      	speed1.licencePlate = '3-DFE-456';
      	ok(speed1.toString(), 'Véhicule '+ speed1.licencePlate +' roule à 130 km/h. Infraction!')
    });

    /*---------------------------------*/
    /*  PART TWO: The "Shapes" module  */
    /*---------------------------------*/

	var roadAttr, amenityAttr, buildingAttr, naturalAttr;
	    module('Unit Testing The "Shapes" Module', {
	      beforeEach: function(){
		roadAttr = JSON.parse('{ \
		  "building": false, \
		  "highway": "Residential", \
		  "_id": "-629863", \
		  "nodes": [{ \
		      "y": 369.0, \
		      "x": 708.0 \
		  }, { \
		      "y": 396.0, \
		      "x": 743.0 \
		  }], \
		  "name": "Rue de Colmar" \
		  } \
		');

		amenityAttr = JSON.parse('{\
		"_id":"-629724",\
		"nodes":[{"y":32.0,\
		"x":629.0},\
		{"y":42.0,\
		"x":597.0},\
		{"y":43.0,\
		"x":595.0},\
		{"y":32.0,\
		"x":629.0}],\
		"amenity":"parking"}');

		buildingAttr = JSON.parse('{"building":true,\
		"_id":"-629719",\
		"nodes":[{"y":0.0,\
		"x":0.0},\
		{"y":0.0,\
		"x":100.0},\
		{"y":100.0,\
		"x":100.0},\
		{"y":100.0,\
		"x":0.0},\
		{"y":0.0,\
		"x":0.0}]}');

		naturalAttr = JSON.parse('{"building":false,\
		"_id":"-630043",\
		"nodes":[{"y":309.0,\
		"x":222.0},\
		{"y":324.0,\
		"x":262.0},\
		{"y":335.0,\
		"x":231.0},\
		{"y":309.0,\
		"x":222.0}],\
		"name":"Bassin Paul Vatine",\
		"natural":"water"}');

	      }
	    });


	    test('Test Shapes\' VERSION Property', function() {
		expect(1);
		equal(window.Shapes.VERSION, '0.0.1', 'The Shapes module should have a VERSION property');
	    });

	    test('Test Creation of a Default Object', function() {
	      expect(2);
	      ok(typeof window.Shapes.createShape !== 'undefined', 'The Shapes module sould expose a "createShape" function');
	      var shape0 = window.Shapes.createShape(roadAttr);
	      ok(typeof shape0 === 'object', 'The "createShape" function sould return objects.');
	    });

	    test('Test proper hidding of properties', function() {
	      expect(5);
	      var shape0 = window.Shapes.createShape(roadAttr);
	      var prop;
	      var props = [];
	      for(prop in shape0){
		if(shape0.hasOwnProperty(prop)){
		  props.push(prop);
		}
	      }
	      // Only 4 properties SHOULD be  visible
	      //{ id: [Function], toString: [Function], toSVGPath: [Function], getName: [Function] }
	      equal(props.length, 4, 'Only 4 properties SHOULD be  visible in objects created by "createShape"');
	      props.forEach(function(prop){
		ok(prop === 'id' || prop === 'toString' || prop === 'toSvgPath' || 'getName', 'One of "id" "toString", "toSvgPath" or "getName"');
	      });

	    });


	    test('Test the toSVGString method', function() {
	      expect(1);
	      var shape0 = window.Shapes.createShape(roadAttr);
	      equal(shape0.toSvgPath(), 'M 708 369 L 743 396', 'Should create a valid SVG PATH (google SVG PATH for details)');
	    });

	    test('Test the name accessor', function() {
	      expect(1);
	      var shape0 = window.Shapes.createShape(roadAttr);
	      equal(shape0.getName(), 'Rue de Colmar', 'Should return the value corresponding to the "name" property in the attributes');
	    });


	    test('Test the createRoad function', function() {
	      expect(1);
	      ok(typeof window.Shapes.createRoad !== 'undefined', 'The Shapes module sould expose a "createRoad" function');
	    });

	    test('Test objects created with the createRoad function', function() {
	      expect(2);
	      var road = window.Shapes.createRoad(roadAttr);
	      ok(typeof road.getCategory === 'function', 'Object Created with "createRoad" Should have a getCategory function');
	      equal(road.getCategory(),'Residential', 'Should return the value corresponding to the "highway" property in the attributes');
	    });

	    test('Test the createAmenity function', function() {
	      expect(1);
	      ok(typeof window.Shapes.createAmenity !== 'undefined', 'The Shapes module sould expose a "createAmenity" function');
	    });

	    test('Test objects created with the  createAmenity function', function() {
	      expect(2);
	      var amenity = window.Shapes.createAmenity(amenityAttr);
	      ok(typeof amenity.getType === 'function', 'Object Created with "createAmenity" Should have a getType function');
	      equal(amenity.getType(),'parking', 'Should return the value corresponding to the "amenity" property in the attributes');
	    });

	    test('Test the createBuilding function', function() {
	      expect(1);
	      ok(typeof window.Shapes.createBuilding !== 'undefined', 'The Shapes module sould expose a "createBuilding" function');
	    });

	    test('Test objects created with the  createBuilding function', function() {
	      expect(2);
	      var building = window.Shapes.createBuilding(buildingAttr);
	      ok(typeof building.getArea === 'function', 'Object Created with "createBuilding" Should have a getArea function');
	      equal(building.getArea(),10000, 'Should return the area of the building computed from the set of points in the nodes attributes');
	    });


	    test('Test the createNatural function', function() {
	      expect(1);
	      ok(typeof window.Shapes.createNatural !== 'undefined', 'The Shapes module sould expose a "createNatural" function');
	    });

	    test('Test objects created with the  createNatural function', function() {
	      expect(2);
	      var natural = window.Shapes.createNatural(naturalAttr);
	      ok(typeof natural.getType === 'function', 'Object Created with "createNatural" Should have a getType function');
	      equal(natural.getType(),'water', 'Should return the value corresponding to the "natural" property in the attributes');
	    });
	    
    /*-----------------------------------*/
    /* PART THREE: Test with a JSON file */
    /*-----------------------------------*/

    // TODO Write the whole test module for testing with the app/data/eure.json file.

    var obj;

    var objets;
    var others;
    var ModeleObjetShape = {Buildings:[], Roads:[], Amenities:[], Naturals:[]};

    module('Asynchronous Unit Test Module', {
        setup: function() {
            stop();

            // You can load a resource before loaching the test...
            $.get('test.json').success(function(data){
                obj = data;
            });

            // ... Or any asynchroneous task
            // window.setTimeout(function() {
            //     obj = {a:'OK', b:'KO'};
            //     start();
            // }, 1000);

       	    $.get('data/eure.json').success(function(data){
                objets = data;
                others = 0;
                ModeleObjetShape = {Buildings:[], Roads:[], Amenities:[], Naturals:[]};
                for (var cpt = 0; cpt < objets.length; cpt++){
                  if (objets[cpt].hasOwnProperty("building") && objets[cpt].building === true) {
                    ModeleObjetShape.Buildings.push(window.Shapes.createBuilding(objets[cpt]));
                  }
                  else if (objets[cpt].hasOwnProperty("amenity")){
                    ModeleObjetShape.Amenities.push(window.Shapes.createAmenity(objets[cpt]));
                  }
                  else if (objets[cpt].hasOwnProperty("highway")) {
                    ModeleObjetShape.Roads.push(window.Shapes.createRoad(objets[cpt]));
                  }
                  else if (objets[cpt].hasOwnProperty("natural")) {
                    ModeleObjetShape.Naturals.push(window.Shapes.createNatural(objets[cpt]));
                  }
                  else
                  others++;

                }
                start();
            });
        }
    });

    test('Test de vérification des nombre des objets', function(){

      expect(2);
      var resultat = ModeleObjetShape.Buildings.length + ModeleObjetShape.Amenities.length + ModeleObjetShape.Roads.length + ModeleObjetShape.Naturals.length + others;

      ok(objets.length !== 0, 'Longueur non nulle ');      
      equal(objets.length, resultat, 'Nombre des objets');

    });

    test('Test de vérification du surface des Buildings', function(){

      expect(1);
      var resultat = ModeleObjetShape.Buildings[0].getArea();

      for (var cpt=1 ; cpt < ModeleObjetShape.Buildings.length ; cpt++) {
        resultat += ModeleObjetShape.Buildings[cpt].getArea();
      }
      ok(resultat !== 0, 'Somme du surface non nulle');
    });



    test('test 1', function() {
        equal(obj.a, 'OK', 'Message');
        equal(obj.a+'KO', 'OKKO', 'Message');
    });

    test('test 2', function() {
        equal(obj.a+obj.b, 'OKKO', 'FAil');
    });

}());
