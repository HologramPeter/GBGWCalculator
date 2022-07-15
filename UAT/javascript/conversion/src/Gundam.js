var PreGears=['bodyGear','rarmGear','larmGear'];
var PostGears=['rlegGear'];


class Gundam{
    constructor(){
        this.classname = 'Gundam';

        this.head = new Slot();
        this.body = new Slot();
        this.arms = new Slot();
        this.legs = new Slot();
        this.back = new Slot();
        this.sword = new Slot();
        this.gun = new Slot();
        this.shield = new Slot();
        this.pilot = new Slot();

        this.bodyGear = new BodyGear();
        this.larmGear = new LarmGear();
        this.rarmGear = new RarmGear();
        this.rlegGear = new RlegGear();

        this.gearBonus = 0.15;
    }
    

    //--------------- part methods ------------------
    //#region 

    setPart(part, slotType){
        if (part.isNull()) return;
        var slot = part.getPartSlot(); 
        if (!this[slot] instanceof Slot) throw 'slot occupied';
        this[slot].setPart(slotType, part);

        if (slotType === 'mainPart'){
            //replace subslot
            var subSlot = part.getPartSubSlot();
            if (subSlot) this[subslot] = slot; //referencing slot
        }
    }

    deletePart(slot, slotType){
        if (slotType === "mainPart"){
            //restore subslot
            var subSlot = this[slot].getPartSubSlot();
            if (subSlot) this[subslot] = new Slot();
        }
        this[slot].deletePart(slotType);
    }
    //#endregion


    
    //--------------- save/load methods ------------------
    //#region
    serialize(){
        return JSON.stringify(this.pack());
    }

    unserialize(str){
        // try {
            var gundamObj = JSON.parse(str);
            this.unpack(gundamObj);
        // } catch (error) {
        //     console.trace();
        //     alert('error in unpacking');
        // }
    }

    pack(){
        var gundamObj={};
        for (var slot of Parts){
            if (!this[slot] instanceof Slot) gundamObj[slot] = null;
            else gundamObj[slot] = this[slot].pack();
        }
        for (var slot of Gears){
            gundamObj[slot] = this[slot].pack();
        }

        gundamObj['gearBonus'] = this.gearBonus;

        return gundamObj;
    }

    unpack(gundamObj){
        for (var slot of Parts){
            for (var slotType of ['mainPart', 'subPart']){
                if (gundamObj[slot] != null){
                    var part_data = null;
                    if (gundamObj[slot][slotType] != null){
                        part_data = Database[gundamObj[slot][slotType]];
                    }
                    this.setPart(new Part(part_data,false), slotType);
                }
            }
            this.setWords(slot, gundamObj[slot]['words']);
            this.setDescription(slot, gundamObj[slot]['description']);
        }

        for (var slot of Gears){
            this.setGear(slot, gundamObj[slot]);
        }

        this.gearBonus = gundamObj['gearBonus'];
    }
    //#endregion

    //--------------- Attribute methods ------------------
    //#region
    getAttributeType(slot, slotType){
        return this[slot].getAttributeType(slotType);
    }

    getAttributeTypes(){
        var attributes = {}
        for (var slot of Parts){
            if (!this[slot] instanceof Slot) slot = this[slot];
            var attribute = this[slot].getAttributeType('total');
            attributes[attribute] = (attributes[attribute]||0) + 1;
        }
        return attributes;
    }

    getActiveAttributeType(){
        var attributes = this.getAttributeTypes();
        var activeAttributes = Object.keys(attributeTypes).reduce(function (activeAttributes, key) {
            if (attributes[key] >= 5 && key != "") activeAttributes[key] = attributes[key];
            return activeAttributes;
        }, {});
        return Object.keys(activeAttributes)[0]; 
    }

    //#endregion


    //--------------- Word methods ------------------
    //#region 
    
    setWords(slot, wordIndexes){
        this[slot].setWords(wordIndexes);
    }

    getWords(slot, slotType){
        return this[slot].getWords(slotType);
    }

    getActiveWords(){
        var words = {}
        for (var slot of Parts){
            if (!this[slot] instanceof Slot) slot = this[this[slot]];
            for (var word of this.getWords(slot, 'total')){
                words[word] = (words[word]||0) + 1;
            }
        }

        var activeWords = Object.keys(words).reduce(function (activeWords, key) {
            if (words[key] >= 5 && key != '' && key != 'null') activeWords[key] = words[key];
            return activeWords;
          }, {});

        return Object.keys(activeWords);
    }

