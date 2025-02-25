import os
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin

def download_images(url, save_dir="from_website"):
    if not os.path.exists(save_dir):
        os.makedirs(save_dir)
    
    response = requests.get(url)
    if response.status_code != 200:
        print("Failed to retrieve the webpage.")
        return
    
    soup = BeautifulSoup(response.text, 'html.parser')
    
    for img_tag in soup.find_all("img"):
        img_url = urljoin(url, img_tag["src"])
        img_name = img_url.split("/")[-1]
        img_path = os.path.join(save_dir, img_name)
        
        img_data = requests.get(img_url).content
        with open(img_path, "wb") as img_file:
            img_file.write(img_data)
        print(f"Downloaded: {img_name}")

if __name__ == "__main__":
    botc_url = "https://wiki.bloodontheclocktower.com/Special:ListFiles?limit=500&user="
    download_images(botc_url)
