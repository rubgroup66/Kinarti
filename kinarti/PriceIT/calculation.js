var myBoxes;
var myMaterials;
var myFacades;
var myHandles, handlesCost;
var myHinges, hingesCost1, hingesCost2;
var constants;
var params;
var height, width, depth;
var myIronWorks, ironWorksCost1, ironWorksCost2;
var numberOfDistancedInternalDrawer = 1;
var facadeColorWorkCoefficient, facadeFRNWorkCoefficient;
var woodBoxDrawerWorkCost;
var isColor = 1;
var projectID;

var boxWorkCost;
var isDistanced = 0;

var plateWorkCostForSquareMeter;
var plateSquareMeter;
var drawerCoefficientCost;
var materialWoodDrawersCoefficient;
var myFacadeMaterials;
var itemsdata;
var extraCostForItem;

$(document).ready(function () {
   // ajaxCall("GET", "../api/items", "", successGetItems, error); //get all saved items from DB
    ajaxCall("GET", "../api/materials", "", successGetMaterials, error); //get all materials from DB
    ajaxCall("GET", "../api/facades", "", successGetFacades, error);
    ajaxCall("GET", "../api/boxes", "", successGetBoxes, error);
    ajaxCall("GET", "../api/handles", "", successGetHandles, error);
    ajaxCall("GET", "../api/hinges", "", successGetHinges, error);
    ajaxCall("GET", "../api/constants", "", successGetConstants, error);
    ajaxCall("GET", "../api/ironWorks", "", successGetIronWorks, error);
    ajaxCall("GET", "../api/facadeMaterials", "", successGetFacadeMaterials, error);
    $("#pForm").submit(f2);
});

function error(err) { // this function is activated in case of a failure
    swal("Error: " + err);
}


function successGetItems(itemsdata) {// this function is activated in case of a success
        myItems = itemsdata;    
    for (var i = 0; i < myItems.length; i++) {
        $('#addExistingItem').append('<option value="' + itemsdata[i].ID + '" >' + itemsdata[i].Name + '</option>');
    }
    console.log("myItems" + " " + myItems);
}
function successGetMaterials(materialsdata) {// this function is activated in case of a success
    myMaterials = materialsdata;
    //myMaterials = (JSON.stringify(materialsdata));    
    for (var i = 0; i < materialsdata.length; i++) {
        $('#boxMaterial').append('<option value="' + materialsdata[i].ID + '" >' + materialsdata[i].Name + '</option>');
    }
    console.log("myMaterials" + " " + myMaterials);
}

function successGetFacades(facadesdata) {// this function is activated in case of a success
    console.log("facadesdata" + " " + facadesdata);
    //facades = (JSON.stringify(facadesdata));
    myFacades = facadesdata;
    for (var i = 0; i < facadesdata.length; i++) {
        $('#facadeType').append('<option value="' + facadesdata[i].ID + '" >' + facadesdata[i].Type + '</option>');
    }
    for (i = 0; i < facadesdata.length; i++) {
        $('#extraWallType').append('<option value="' + facadesdata[i].ID + '" >' + facadesdata[i].Type + '</option>');
    }
    console.log("myFacades" + " " + myFacades);
}

function successGetBoxes(boxesdata) {// this function is activated in case of a success
    // console.log(boxesdata);
    // boxes = (JSON.stringify(boxesdata));
    myBoxes = boxesdata;
    for (var i = 0; i < boxesdata.length; i++) {
        $('#boxMeasures').append('<option value="' + boxesdata[i].ID + '" >' + boxesdata[i].Height + 'X' + boxesdata[i].Width + 'X' + boxesdata[i].Depth + '</option>');
    }
}



