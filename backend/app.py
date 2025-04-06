from flask import Flask, jsonify, request
from flask_cors import CORS
import requests
from requests import session
from bs4 import BeautifulSoup
from selenium import webdriver
import openai
from openai import OpenAI
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import json
import uuid
from scrapfly import ScrapflyClient, ScrapeConfig, ScrapeApiResponse
import logging
import asyncio
import httpx
from google import genai
from google.genai import types
import time
import http.client as httplib
from ./keys.gitignore import zenrows_key, scrapfly_key, gemini_key, open_ai_api_key
#temporary to just push the code, didn't have time for proper safety
openai.api_key = open_ai_api_key


time.sleep(2)
#import urllib, urllib2, cookielib
#from urllib.parse import urlencode
zenrows_key = "358dfed2bf4694f01515f1f58681976fcbc974bf"
openai.api_key = "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"
scrapfly_key = "scp-live-b4359144c48c4cb481df363b315a5e08"
gemini_key = "AIzaSyC1fSufIhh-X7S4pX5HgdwEbFsCoaYVtgc"
client = ScrapflyClient(key=scrapfly_key)
opClient = OpenAI(api_key=openai.api_key)
gemClient = genai.Client(api_key=gemini_key)
#Tried for 5 hours to change this, for now yelp is anti-scraping so I had to hardcode an alternative :(
username = "adityasxnflap@gmail.com"
password = "mypassword"
headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.246", "wdi": "2|27B704CBAB60B5C1|0x1.9fc839292f71fp+30|c04af3fc13bc469d", "bse": "01881d5b1c60485cb78f617235cf9876", "hl": "en_US", "spses.d161": "*", "_ga": "GA1.2.27B704CBAB60B5C1", "_gcl_au": "1.1.1601689685.1743916634", "pid": "2df402bb2d364854", "_uetsid": "6683a47012a611f0a8bd8735b2c38471", "_uetvid": "6683be3012a611f0aef81b62b5c202d2", "zss": "e8m5TFNaYECsqnXMSafrZ0FXgw7yZw", "recentlocations": "San+Jose%2C+CA+95125", "location": "%7B%22city%22%3A+%22San+Jose%22%2C+%22state%22%3A+%22CA%22%2C+%22country%22%3A+%22US%22%2C+%22latitude%22%3A+37.295077%2C+%22longitude%22%3A+-121.89148%2C+%22max_latitude%22%3A+37.323753%2C+%22min_latitude%22%3A+37.271282%2C+%22max_longitude%22%3A+-121.843866%2C+%22min_longitude%22%3A+-121.93178%2C+%22zip%22%3A+%2295125%22%2C+%22address1%22%3A+%22%22%2C+%22address2%22%3A+%22%22%2C+%22address3%22%3A+%22%22%2C+%22neighborhood%22%3A+%22%22%2C+%22borough%22%3A+%22%22%2C+%22provenance%22%3A+%22YELP_GEOCODING_ENGINE%22%2C+%22display%22%3A+%22San+Jose%2C+CA+95125%22%2C+%22unformatted%22%3A+%22San+Jose%2C+CA+95125%22%2C+%22isGoogleHood%22%3A+false%2C+%22usingDefaultZip%22%3A+false%2C+%22accuracy%22%3A+5%2C+%22language%22%3A+null%7D", "datadome": "s43rTE5AzyHLZfPmBWCCMGfC_FDTeN4gU4Oyjke6TYxaOG3uLtv4IOY9bUMc5O78b07q1mARRuIRzwnDho6gB~WaUmGvTylPGUj~0U_04PNg2JHIOm1pyTZsrus29QG5", "bsi": "1%7Ce8ff9e42-9e24-513a-b751-5086c7225aad%7C1743916729680%7C1743916618297%7C1%7C87b5bbbc0044588f", "spid.d161": "593f93e4-afac-43d2-9347-0b3b3348d550.1743916625.1.1743916744..27beac33-1de6-4412-8e03-805c252fc686..22dfe8ef-a8a7-4931-910b-0cd043ef4448.1743916625127.12", "xcj": "1|s5KiCCfPNseutIUSOJ01IiUZwGxRcFpilp6TuStmSzY", "_ga_K9Z2ZEVC8C": "GS1.2.1743916625.1.1.1743916747.0.0.0", "OptanonConsent": "isGpcEnabled=0&datestamp=Sat+Apr+05+2025+22%3A19%3A07+GMT-0700+(Pacific+Daylight+Time)&version=202403.1.0&browserGpcFlag=0&isIABGlobal=false&consentId=consumer-EvSPrAGqtJOGVJ4d591sHg&identifierType=Cookie+Unique+Id&hosts=&interactionCount=1&isAnonUser=0&landingPath=NotLandingPage&groups=BG122%3A1%2CC0003%3A1%2CC0002%3A1%2CC0001%3A1%2CC0004%3A1&geolocation=US%3BCA&AwaitingReconsent=false"}

