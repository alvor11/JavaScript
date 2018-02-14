let CodeCountry = require('./CodeCountryRegion');
let CodeYear = require('./CodeYear');
let fs = require('fs'); 
// Create JSON data base for html
function dbCreate(codeCountry, codeYear) {
	arrayOut = [];
		for (let i = 0; i < codeCountry.length; i++) {
			let tmpObj = {};
			//create new object with propertis
			tmpObj["Country Code"] = codeCountry[i]["Country Code"];
			tmpObj["Country Name"] = codeCountry[i]["TableName"];
			tmpObj["Region"] = codeCountry[i]["Region"];
			tmpObj["IncomeGroup"] = codeCountry[i]["IncomeGroup"];
			tmpObj["SpecialNotes"] = codeCountry[i]["SpecialNotes"];
			// table with population have another grid, so get search property
			tmpObj["Population"] = (() => {
				for (let k = 0; k < codeYear.length; k++) {
					if(codeYear[k]["Country Code"] == codeCountry[i]["Country Code"]){
						delete codeYear[k]["Country Code"];
						return codeYear[k];
					}		
				}				
			})() ;
			// save object in array
			arrayOut[i] = tmpObj;
		}
		return arrayOut;
	}
// create JSON format
let dataBase = JSON.stringify(dbCreate(CodeCountry, CodeYear), "", 4);
// save JSON data base in file
fs.writeFileSync('dbPopulation1.json', dataBase);