function fillInputs(chosenItem) {// this function will take values from server to fields for chosen item
    for (var i = 0; i < itemsdata.length; i++) {
        if (chosenItem.Name === itemsdata[i].Name) {

            $("#cost").val(itemsdata[i].Cost);
            $("#itemName").val(itemsdata[i].Cost);
            $("#boxMaterial").val(itemsdata[i].Cost);
            $("#boxMeasures").val(itemsdata[i].Cost);
            $("#partitions").val(itemsdata[i].Cost),
            $("#shelves").val(itemsdata[i].Cost);
            $("#isDistanced").is(':checked') ? 1 : 0,
            $("#boxWoodDrawers").val(myItems[i].BoxWoodDrawers);
            $("#internalLegraBoxDrawers").val(itemsdata[i].InternalLegraBoxDrawers);
            $("#externalLegraBoxDrawers").val(itemsdata[i].ExternalLegraBoxDrawers);
            $("#internalScalaBoxDrawers").val(itemsdata[i].InternalScalaBoxDrawers);
            $("#externalScalaBoxDrawers").val(itemsdata[i].ExternalScalaBoxDrawers);
            $("#facadeMaterialType").val(itemsdata[i].FacadeMaterialTypeID);
            $("#facade").val(itemsdata[i].FacadeID);
            $("#hingesQuantity1").val(itemsdata[i].HingesQuantity1);
            $("#hingesType1").val(itemsdata[i].HingesType1);
            $("#hingesQuantity2").val(itemsdata[i].HingesQuantity2);
            $("#hingesType1").val(itemsdata[i].HingesType1);
            $("#extraWallQuantity").val(itemsdata[i].ExtraWallQuantity);
            $("#extraWallType").val(itemsdata[i].ExtraWallTypeID);
            $("#handlesQuantity").val(itemsdata[i].HandlesQuantity);
            $("#handlesType").val(itemsdata[i].handlesType);
            $("#ironWorksQuantity1").val(itemsdata[i].ironWorksQuantity1);
            $("#ironWorksType1").val(itemsdata[i].ironWorksType1);
            $("#ironWorksQuantity2").val(itemsdata[i].IronWorksQuantity2);
            $("#ironWorksType2").val(itemsdata[i].IronWorksType2);
        }
    }
}

function successGetHandles(handlesdata) {// this function is activated in case of a success
    //console.log(handlesdata);
    //handles = (JSON.stringify(handlesdata));
    myHandles = handlesdata;
    for (var i = 0; i < handlesdata.length; i++) {
        $('#handlesType').append('<option value="' + handlesdata[i].ID + '" >' + handlesdata[i].Type + '</option>');
    }
}
function successGetHinges(hingesdata) {// this function is activated in case of a success
    //console.log(hingesdata);
    //hinges=(JSON.stringify(hingesdata));
    myHinges = hingesdata;
    for (var i = 0; i < hingesdata.length; i++) {
        $('#hingesType1').append('<option value="' + hingesdata[i].ID + '" >' + hingesdata[i].Type + '</option>');
        $('#hingesType2').append('<option value="' + hingesdata[i].ID + '" >' + hingesdata[i].Type + '</option>');
    }
}

function successGetIronWorks(ironworksdata) {// this function is activated in case of a success
    //ironworks = (JSON.stringify(ironworksdata));
    myIronWorks = ironworksdata;
    for (var i = 0; i < ironworksdata.length; i++) {
        $('#ironWorksType1').append('<option value="' + ironworksdata[i].ID + '" >' + ironworksdata[i].Type + '</option>');
        $('#ironWorksType2').append('<option value="' + ironworksdata[i].ID + '" >' + ironworksdata[i].Type + '</option>');
    }
}

function successGetFacadeMaterials(facadeMaterialsdata) {// this function is activated in case of a success
    //ironworks = (JSON.stringify(ironworksdata));
    myFacadeMaterials = facadeMaterialsdata;
    console.log("facade materials -> " + JSON.stringify(facadeMaterialsdata));

    for (var i = 0; i < facadeMaterialsdata.length; i++) {
        $('#facadeMaterialType').append('<option value="' + facadeMaterialsdata[i].ID + '" >' + facadeMaterialsdata[i].Name + '</option>');

    }

}
// עצרתי בטעינת הצצבעים של החזיתות (גמר + קיר נוסף)



function successGetConstants(constantsdata) {// this function is activated in case of a success
    constants = constantsdata;
    console.log(constants);
    //constants = (JSON.stringify(constantsdata));
}

function success(data) {
    swal("הפריט נוסף בהצלחה!", "ניתן להמשיך בתמחור של פריטים נוספים", "success");
}
function f2() {
    addItem();

    return false; // the return false will prevent the form from being submitted
    // hence the page will not reload
}

var materialCoefficient;
var totalSum = 0;

function addItem2() {
    Item = {
        ProjectID: 9,
        Type: 1, // 'type' will be always 1 untill we add a different kind of box
        Cost: $("#cost").val()
    }

    ajaxCall("POST", "../api/item", JSON.stringify(Item), success, error);
}




function returenToProject() {
    parent.location = 'project.html';
}