    //#endregion

    //--------------- Description methods ------------------
    //#region 
    setDescription(slot, slotType){
        this[slot].setDescription(slotType);
    }
    getDescription(slot, slotType){
        return this[slot].getDescription(slotType);
    }

    getJobType(){
        return this['pilot'].getPartType('total');
    }
    
    getName(slot, slotType){
        return this[slot].getName(slotType);
    }

    getRarity(slot, slotType){
        return this[slot].getRarity(slotType);
    }
    //#endregion

    //--------------- PartType methods ------------------
    //#region
    getPartType(slot, slotType){
        return this[slot].getPartType(slotType);
    }
    //#endregion

    //--------------- Calculation methods ------------------
    //#region
    getPartRawStats(slot, slotType){
        return this[slot].getRawStats(slotType);
    }

    getGearRawStats(slot){
        if (PreGears.includes(slot))
            return this[slot].getRawStats(this.getPreSubTotalStats(),this.getGearMultiplier());
        else
            return this[slot].getRawStats(this.getSubTotalStats(), this.getActiveWords(), this.getGearMultiplier());
    }

    getPreviewStats(previewPart, slotType){
        var slot = previewPart.getPartSlot();
        return this[slot].getPreviewStats(previewPart, slotType);
    }

    getPreSubTotalStats(){
        var stats = {}
        
        for (var slot of Parts){
            var part_stats = this.getPartRawStats(slot, 'total');
            for (var stat of Stats){
                stats[stat] = (stats[stat]||0)+part_stats[stat];
            }
        }
        return stats;
    }

    getSubTotalStats(){
        var preSubTotalStats = this.getPreSubTotalStats();
        var preGearStats = this.getTotalPreGearStats(preSubTotalStats);

        var stats = {};
        for (var stat of Stats){
            stats[stat] = preSubTotalStats[stat] + preGearStats[stat];
        }
        return stats;
    }


    getTotalStats(){
        var subTotalStats = this.getSubTotalStats();
        //post gear
        var postGearStats = this.getTotalPostGearStats(subTotalStats);

        //word
        var wordMultiplier = this.getWordsMultiplier();
        var jobMultiplier = this.getJobMultiplier();
        var stats = {};
        for (var stat of Stats){
            var stat_t = Math.round(subTotalStats[stat]*(wordMultiplier[stat]||1)+postGearStats[stat])
            stats[stat] = Math.round(stat_t*(jobMultiplier[stat]||1));
        }

        return stats;
    }

    getPreGearStats(slot,preSubTotalStats){
        return this[slot].getRawStats(preSubTotalStats, this.getGearMultiplier());
    }

    getPostGearStats(slot,subtotalStats){
        var activeWords = this.getActiveWords();
        return this[slot].getRawStats(subtotalStats,activeWords, this.getGearMultiplier());
    }

    getTotalPreGearStats(subtotalStats){
        var stats = {};
        for (var slot of PreGears){
            var gearStats = this.getPreGearStats(slot,subtotalStats);
            for (var stat of Stats){
                stats[stat] = (stats[stat]||0)+gearStats[stat];
            }
        }
        return stats;
    }

    getTotalPostGearStats(subtotalStats){
        var stats = {};
        for (var slot of PostGears){
            var gearStats = this.getPostGearStats(slot,subtotalStats);
            for (var stat of Stats){
                stats[stat] = (stats[stat]||0)+gearStats[stat];
            }
        }
        return stats;
    }

    getWordsMultiplier(){
        var activeWords = this.getActiveWords();
        var multiplier = {};
        for(var item of MultiplierList){
            if (activeWords.includes(item.name)){
                for(var stat of Stats) multiplier[stat] = (multiplier[stat]||1)+parseFloat(item[stat]);
            }
        }
        return multiplier;
    }

    getJobMultiplier(){
        var job = JobName[this.getJobType()];
        var multiplier = {};
        for(var item of MultiplierList){
            if(job === item.name){
                for(var stat of Stats) multiplier[stat] = 1+parseFloat(item[stat]);
                break;
            }
        }
        return multiplier;
    }
    //#endregion
    
    //--------------- gear methods ------------------
    //#region 
    setGear(slot, gearValues){
        this[slot].setGear(gearValues);
    }

    deleteGear(slot){
        this[slot].setGear();
    }

    setGearBonus(gearBonus){
        this.gearBonus = gearBonus;
    }

    getGearMultiplier(){
        return 1 + this.gearBonus;
    }
    //#endregion

}