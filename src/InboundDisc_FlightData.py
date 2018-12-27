import bs4
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
	if company.strip() != "":
		company_discs = [disc for disc in discTable if disc["value"].split("|")[0] == company]
		linkregex = re.compile('http').search
		link_check = [link for disc in company_discs for link in (linkregex(disc["value"]),) if link]
		if len(company_discs) > 0 and len(link_check) < 1:
			print("Company: " + company.strip())
			print("Disc Count:" + str(len(company_discs)))
			print("------------------------------------------------------------------------------------------------")
			pathlib.Path('./src/data/Discs').mkdir(parents=True, exist_ok=True)
			shortenedName = company.strip().replace(" ","")
			filename = "./src/data/Discs/" + shortenedName + "_collection.json"
			out_handle = open(filename,'w')
			# print("{")
			# print("    \"company\": \"" + company + "\",")
			# print("    \"companyId\": ,")
			# print("    \"discs\": [")
			out_handle.write("{\n\t\"company\": \"" + company + "\",\n\t\"companyId\": \"" + str(hashlib.md5(str.encode(shortenedName)).hexdigest()) +"\",\n\t\"discs\": [\n")
			disc_count = 0
			for disc in company_discs:
				disc_count += 1
				disc_data_arr = disc["value"].split("|")
				if disc_count == 1:
					# print("    {")
					out_handle.write("\t\t{\n")
				if disc_count > 1:
					# print("    } , {")
					out_handle.write("\t\t} , {\n")
				if len(disc_data_arr) >= 2:
					# print("        \"discId\": " + str(disc_count) + ",")
					out_handle.write("\t\t\t\"discId\": \"" + str(hashlib.md5(str.encode(disc_data_arr[1])).hexdigest()) + "\",\n")
					# print("        \"name\": \"" + disc_data_arr[1] + "\",")
					out_handle.write("\t\t\t\"name\": \"" + disc_data_arr[1] + "\",\n")
				if len(disc_data_arr) >= 3:
					# print("        \"type\": \"" + disc_data_arr[2][:1] + "\",")
					out_handle.write("\t\t\t\"type\": \"" + disc_data_arr[2][:1] + "\",\n")
				if len(disc_data_arr) >= 4:
					# print("        \"range\": " + disc_data_arr[3] + ",")
					out_handle.write("\t\t\t\"range\": " + disc_data_arr[3] + ",\n")
				if len(disc_data_arr) >= 5:
					# print("        \"hst\": " + disc_data_arr[4].replace("%","") + ",")
					out_handle.write("\t\t\t\"hst\": " + disc_data_arr[4].replace("%","") + ",\n")
				if len(disc_data_arr) >= 6:
					# print("        \"lsf\": " + disc_data_arr[5].replace("%","") + ",")
					out_handle.write("\t\t\t\"lsf\": " + disc_data_arr[5].replace("%","") + ",\n")
				if len(disc_data_arr) >= 8:
					# print("        \"pdga\": \"" + disc_data_arr[7] + "\",")
					out_handle.write("\t\t\t\"pdga\": \"" + disc_data_arr[7] + "\",\n")
				if len(disc_data_arr) >= 10:
					# print("        \"matrix\": \"" + disc_data_arr[9] + ",")
					# print("        \"matrix_x\": \"" + disc_data_arr[9].split("-")[1] + ",")
					# print("        \"matrix_y\": \"" + disc_data_arr[9].split("-")[0] + ",")
					out_handle.write("\t\t\t\"matrix_x\": " + disc_data_arr[9].split("-")[1] + ",\n\t\t\t\"matrix_y\": " + disc_data_arr[9].split("-")[1] + "\n")
			# print("    }]")
			# print("}")
			out_handle.write("\t}]\n}\n")
			out_handle.close()
