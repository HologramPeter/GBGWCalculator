var Stats=['arm','mel','sht','mdf','sdf','bmr','phr'];
/**
 * wrapper for a part in form of an array
 */
class Part{
    constructor(partInfo=null, parse = true){
        this.classname = 'Part';
        if (parse) this.partInfo = JSON.parse(partInfo);
        else this.partInfo = partInfo;
    }

    //--------------- save/load methods ------------------
    //#region
    pack(){
        if (this.isNull()) return null;
        return this.partInfo['id'];
    }
    //#endregion

    //--------------- Attribute methods ------------------
    //#region 
    getAttributeType(){
        if (this.isNull()) return null;
        return this.partInfo['attribute'];
    }
    //#endregion

    //--------------- Word methods ------------------
    //#region 
    
    getWord(index){
        if (this.isNull()) return null;
        if (parseInt(index) === 1) return this.partInfo['word1'];
        else return this.partInfo['word2'];
    }

    //#endregion

    //--------------- Description methods ------------------
    //#region 
    getDescription(){
        if (this.isNull()) return null;
        return this.partInfo['description1'] + "\n" + this.partInfo['description2'];
    }

    getName(){
        if (this.isNull()) return null;
        return this.partInfo['name'];
    }

    getRarity(){
        if (this.isNull()) return null;
        return this.partInfo['rarity'];
    }

    //#endregion

    //--------------- PartType methods ------------------
    //#region 
    getPartType(){
        if (this.isNull()) return null;
        return this.partInfo['subType'];
    }
    //#endregion

    //--------------- Calculation methods ------------------
    //#region
    getStats(){
        var stats = {};
        for (var stat of Stats){
            stats[stat] = 0;
        }
        return stats;
    }

    getRawStats(){
        if (this.isNull()) return this.getStats();
        var stats = {};
        for (var stat of Stats){
            stats[stat] = parseInt(this.partInfo[stat]);
        }
        return stats;
    }


    getAltered(){
        if (this.isNull()) return 0;
        return this.partInfo['altered'];
    }

    getModel(){
        if (this.isNull()) return null;
        return this.partInfo['model'];
    }
    //#endregion
    
    
    //---------------- Part Slot methods ---------------------------
    //#region 
    getPartSlot(){
        if (this.isNull()) return null;
        return typeList[this.partInfo['slot']];
    }

    getPartSubSlot(){
        if (this.isNull()) return null;
        return this.partInfo['subSlot'];
    }
    //#endregion
    
    isNull(){
        return this.partInfo === null;
    }
}
