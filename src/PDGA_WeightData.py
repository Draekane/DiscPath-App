import xlrd
import json
import math
import pathlib
import hashlib
import companyNameConsts
import re

workbook = xlrd.open_workbook('./pdga_approved_discs_121618a.xls')
worksheet = workbook.sheet_by_index(0)
rows = worksheet.nrows
cols = worksheet.ncols
removeParens = re.compile(r'\(.*\)')

columnsToRead = [1,2]
companyName = ""
currentCompany = ""

for rowIndex in range(5, rows-2):
# for rowIndex in range(4, 20):
	if (rowIndex == 5): 
		shortenedCompanyName = worksheet.cell_value(rowIndex, 0).strip().replace("/","_").replace(" ","")
		if (shortenedCompanyName in companyNameConsts.companyDict):
			shortenedCompanyName = companyNameConsts.companyDict[shortenedCompanyName]
		newfile = companyName != shortenedCompanyName
	if (newfile):
		companyName = shortenedCompanyName
		pathlib.Path('./src/data/Weights').mkdir(parents=True, exist_ok=True)
		filename = "./src/data/Weights/" + companyName.strip().replace("/","_").replace(" ","") + "_collection.json"
	if (currentCompany == ""):
		 currentCompany = { "company": worksheet.cell_value(rowIndex, 0), "companyId": str(hashlib.md5(str.encode(companyName)).hexdigest()), "discs": [] }

	# out_handle.write("{\n\t\"company\": \"" + worksheet.cell_value(rowIndex, 0) + "\",\n\t\"companyId\": \"" + str(hashlib.md5(str.encode(companyName)).hexdigest()) +"\",\n\t\"discs\": [\n")
	# out_handle.write("\t\t{\n")
	discName = removeParens.sub('',worksheet.cell_value(rowIndex, 1)).strip()
	discWeight = worksheet.cell_value(rowIndex, 2)
	# out_handle.write("\t\t\t\"discId\": \"" + str(hashlib.md5(str.encode(discName)).hexdigest()) + "\",\n")
	# out_handle.write("\t\t\t\"name\": \"" + discName + "\",\n")
	# out_handle.write("\t\t\t\"maxWeight\": \"" + str(round(discWeight)) + "\"\n")
	
	currentDisc = {
		"discId": str(hashlib.md5(str.encode(discName)).hexdigest()),
		"name": discName,
		"maxWeight": str(round(discWeight))
	}

	currentCompany["discs"].append(currentDisc)

	if (rowIndex < (rows-2)):
		shortenedCompanyName = worksheet.cell_value(rowIndex+1, 0).strip().replace("/","_").replace(" ","")
		if (shortenedCompanyName in companyNameConsts.companyDict):
			shortenedCompanyName = companyNameConsts.companyDict[shortenedCompanyName]
		newfile = companyName != shortenedCompanyName
	
	if(newfile):
		out_handle = open(filename,'w')
		out_handle.write(json.dumps(currentCompany, indent=4))
		out_handle.close()
		currentCompany = ""