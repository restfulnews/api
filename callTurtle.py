import requests


url = "http://seng3011-turtle.ap-southeast-2.elasticbeanstalk.com/newsapi/v2.0/query?"
startDate = "2017-08-24T09:45:31.233Z"
endDate = "2017-09-24T09:45:31.233Z"
companyID = "ANZ_Woolworths"
topic = "projected-profit_share-price-prediction"

response = requests.get(url+"startDate="+startDate+"&endDate="+endDate+"&companyId="+companyID+"&topic="+topic)