async def run(link):
    scrapfly = ScrapflyClient(key = scrapfly_key, max_concurrency = 2)
    to_scrape = [ScrapeConfig(url=link, headers=headers, asp=True, render_js=True, wait_for_selector="h1")]
    results = await scrapfly.scrape(to_scrape)
#response = httpx.get("https://www.yelp.com/login")
'''driver = webdriver.Edge()
driver.set_script_timeout(10)
driver.implicitly_wait(30)
driver.get("https://www.yelp.com/login")
driver.find_element(by="id", value="email").clear()
driver.find_element(by="id", value="email").send_keys(username)
driver.find_element(by="id", value="password").clear()
driver.find_element(by="id", value="password").send_keys(password)
cookies = driver.get_cookies()
print(cookies)'''
##cj = cookielib.CookieJar()
##opener = urllib2.build_opener(urllib2.HTTPCookieProcessor(cj))
##login_data = urllib.urlencode




#cookies = requests.get()
#login = client.scrape(ScrapeConfig(
    #url="https://www.yelp.com/login",
    #session=session,
    #debug = True,
    #method="POST",
   # data={
        #"username": "adityasxnflap@gmail.com",
       # "password": "megaknightcringe"
   # },
    
#))
#secret = client.scrape(ScrapeConfig())
app = Flask(__name__)
CORS(app)
#@app.route('/')
#def home():
    #return jsonify({"text": "Hello World"})

#Scrapes the reviews of a restaurant
def yelp_review_scrape(link, dietary_restrictions):
    try:
        
        data: ScrapeApiResponse = client.scrape(ScrapeConfig(
            url=link,
            headers=headers,
            asp=True,
            render_js=True
        ))
        results = data.soup.find_all(class_="raw__09f24__T4Ezm")
        messageCount = 1;
        text = f"IMPORTANT:Please read through these following texts and compile a succinct list of all the important information in the messages. Please make sure to especially note everything to do with the dietary restriction {dietary_restrictions} or discussions about the ingredients in the meals that has to do with those restrictions, positive or negative. Make sure to highlight possible health concerns especially dietary restrictions. \n\n"
        for result in results:
            text += f"{messageCount}. {result.get_text()} \n\n"
            messageCount += 1
        print(text)
        if (messageCount > 1):
            response = gemClient.models.generate_content(
            model="gemini-2.0-flash",
            contents= [text],
        )
            
            print("reached point 3")
            print(response);
            return response;
        print("reached other point")
            
        
    except requests.exceptions.HTTPError as errh:
        print(f"Http Error: {errh}")
    except requests.exceptions.ConnectionError as errc:
        print(f"Error connecting: {errc}")
    except requests.exceptions.Timeout as errt:
        print(f"Timeout Error: {errt}")
    except requests.exceptions.RequestException as err:
        print(f"Oops: Something Else: {err}")
    
