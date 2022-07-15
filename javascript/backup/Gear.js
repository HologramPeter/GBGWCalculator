var Gears=['bodyGear','rarmGear','larmGear','rlegGear'];
/**
 * gear calculation logic
 */
class Gear{
    constructor(value = null){
        this.classname = 'Gear';
        this.setGear(value);
    }

    pack(){
        return this.value;
    }

    setGear(value){
        if (value === '') value = null;
        if (value === null) this.details = null;
        else this.details = this.splitGearValue(value);
        this.value = value;
    }
      
    splitGearValue(value){
        var dict = {};
        var stat_list = value.split(' ');
        for (var item of stat_list){
            var i = item.split('#')
            dict[i[0]]=i[1].split('$');
        }
        return dict;
    }
    
    getStats(){
        var stats = {}
        for (var stat of Stats){
            stats[stat] = 0;
        }
        return stats;
    }
}

class BodyGear extends Gear{
    constructor(value){
        super(value);
        this.classname = 'BodyGear';
    }

    getRawStats(subTotalStats, gearMultiplier){
        if (this.details === null) return this.getStats();

        var stats = {};
        for (var stat of Stats){
            stats[stat] = Math.round((this.details[stat]||0)*gearMultiplier);
        }
        return stats;
    }
}

class LarmGear extends Gear{
    constructor(value){
        super(value);
        this.classname = 'LarmGear';
    }

    getRawStats(subTotalStats, gearMultiplier){
        if (this.details === null) return this.getStats();

        var stats = this.getStats();

        var s = 0;
        for (var stat of Object.keys(this.details)){
            if (!this.details[stat][0].includes('-')){
                s += subTotalStats[stat]*Math.round(parseFloat(this.details[stat][0])*gearMultiplier)/100;
            }
        }

        for (var stat of Object.keys(this.details)){
            if (this.details[stat][0].includes('-')){
                stats[stat] = Math.round(s);
            }
        }
        
        return stats;
    }
}

class RarmGear extends Gear{
    constructor(value){
        super(value);
        this.classname = 'RarmGear';
    }

    getRawStats(subTotalStats, gearMultiplier){
        if (this.details === null) return this.getStats();

        var stats = {};
        for (var stat of Stats){
            stats[stat] = Math.round((this.details[stat]||0)*gearMultiplier);
        }
        return stats;
    }
}

class RlegGear extends Gear{
    constructor(){
        super();
        this.classname = 'RlegGear';
    }

    getRawStats(subTotalAndGearStats, activeWords, gearMultiplier){
        if (this.details === null) return this.getStats();

        var word = this.details['_'][0];
        var bonus = this.details['_'][1];
        if (!activeWords.includes(word)) return this.getStats();
        
        var wordMultiplier;
        for (var item of MultiplierList){
            if (item.name === word){
                wordMultiplier = item;
                break;
            }
        }

        var stats = {};
        for (var stat of Stats){
            var mult = Math.round(wordMultiplier[stat]*parseFloat(bonus)*gearMultiplier)/100;
            var add = Math.round((this.details[stat]||0)*gearMultiplier);
            stats[stat] = Math.round(subTotalAndGearStats[stat]*mult+add);
        }

        return stats;
    }
}