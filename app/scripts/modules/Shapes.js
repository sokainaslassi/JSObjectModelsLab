(function(global) {
  'use strict';
  global.Shapes = {
    VERSION:'0.0.1'
  };

  function createShape(attributs) {

    attributs = attributs;
    attributs._id = parseInt(attributs._id);
    attributs.name = attributs.name;
    attributs.nodes = attributs.nodes;

    if (typeof attributs._id !== 'number' || !Array.isArray(attributs.nodes)) {
      throw {
        name: "TypeError",
        message: "Erreur des attributs"
      };
    }

    var _shape = {};
    _shape.id = function()
    { return attributs._id; };

    _shape.getName = function() 
    { return attributs.name || ""; };

    _shape.toString = function() 
    { return "( ID :" + attributs._id + ", Name : " + attributs.name + ", nodes : " + attributs.nodes + ")"; };

    _shape.toSvgPath = function() {
      function toTableaux(obj){
        var tableau = [];
        tableau.push(obj.x);
        tableau.push(obj.y);
        return tableau;
      };

      var newTableau =  attributs.nodes.map(toTableaux);
      function chaine(obj) {
        var chn = " ";
        return chn + obj.join(" ");
      }
      var path = newTableau.map(chaine);
      var newPath = "M";
      return newPath + path.join(" L");
    };

    return _shape;
  };

  function createRoad(attributs) {
    attributs = attributs;
    attributs.category = attributs.highway;

    var _road = createShape(attributs);

    _road.getCategory = function() {
      return attributs.category;
    };

    return _road;
  };

  function createBuilding(attributs) {
    attributs = attributs;

    var _building = createShape(attributs);

    _building.getArea = function() {
      var area = 0;
      for(var cpt = 0; cpt < attributs.nodes.length-1; cpt++) {
        area += attributs.nodes[cpt].x*attributs.nodes[cpt+1].y - attributs.nodes[cpt+1].x * attributs.nodes[cpt].y;
      }
      return area / 2;
    };

    _building.area = _building.getArea();

    return _building;
  };

  function createAmenity(attributs) {
    attributs = attributs;
    attributs.type = attributs.amenity;

    var _amenity = createShape(attributs);

    _amenity.getType = function() {
      return attributs.type;
    };

    return _amenity;
  };

  function createNatural(attributs) {
    attributs = attributs;
    attributs.type = attributs.natural;

    var _natural = createShape(attributs);

    _natural.getType = function() {
      return attributs.type;
    };

    return _natural;
  };

  global.Shapes.createShape = createShape;
  global.Shapes.createRoad = createRoad;
  global.Shapes.createBuilding = createBuilding;
  global.Shapes.createAmenity = createAmenity;
  global.Shapes.createNatural = createNatural;

}(this));
