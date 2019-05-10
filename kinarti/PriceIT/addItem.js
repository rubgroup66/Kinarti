function addItem() {
    Item = {
        ProjectID: 9,
        Type: 1, // 'type' will be always 1 untill we add a different kind of box
        Cost: $("#cost").val(),
       
        Shelves: $("#shelves").val(),
        IsDistanced: $("#isDistanced").is(':checked') ? 1 : 0,
        BoxWoodDrawers: $("#boxWoodDrawers").val(), 
        InternalLegraBoxDrawers: $("#internalLegraBoxDrawers").val(),
        ExternalLegraBoxDrawers: $("#externalLegraBoxDrawers").val(),
        InternalScalaBoxDrawers: $("#internalScalaBoxDrawers").val(),
        ExternalScalaBoxDrawers: $("#externalScalaBoxDrawers").val(),

        FacadeMaterialTypeID: $("#facadeMaterialType").val(),// need to get the value

        FacadeID: $("#facade").val(),// need to get the value

        HingesQuantity1: $("#hingesQuantity1").val(),
        HingesType1ID: $("#hingesType1").val(),// need to get the value

        HingesQuantity2: $("#hingesQuantity2").val(),
        HingesType2ID: $("#hingesType1").val(),// need to get the value

        ExtraWallQuantity: $("#extraWallQuantity").val(),
        ExtraWallTypeID: $("#extraWallType").val(),// need to get the value

        HandlesQuantity: $("#handlesQuantity").val(),
        HandlesTypeID$: ("#handlesType").val(),// need to get the value

        IronWorksQuantity1: $("#ironWorksQuantity1").val(),
        IronWorksType1ID: $("#ironWorksType1").val(),// need to get the value

        IronWorksQuantity2: $("#ironWorksQuantity2").val(),
        IronWorksType2ID: $("#ironWorksType2").val(),// need to get the value

        ExtraCostForItem: $("#extraCostForItem").val()

    }

    ajaxCall("POST", "../api/item", JSON.stringify(Item), success, error);
}
