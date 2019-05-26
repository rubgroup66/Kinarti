﻿var myBoxes;
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


function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}


$(document).ready(function () {

    var itemID = getParameterByName("itemId");
    var projectID = getParameterByName("projectId");
    console.log(itemID);
    console.log(projectID);

    if (itemID && projectID) {
        uri = "../api/items/?item=" + itemID + "&project=" + projectID; //get the specific item from DB
        ajaxCall("GET", uri, "", successGetItem, error);
    }

    //ajaxCall("GET", "../api/item", "", successGetItem, error);

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

function successGetItems(itemsdata) {// this function is activated in case of a success
        myItems = itemsdata;    
    for (var i = 0; i < myItems.length; i++) {
        $('#addExistingItem').append('<option value="' + itemsdata[i].ID + '" >' + itemsdata[i].Name + '</option>');
    }
    console.log("myItems" + " " + myItems);
}

//function successGetItem(itemdata) {// this function is activated in case of a success
//    myItems = itemsdata;

//    console.log(itemdata);
//}

function successGetMaterials(materialsdata) {// this function is activated in case of a success
    myMaterials = materialsdata;  
    for (var i = 0; i < materialsdata.length; i++) {
        $('#boxMaterial').append('<option value="' + materialsdata[i].ID + '" >' + materialsdata[i].Name + '</option>');
    }
    console.log("myMaterials" + " " + myMaterials);
}

function successGetFacades(facadesdata) {// this function is activated in case of a success
    console.log("facadesdata" + " " + facadesdata);
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
    myHandles = handlesdata;
    for (var i = 0; i < handlesdata.length; i++) {
        $('#handlesType').append('<option value="' + handlesdata[i].ID + '" >' + handlesdata[i].Type + '</option>');
    }
}
function successGetHinges(hingesdata) {// this function is activated in case of a success
    myHinges = hingesdata;
    for (var i = 0; i < hingesdata.length; i++) {
        $('#hingesType1').append('<option value="' + hingesdata[i].ID + '" >' + hingesdata[i].Type + '</option>');
        $('#hingesType2').append('<option value="' + hingesdata[i].ID + '" >' + hingesdata[i].Type + '</option>');
    }
}

function successGetIronWorks(ironworksdata) {// this function is activated in case of a success
    myIronWorks = ironworksdata;
    for (var i = 0; i < ironworksdata.length; i++) {
        $('#ironWorksType1').append('<option value="' + ironworksdata[i].ID + '" >' + ironworksdata[i].Type + '</option>');
        $('#ironWorksType2').append('<option value="' + ironworksdata[i].ID + '" >' + ironworksdata[i].Type + '</option>');
    }
}

function successGetFacadeMaterials(facadeMaterialsdata) {// this function is activated in case of a success
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
    return false; // the return false will prevent the form from being submitted, hence the page will not reload
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

function returnToProject() {
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
    
    return false; // the return false will prevent the form from being submitted, hence the page will not reload
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

    $(document).on("click", ".deleteBtn", function () {
        mode = "delete";
        markSelected(this);
        var itemId = this.getAttribute('data-itemId');
        swal({ // this will open a dialouge 
            title: "Are you sure ??",
            text: "",
            icon: "warning",
            buttons: true,
            dangerMode: true
        })
            .then(function (willDelete) {
                if (willDelete) DeleteItem(itemId);
                else swal("Not Deleted!");
            });
    });




    var totalCost;
    function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    function error(err) { // this function is activated in case of a failure
        swal("Error: " + err);
    }
    function successGetItems(itemsdata) {// this function is activated in case of a success            
        //for (var i = 0; i < myItems.length; i++) {
        //    $('#addExistingItem').append('<option value="' + itemsdata[i].ID + '" >' + itemsdata[i].Name + '</option>');
        //}
        for (var i = 0; i < itemsdata.length; i++) {
            // $('#accordion').append('<option value="' + itemsdata[i].ID + '" >' + itemsdata[i].Name + '</option>');
            $('#accordion').append('<div class="panel panel-default"><div class="panel-heading"><h4 class="panel-title"><a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion" href="#collapse' + (i + 1) + '">פריט ' + (i + 1) + ': ' + itemsdata[i].Name + ', עלות: ' +
                itemsdata[i].Cost + '   <button type="button" id=' + itemsdata[i].ID + ' onClick="goEditItem()" class = "editBtn btn btn-success editItem"> עריכה </button>' + '<button type="button" class = "deleteBtn btn btn-danger deleteItem"> מחיקה </button></a ></h4 ></div > <div id="collapse' + (i + 1) + '" class="panel-collapse collapse"><div class="panel-body">מחיצות:' + itemsdata[i].Partitions + '</div></div></div > ');

            console.log(itemsdata[i].Cost);
            totalCost = totalCost + itemsdata[i].Cost;
        }
        //"<button type='button' id=btn" + itemsdata.ID + " class = 'EditProjBtn btn btn-success'> עריכת פריט </button>";
        $("#cost").val(totalCost);
        console.log(totalCost);
        console.log(itemsdata);
    }

    function ShowInfo() {
        $("#info").show();

    }

    function error(err) { // this function is activated in case of a failure
        swal("Error: " + err);
    }


    //לשלוף שם פרויקט
    var proj_name = localStorage.getItem("storageProj_name");
    function getName() {
        document.getElementById("project_name").innerHTML = proj_name;
    }
    //שמור שם ארגזת
    function createBox() {
        var box_name = $("#box_name").val()
        localStorage.setItem("storageBox_name", box_name);
        parent.location = 'insertItem.html';
    }

    function goEditItem() {
        location.href = "insertItem.html";
    }



    ///////////////////////////////////////////////////////////
    var projectID;
    $(document).ready(function () {
        mode = "";

        $("#cancelSaveBTN").on("click", function () {
            item = null;
            $("#editDiv").hide();
            if (mode === "new") $("#pForm").show();
            mode = "";
        });

        $("#newBTN").on("click", function () {
            item = null;
            mode = "new";
            $("#pForm").hide();
            $("#editDiv").show();
            clearFields();
            $("#editDiv :input").prop("disabled", false); // new mode: enable all controls in the form
        });

        projectID = getParameterByName("projectId");
        console.log(projectID);
        //get all relevant items from DB  
        uri = "../api/items/?projectID=" + projectID;
        ajaxCall("GET", uri, "", successGetItems, error);
    });

    $(document).on("click", ".editItem", function (event) {
        window.location.href = 'editItem.html?projectId=' + projectID + "&itemId=" + event.target.id;


        $("#itemForm").submit(onSubmitFunc); // wire the submit event to a function called f1

        $("#editDiv").hide();
    });

    // wire all the buttons to their functions
    function buttonEvents() {

        $(document).on("click", ".editBtn", function () {
            mode = "edit";
            markSelected(this);
            $("#editDiv").show();
            $("#editDiv :input").prop("disabled", false); // edit mode: enable all controls in the form
            populateFields(this.getAttribute('data-itemId')); // fill the form fields according to the selected row
        });

        $(document).on("click", ".viewBtn", function () {
            mode = "view";
            markSelected(this);
            $("#editDiv").show();
            row.className = 'selected';
            $("#editDiv :input").attr("disabled", "disabled"); // view mode: disable all controls in the form
            populateFields(this.getAttribute('data-itemId'));
        });

        $(document).on("click", ".deleteBtn", function () {
            mode = "delete";
            markSelected(this);
            var itemId = this.getAttribute('data-itemId');
            swal({ // this will open a dialouge 
                title: "Are you sure ??",
                text: "",
                icon: "warning",
                buttons: true,
                dangerMode: true
            })
                .then(function (willDelete) {
                    if (willDelete) DeleteItem(itemId);
                    else swal("Not Deleted!");
                });
        });
    }

    // mark the selected row
    function markSelected(btn) {
        $("#itemsTable tr").removeClass("selected"); // remove seleced class from rows that were selected before
        row = (btn.parentNode).parentNode; // button is in TD which is in Row
        row.className = 'selected'; // mark as selected
    }

    // Delete a car from the server
    function DeleteItem(id) {
        ajaxCall("DELETE", "../api/items/" + id, "", deleteSuccess, error);
    }

    function onSubmitFunc() {
        var Id = -1;
        //var Image = "car.jpg";
        if (mode === "edit") {
            Id = item.Id;
            //Image = car.Image;
        }

        let itemtoSave = {
            Id: Id,
            Image: Image, // for now we do not change the image
            Manufacturer: $("#manufacturer").val(),
            Model: $("#model").val(),
            Year: $("#year").val(),
            Price: $("#price").val(),
            Description: $("#description").val(),
            Automatic: $("#automatic").is(":checked")
        }

        // add a new Car record to the server
        if (mode === "edit")
            ajaxCall("PUT", "../api/items", JSON.stringify(itemtoSave), updateSuccess, error);
        else if (mode == "new")
            ajaxCall("POST", "../api/items", JSON.stringify(itemtoSave), insertSuccess, error);
        return false;
    }

    // fill the form fields
    function populateFields(itemId) {
        item = getItem(itemId);
        $("#manufacturer").val(item.Manufacturer);
        $("#model").val(item.Model);
        $("#year").val(item.Year);
        $("#price").val(item.Price);
        $("#color").val(item.Color);
        $("#hand").val(item.Hand);
        $("#description").val(item.Description);
        $("#automatic").prop('checked', item.Automatic);
        //$("#image").attr("src", "images/" + item.Image);
    }


    // fill the form fields
    function clearFields() {
        $("#manufacturer").val("");
        $("#model").val("");
        $("#year").val("");
        $("#price").val("");
        $("#color").val("");
        $("#hand").val("");
        $("#description").val("");
        $("#automatic").prop('checked', true);
      //  $("#image").attr("src", "images/item.jpg");
    }

    // get a car according to its Id
    function getItem(id) {
        for (i in items) {
            if (items[i].Id === id)
                return items[i];
        }
        return null;
    }

    // success callback function after update
    function updateSuccess(itemsdata) {
        tbl.clear();
        redrawTable(tbl, itemsdata);
        buttonEvents();
        $("#editDiv").hide();
        swal("Updated Successfuly!", "Great Job", "success");
        mode = "";
    }

    // success callback function after update
    function insertSuccess(itemsdata) {
        $("#pForm").show();
        tbl.clear();
        redrawTable(tbl, itemsdata);
        buttonEvents();
        $("#editDiv").hide();
        swal("Inserted Successfuly!", "Great Job", "success");
        mode = "";
    }

    // success callback function after delete
    function deleteSuccess(itemsdata) {
        tbl.clear();
        redrawTable(tbl, itemsdata);
        buttonEvents(); // after redrawing the table, we must wire the new buttons
        $("#editDiv").hide();
        swal("Deleted Successfuly!", "Great Job", "success");
        mode = "";
    }

    // redraw a datatable with new data
    function redrawTable(tbl, data) {
        tbl.clear();
        for (var i = 0; i < data.length; i++) {
            tbl.row.add(data[i]);
        }
        tbl.draw();
    }

    // this function is activated in case of a success
    function getSuccess(itemsdata) {

        console.log(itemsdata[i].Cost);
        totalCost = totalCost + itemsdata[i].Cost;
        items = itemsdata; // keep the cars array in a global variable;
        try {
            tbl = $('#itemstable').DataTable({
                data: itemsdata,
                pageLength: 5,
                columns: [
                    {
                        render: function (data, type, row, meta) {
                            let dataItem = "data-itemId='" + row.Id + "'";
                            editBtn = "<button type='button' class = 'editBtn btn btn-success' " + itemsdata + "> עריכה </button>";
                            viewBtn = "<button type='button' class = 'viewBtn btn btn-info' " + itemsdata + "> צפייה </button>";
                            deleteBtn = "<button type='button' class = 'deleteBtn btn btn-danger' " + itemsdata + "> מחיקה </button>";
                            return editBtn + viewBtn + deleteBtn;
                        }
                    },
                    { data: "Id" },
                    { data: "Name" },
                    { data: "Description" },
                    { data: "Price" }
                ],
            });
            buttonEvents();
        }
        catch (err) {
            alert(err);
        }
    }
    // this function is activated in case of a failure
    function error(err) {
        swal("Error: " + err);
    }
}