function addItem() {
    Item = {
        ProjectID: 11,
        Type: 1, // 'type' will be always 1 untill we add a different kind of box
        Cost: $("#cost").val(),
        Name: $("#itemName").val(),

        BoxMaterial: $("#boxMaterial").val(),
        BoxMeasures: $("#boxMeasures").val(),
        Partitions: $("#partitions").val(),
        Shelves: $("#shelves").val(),
        IsDistanced: $("#isDistanced").is(':checked') ? 1 : 0,
        BoxWoodDrawers: $("#boxWoodDrawers").val(),
        InternalLegraBoxDrawers: $("#internalLegraBoxDrawers").val(),
        ExternalLegraBoxDrawers: $("#externalLegraBoxDrawers").val(),
        InternalScalaBoxDrawers: $("#internalScalaBoxDrawers").val(),
        ExternalScalaBoxDrawers: $("#externalScalaBoxDrawers").val(),
        FacadeMaterialTypeID: $("#facadeMaterialType").val(),
        FacadeID: $("#facade").val(),
        HingesQuantity1: $("#hingesQuantity1").val(),
        HingesType1ID: $("#hingesType1").val(),
        HingesQuantity2: $("#hingesQuantity2").val(),
        HingesType2ID: $("#hingesType1").val(),
        ExtraWallQuantity: $("#extraWallQuantity").val(),
        ExtraWallTypeID: $("#extraWallType").val(),
        HandlesQuantity: $("#handlesQuantity").val(),
        HandlesTypeID$: $("#handlesType").val(),
        IronWorksQuantity1: $("#ironWorksQuantity1").val(),
        IronWorksType1ID: $("#ironWorksType1").val(),
        IronWorksQuantity2: $("#ironWorksQuantity2").val(),
        IronWorksType2ID: $("#ironWorksType2").val(),
        ExtraCostForItem: $("#extraCostForItem").val()
    }

    ajaxCall("POST", "../api/item", JSON.stringify(Item), success, error);
}



