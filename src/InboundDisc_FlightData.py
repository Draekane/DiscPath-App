import json
import urllib.request, urllib.parse
import requests
import re
import hashlib
import pathlib
from bs4 import BeautifulSoup as soup
my_url = 'http://www.inboundsdiscgolf.com/content/?page_id=431'

uClient = urllib.request.urlopen(my_url)
page_html = uClient.read()
uClient.close()
#
# HTML Parsing
#
page_soup = soup(page_html, "html.parser")
# Grab each product
discTable = page_soup.find_all("input", {"type": "hidden"})
# Now, cycle through all of these, and search the page for each of these
# Separated out by specific plastic
# out_handle.write('Company,Name,Type,Range,HST,LSF,PDGA Approved,Matrix\n')
print("Company,Name,Type,Range,HST,LSF,PDGA Approved,Matrix")

disc_companies = set([disc["value"].split("|")[0] for disc in discTable])

for company in disc_companies:
	if company.strip() != "" and company.strip() != "Plackard1" and company.strip() != "Plackard2" and company.strip() != "Plackard3" and company.strip() != "Plackard4" and company.strip() != "sortabletable":
	
		
		company_discs = [disc for disc in discTable if disc["value"].split("|")[0] == company]
		linkregex = re.compile('http').search
		link_check = [link for disc in company_discs for link in (linkregex(disc["value"]),) if link]
		if len(company_discs) > 0 and len(link_check) < 1:
			print("Company: " + company.strip())
			print("Disc Count:" + str(len(company_discs)))
			print("------------------------------------------------------------------------------------------------")
			shortenedName = company.strip().replace(" ","")
			currentCompany = { "company": company.strip(), "companyId": str(hashlib.md5(str.encode(shortenedName)).hexdigest()), "discs": [] }
			pathlib.Path('./src/data/Discs').mkdir(parents=True, exist_ok=True)
			
			disc_count = 0
			for disc in company_discs:
				disc_count += 1
				disc_data_arr = disc["value"].split("|")
				currentDisc = {}	
				if len(disc_data_arr) >= 2:
					currentDisc["discId"] = str(hashlib.md5(str.encode(disc_data_arr[1])).hexdigest())
					currentDisc["name"] = disc_data_arr[1]
				if len(disc_data_arr) >= 3:
					currentDisc["type"] = disc_data_arr[2][:1]
				if len(disc_data_arr) >= 4:
					currentDisc["range"] = int(disc_data_arr[3])
				if len(disc_data_arr) >= 5:
					currentDisc["hst"] = int(disc_data_arr[4].replace("%",""))
				if len(disc_data_arr) >= 6:
					currentDisc["lsf"] = int(disc_data_arr[5].replace("%",""))
				if len(disc_data_arr) >= 8:
					currentDisc["pdga"] = disc_data_arr[7]
				if len(disc_data_arr) >= 10:
					matrixSplit = disc_data_arr[9].split("-")
					currentDisc["matrix_x"] = int(matrixSplit[1])
					currentDisc["matrix_y"] = int(matrixSplit[0])
					currentCompany["discs"].append(currentDisc)
			filename = "./src/data/Discs/" + shortenedName + "_collection.json"
			out_handle = open(filename,'w')
			out_handle.write(json.dumps(currentCompany, indent=4))
			out_handle.close()
