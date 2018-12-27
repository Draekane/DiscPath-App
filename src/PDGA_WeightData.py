import xlrd
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
		out_handle = open(filename,'w')
		out_handle.write("{\n\t\"company\": \"" + worksheet.cell_value(rowIndex, 0) + "\",\n\t\"companyId\": \"" + str(hashlib.md5(str.encode(companyName)).hexdigest()) +"\",\n\t\"discs\": [\n")
	out_handle.write("\t\t{\n")
	discName = removeParens.sub('',worksheet.cell_value(rowIndex, 1)).strip()
	discWeight = worksheet.cell_value(rowIndex, 2)
	out_handle.write("\t\t\t\"discId\": \"" + str(hashlib.md5(str.encode(discName)).hexdigest()) + "\",\n")
	out_handle.write("\t\t\t\"name\": \"" + discName + "\",\n")
	out_handle.write("\t\t\t\"maxWeight\": \"" + str(round(discWeight)) + "\"\n")
	
	if (rowIndex < (rows-2)):
		shortenedCompanyName = worksheet.cell_value(rowIndex+1, 0).strip().replace("/","_").replace(" ","")
		if (shortenedCompanyName in companyNameConsts.companyDict):
			shortenedCompanyName = companyNameConsts.companyDict[shortenedCompanyName]
		newfile = companyName != shortenedCompanyName
	
	if(newfile):
		out_handle.write("\t\t}\n\t]\n}\n")
	else:
		out_handle.write("\t\t},\n")
			
	# for colIndex in range(len(columnsToRead)):
		# cellValue = worksheet.cell_value(rowIndex, columnsToRead[colIndex])
		# if(type(cellValue) is float):
			# rowVal += str(round(cellValue))
		# else:
			# rowVal += cellValue
		# if (colIndex < len(columnsToRead)): 
			# rowVal += ", "