function calculateItem() {
    collectChoices();

    boxSquareMeter = (2 * height * depth + 2 * width * depth + height * width) / 10000;

    var boxCost = basicMaterialCoefficient * boxSquareMeter * materialCoefficient + boxWorkCost * boxSquareMeter + lacquerWorkCost * boxSquareMeter;

    var withPartitions = params.partitionsQuantity * (boxWorkCost * height * depth * 2 + lacquerWorkCost * height * depth * 2);


    var withShelves = (boxWorkCost * depth * width + lacquerWorkCost * height * width) * params.shelvesQuantity / (params.partitionsQuantity + 1);

    var plateSquareMeter = drawerCoefficientCost * (depth - 5) * (2 * + width * 2 * drawerCoefficientCost + (depth - 5) * width) / 10000;

    var withboxWoodDrawers = (plateSquareMeter * basicMaterialCoefficient * materialWoodDrawersCoefficient + plateSquareMeter * lacquerWorkCost + woodRailsCost + woodBoxDrawerWorkCost) * params.boxWoodDrawersQuantity;
    //debugger;

    var withInternalLegraBoxDrawers = (LegraBoxDrawerWork + LegraboxInternalRailsCost) * params.internalLegraBoxDrawersQuantity;
    var withExternalLegraBoxDrawers = (LegraBoxDrawerWork + LegraboxExternalRailsCost) * params.externalLegraBoxDrawersQuantity;

    var ScalaSquareMeter = ((depth - 5) * width + drawerCoefficientCost * width) / 1000;

    var withInternalScalaBoxDrawers = (ScalaSquareMeter * ScalaCoefficient * ScalaDrawerWork + ScalaInternalRailsCost) * params.internalScalaBoxDrawersQuantity;
    var withExternalScalaBoxDrawers = (ScalaSquareMeter * ScalaCoefficient * ScalaDrawerWork + ScalaExternalRailsCost) * params.externalScalaBoxDrawersQuantity;

    var withDistancedInternalDrawer = isDistanced * (woodBoxDrawerWorkCost * numberOfDistancedInternalDrawer + (depth - 7) * lacquerWorkCost) / 10000;  //not final


    var withFacade = plateSquareMeter * facadeMaterialWorkCost + facadeworkCostForSquareMeter + (plateSquareMeter * 2 * facadeColorWorkCoefficient * isColor + plateSquareMeter * 2 * facadeFRNWorkCoefficient + 12 * (height * 2 + width * 2) * (isColor + 1)); // kantim

    // basicMaterialCoefficient + boxWorkCost * height * depth + (height * width / 10000 * facadeColorWorkCoefficient + height * width / 10000 * 100) + facadeFRNWorkCoefficient * height * width / 10000 + height * width / 10000 * 100 + 12 * (height * 2 + width * 2)); //need to update according to material type params.extraWallTypeID)

    var withExtraWall = params.extraWallQuantity * (height * depth * basicMaterialCoefficient + boxWorkCost * height * depth + (height * width / 10000 * facadeColorWorkCoefficient + height * width / 10000 * 100) + facadeFRNWorkCoefficient * height * width / 10000 + height * width / 10000 * 100 + 12 * (height * 2 + width * 2)); //need to update according to material type params.extraWallTypeID)

    var withHinges1 = hingesCost1 * params.hingesQuantity1;
    var withHinges2 = hingesCost2 * params.hingesQuantity2;

    var withHandles = handlesCost * params.handlesQuantity;

    var withIronWorks1 = ironWorksCost1 * params.ironWorksQuantity1;
    var withIronWorks2 = ironWorksCost2 * params.ironWorksQuantity2;



    totalSum = boxCost + withPartitions
        + withShelves + withboxWoodDrawers
        + withInternalLegraBoxDrawers + withExternalLegraBoxDrawers
        + withInternalScalaBoxDrawers + withExternalScalaBoxDrawers
        + withHinges1 + withHinges2 + withHandles
        + withIronWorks1 + withIronWorks2
        + withDistancedInternalDrawer + withExtraWall + withFacade + extraCostForItem;

    console.log("withFacade +" + withFacade);
    console.log("withExtraWall +" + withExtraWall);
    console.log("withDistancedInternalDrawer +" + withDistancedInternalDrawer);
    console.log("withPartitions +" + withPartitions);
    console.log("withShelves +" + withShelves);
    console.log("withboxWoodDrawers +" + withboxWoodDrawers);
    console.log("withInternalLegraBoxDrawers +" + withInternalLegraBoxDrawers);
    console.log("withExternalLegraBoxDrawers +" + withExternalLegraBoxDrawers);
    console.log("withInternalScalaBoxDrawers +" + withInternalScalaBoxDrawers);
    console.log("withExternalScalaBoxDrawers +" + withExternalScalaBoxDrawers);
    console.log("withHinges1 +" + withHinges1);
    console.log("withHinges2 +" + withHinges2);
    console.log("withHandles +" + withHandles);

    $('#cost').val(Math.round(totalSum));

    console.log(totalSum);


    return false; // the return false will prevent the form from being submitted
    // hence the page will not reload
}

