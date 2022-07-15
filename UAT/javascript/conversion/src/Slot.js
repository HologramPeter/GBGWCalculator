/**
 * wrapper for a Slot
 */
class Slot{
    constructor(){
        this.mainPart = new Part();
        this.subPart = new Part();
        this.selectedWords = [0,1];
        this.description = 'mainPart';
    }

    //---------------- set methods ----get-----------------------
    //#region 
    setPart(slotType, part){
        this[slotType] = part;
    }
    
    deletePart(slotType){
        this[slotType] = new Part();
    }
    //#endregion

    //--------------- save/load methods ------------------
    //#region 
    pack(){
        return {
            'mainPart': this.mainPart.pack(),
            'subPart': this.subPart.pack(),
            'words': this.selectedWords,
            'description': this.description,
        }
    }
    //#endregion

    //--------------- Attribute methods ------------------
    //#region
    getAttributeType(slotType){
        if (slotType==='total') return this.mainPart.getAttributeType();
        return this[slotType].getAttributeType();
    }
    //#endregion

    //--------------- Word methods ------------------
    //#region 
    setWords(wordIndexes){
        if (wordIndexes.length != 2) throw 'wrong number of words';
        this.selectedWords[0] = parseInt(wordIndexes[0]);
        this.selectedWords[1] = parseInt(wordIndexes[1]);
    }

    getWord(slotType, index){
        return this[slotType].getWord(index);
    }

    getWords(slotType){
        if (slotType==='total') return this.getSelectedWords();
        return [
            this[slotType].getWord(0),
            this[slotType].getWord(1)
            ]
    }

    getSelectedWords(){
        var words = [];
        if (this.selectedWords.includes(0)){
            words.push(this.mainPart.getWord(0))
        }
        if (this.selectedWords.includes(1)){
            words.push(this.mainPart.getWord(1))
        }
        if (this.selectedWords.includes(2)){
            words.push(this.subPart.getWord(0))
        }
        if (this.selectedWords.includes(3)){
            words.push(this.subPart.getWord(1))
        }
        return words;
    }
    
    //#endregion

    //--------------- Description methods ------------------
    //#region 
    setDescription(slotType){
        this.description=slotType;
    }

    getSelectedDescription(){
        return this[this.description].getDescription();
    }
    
    getDescription(slotType){
        if (slotType === 'total') return this.getSelectedDescription();
        return this[slotType].getDescription();
    }

    getName(slotType){
        return this[slotType].getName();
    }

    getRarity(slotType){
        return this[slotType].getRarity();
    }

    getPartSubSlot(){
        return this.mainPart.getPartSubSlot();
    }
    //#endregion

    //--------------- PartType methods ------------------
    //#region
    getPartType(slotType){
        if (slotType==='total') return this.mainPart.getPartType();
        return this[slotType].getPartType();
    }

    //#endregion

    //--------------- Calculation methods ------------------
    //#region
    getRawStats(slotType){
        return this.getStats(slotType, this.mainPart, this.subPart);
    }
    
    /**
     * @returns [mainPartStats, subPartStats]
     */
     getPreviewStats(previewPart, slotType){
        if (slotType === 'mainPart'){
            return [this.getStats('mainPart', previewPart, this.subPart), this.getStats('subPart', previewPart, this.subPart)];
        }else{
            return [this.getStats('mainPart', this.mainPart, previewPart), this.getStats('subPart', this.mainPart, previewPart)];
        }
    }


    getStats(slotType, mainPart, subPart){
        var mainStats = mainPart.getRawStats();
            if (slotType==="mainPart") return mainStats;

        var subStats = subPart.getRawStats();
        var multiplier = this.getMultiplier(mainPart, subPart) * this.getSubSlotMultiplier(mainPart, subPart);
        for (var stat of Stats){
            subStats[stat] = Math.round(subStats[stat] * multiplier);
        }
            if (slotType==="subPart") return subStats;

        var stats = {};
        for (var stat of Stats){
            stats[stat] = mainStats[stat]+subStats[stat];
        }
        return stats;
    }

    getMultiplier(mainPart, subPart){
        if (mainPart.isNull() || subPart.isNull()) return 0;

        var multiplier = 0.05;

        if (mainPart.altered == 2 && subPart.altered != 2) multiplier += 0.2;
        else if (subPart.altered == 2 && mainPart.altered != 2) multiplier += 0.2;

        if (mainPart.modelName != '' & mainPart.modelName === subPart.modelName){
            multiplier+=0.3;
        }else{
            var mainPartWords = [mainPart.getWord(1),mainPart.getWord(2)];
            if ( mainPartWords.includes(subPart.getWord(1)) ) multiplier+=0.1;
            if ( mainPartWords.includes(subPart.getWord(2)) ) multiplier+=0.1;
        }

        return multiplier;
    }

    getSubSlotMultiplier(mainPart, subPart){
        if (mainPart.getPartSubSlot() != ''){
            if (subPart.getPartSubSlot() != '') return 1;
            else return 2;
        }else{
            if (subPart.getPartSubSlot() != '') return 0.5;
            else return 1;
        }

    }

    //#endregion
}