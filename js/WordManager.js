"use strict";
var WordManager = {
        words: ["nitrocellulose","naraka","bumming","zod","dinwiddie","nixes","overmeek","underdrainage","suspensibility","excrementous","remarriage","surname","superabnormal","nuclide","presanctification","phlegethontic","hartsville","unchannelled","vainglory","plash","serumal","trumpless","staminodia","grapy","stadholdership","genii","rekindle","sourish","footlocker","enshrinement","equalise","lowish","bishop","thrips","declassify","prehatred","undercourtier","humblebee","sharen","blackfigured","yucatec","proagrarian","intransigeance","inalienable","yearner","precuring","nonsoluble","palaeocene","unremonstrating","broodier"],
    generateWords: function() {
        var result = [];
        var i, count = 5;
        for(i; i < count; i++)
            result.push(WordManager.words[Math.floor(Math.random() * (max - min + 1) + min) ]);
        return result;
    }
};