#Scrapes the "full menu" link from the yelp page
def yelp_menu_scrape(link, dietary_restrictions):
    try:
        message = f"""Please read through these following menu items and compile a list of every menu item that does not violate the following dietary restrictions: {dietary_restrictions}. Afterwards, count the total number of items that are consumable to people with that dietary restriction. Finally, rate the restaurant on a scale of 1-100, with 1 being completely unconsumable and 100 being completely accomodating for the restrictions. 
        
        """
        menu_link = link.replace("biz", "menu");
        c = httplib.HTTPConnection(menu_link)
        c.request("HEAD", '')
        if (c.getresponse().status == 200):
            data2: ScrapeApiResponse = client.scrape(ScrapeConfig(
                url=menu_link,
                headers=headers,
                asp=True,
                render_js=True
            ))
            
             
            #print(data2.soup.find(class_="menu-item").prettify())
            for item in data2.soup.find_all(class_="menu-item"):
                item_name = item.find("h4").get_text() if item.find("h4") else "No name found"
                item_desc = item.find("p").get_text() if item.find("p") else "No description found"
                message += f"{item_name}. Description: {item_desc}.\n"
                
            print(message)
            response = gemClient.models.generate_content(
                model="gemini-2.0-flash",
                contents= [message]
            )
            print(response)
            return response;
        else:
            print("Menu link not found")
            return None
    except requests.exceptions.HTTPError as errh:
        print(f"Http Error: {errh}")
    except requests.exceptions.ConnectionError as errc:
        print(f"Error connecting: {errc}")
    except requests.exceptions.Timeout as errt:
        print(f"Timeout Error: {errt}")
    except requests.exceptions.RequestException as err:
        print(f"Oops: Something Else: {err}")
    


#Searches the first 5 pages of yelp. 
def yelp_search_scrape(dietary_restrictions, city, state, cuisine = None, maxPrice = 0):
    link = f"https://www.yelp.com/search?find_desc=Restaurants&find_loc={city}%2C+{state}"
    if cuisine is not None:
        link += f"&cflt={cuisine}"
    if maxPrice != 0:
        link += "attrs="
        for i in range (maxPrice, 1, -1):
            link += f"RestaurantsPriceRange2.{i}%2C"
        link += f"RestaurantsPriceRange2.1"
    
    for i in range(1, 4):
        newLink = link
        newLink += f"&start={i*10}"
        print(newLink)
        data: ScrapeApiResponse = client.scrape(ScrapeConfig(
            url=newLink,
            headers=headers,
            asp=True,
            render_js=True,
            wait_for_selector="a"
        ))
        print(data.response.text)
        print(data.response.status_code)
        list = []
        #print(data.soup.find(class_="y-css-o72qzn", href=True).prettify())
        for a in data.soup.find_all(class_="y-css-o72qzn", href=True):
            print("hi")
            restaurant_link = "https://www.yelp.com/" + a['href']
            reviewData = yelp_review_scrape(restaurant_link, dietary_restrictions)
            menuData = yelp_menu_scrape(restaurant_link, dietary_restrictions)
            print(f"Review Data: {reviewData}")
            print(f"Menu Data: {menuData}")
            response = {"reviews": reviewData, "menus": menuData}
            list.append(response)
        return list;
        print("ended")
                
print("Starting Yelp Scraper")
yelp_search_scrape("vegan", "San+Jose", "CA", "chinese")



    
@app.route('/review', methods=['POST'])
def review():
    data = request.get_json()
    submitted_link = data.get('submittedLink')
    submitted_diet = data.get('submittedDiet')
    review_data = yelp_review_scrape(submitted_link, submitted_diet)
    response = {
        "message": review_data
    }
    return jsonify(response)

@app.route('/menu', methods=['POST'])
def menu():
    data = request.get_json()
    submitted_link = data.get('submittedLink')
    submitted_diet = data.get('submittedDiet')
    menu_data = yelp_menu_scrape(submitted_link, submitted_diet)
    response = {
        "message": menu_data
    }
    return jsonify(response)

@app.route('/holistic', methods=['POST'])
def holistic():
    data = request.get_json()
    submitted_diet = data.get('submittedDiet')
    submitted_city = data.get('submittedCity')
    submitted_state = data.get('submittedState')
    submitted_cuisine = data.get('submittedCuisine')
    submitted_price = data.get('submittedPrice')
    menu_data = yelp_search_scrape(submitted_diet, submitted_city, submitted_state, submitted_cuisine, submitted_price)
    return jsonify(menu_data)

#yelp_review_scrape("https://www.yelp.com/biz/ainas-vegan-banh-mi-san-jose", "vegan");
#app.run