function collectChoices() {
    params = {
        boxID: $("#boxMeasures").val(),
        materialID: $("#boxMaterial").val(),
        partitionsQuantity: $("#partitions").val(),
        shelvesQuantity: $("#shelves").val(),
        boxWoodDrawersQuantity: $("#boxWoodDrawers").val(),
        internalLegraBoxDrawersQuantity: $("#internalLegraBoxDrawers").val(),
        externalLegraBoxDrawersQuantity: $("#externalLegraBoxDrawers").val(),
        internalScalaBoxDrawersQuantity: $("#internalScalaBoxDrawers").val(),
        externalScalaBoxDrawersQuantity: $("#externalScalaBoxDrawers").val(),
        facadeID: $("#facadeType").val(),
        facadeType: $("#facadeMaterialType").val(),
        hingesType1ID: $("#hingesType1").val(),
        hingesQuantity1: $("#hingesQuantity1").val(),
        hingesType2ID: $("#hingesType2").val(),
        hingesQuantity2: $("#hingesQuantity2").val(),
        extraWallTypeID: $("#extraWallType").val(),
        extraWallQuantity: $("#extraWallQuantity").val(),
        handlesTypeID: $("#handlesType").val(),
        handlesQuantity: $("#handlesQuantity").val(),
        ironWorksType1ID: $("#ironWorksType1").val(),
        ironWorksQuantity1: $("#ironWorksQuantity1").val(),
        ironWorksType2ID: $("#ironWorksType2").val(),
        ironWorksQuantity2: $("#ironWorksQuantity2").val()
    };

    for (i = 0; i < myBoxes.length; i++) {
        if (myBoxes[i].ID.toString() === params.boxID) { // this is the handles cost
            height = myBoxes[i].Height;
            width = myBoxes[i].Width;
            depth = myBoxes[i].Depth;
        }
    }
    //console.log("myBoxes: ", myBoxes);

    boxWorkCost = constants[0].Cost;
    lacquerWorkCost = constants[1].Cost;
    basicMaterialCoefficient = constants[2].Cost;

    for (i = 0; i < myMaterials.length; i++) {
        if (myMaterials[i].ID.toString() === params.materialID) { // this is the specific material cost
            materialCoefficient = myMaterials[i].Coefficient;
            //console.log("myMaterials: ", myMaterials);
        }
    }

    woodRailsCost = constants[5].Cost;

    for (i = 0; i < myHinges.length; i++) {
        if (myHinges[i].ID.toString() === params.hingesType1ID) { // this is hinges 1 cost
            hingesCost1 = myHinges[i].Cost;
        }
        else
            hingesCost1 = 0;

        if (myHinges[i].ID.toString() === params.hingesType2ID) { // this is hinges 2 cost
            hingesCost2 = myHinges[i].Cost;
        }
        else
            hingesCost2 = 0;
    }

    for (i = 0; i < myHandles.length; i++) {
        if (myHandles[i].ID.toString() === params.handlesTypeID) { // this is the handles cost
            handlesCost = myHandles[i].Cost;
        }
        else
            handlesCost = 0;
    }
    for (i = 0; i < myIronWorks.length; i++) {
        if (myIronWorks[i].ID.toString() === params.ironWorksType1ID) { // this is hinges 1 cost
            ironWorksCost1 = myIronWorks[i].Cost;
        }
        else {
            ironWorksCost1 = 0;
        }

        if (myIronWorks[i].ID.toString() === params.ironWorksType2ID) { // this is hinges 2 cost
            ironWorksCost2 = myIronWorks[i].Cost;
        }
        else { ironWorksCost2 = 0; }

        LegraBoxDrawerWork = constants[7].Cost;
        //LegraBoxDrawerWork = constants.find(function (item) { return item.constantName === "LegraboxDrawerWork"; });

        console.log('LegraBox => ' + LegraBoxDrawerWork);

        ScalaDrawerWork = constants[8].Cost;
        drawerCoefficientCost = constants[3].Cost;
        //plateThickness = constants[4].Cost;
        ScalaCoefficient = constants[9].Cost;
        LegraboxInternalRailsCost = constants[10].Cost;
        LegraboxExternalRailsCost = constants[12].Cost;
        ScalaInternalRailsCost = constants[11].Cost;
        ScalaExternalRailsCost = constants[13].Cost;
        woodBoxDrawerWorkCost = constants[6].Cost;


        facadeFRNWorkCoefficient = constants[6].Cost;// 280

        plateWorkCostForSquareMeter = constants[13].Cost;// 25
        facadeColorWorkCoefficient = constants[14].Cost; // 200;
        facadeworkCostForSquareMeter = plateWorkCostForSquareMeter / (height * width);


        plateSquareMeter = height * width / 10000;


        for (i = 0; i < myFacadeMaterials.length; i++) {
            if (myFacadeMaterials[i].ID.toString() === params.facadeType) { // this is facade cost
                facadeMaterialWorkCost = myFacadeMaterials[i].Cost;
            }
            else {
                facadeMaterialWorkCost = 47;
            }
        }
        materialWoodDrawersCoefficient = 2.64;
        //materialWoodDrawersCoefficient = params.materialWoodDrawersCoefficient;

        extraCostForItem = document.getElementById("extraCostForItem").value;
    }
    //// this should be used when the active value is changed
    function buttonEvents() {
        $(document).on("click", ".isDistanced", function () {
            isDistanced = $(this).is(':checked') ? 1 : 0; // replace with true value
            console.log("change made");
        });

        numberOfDistancedInternalDrawer = height >= 70 ? 2 : 1;// if number height is less than 70 there is only one distanced drawer

        for (var i = 0; i < myFacades.length; i++) {
            if (myFacades[i].ID.toString() === params.facadeID) { // this is the handles cost
                facadesCost = myFacades[i].Cost;
            }
        }
    }

    function loadProjectID() {
        if (localStorage["storageProj_ID"] !== null) {
            //var proj_name = localStorage.getItem("storageProj_name");
            var projectID = JSON.parse(localStorage["storageProj_ID"]);
            projectID = JSON.parse(localStorage["storageProj_ID"]);
            document.getElementById("projectID").innerHTML = projectID;
            // $('#projectName').val(projectName);
            console.log(projectID);
        }
    }







}